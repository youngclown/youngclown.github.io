---
layout: post
title: "TCP 로 원인 분석"
date: 2018-05-28 20:00:00 +0900
comments: true
---

### TCP 로 DB 문제 확인하기 - 1

서버가 튀는 순간 DB의 ESTABLISHED 상태를 점검하였다.

사용한 명령어
---
```
[dream-WAS-03:root]/root>#netstat -tonp | grep '.250:3306'
```

db는 MariaDB 를 사용하고 있고, 현재 확인하는 것은 마스터 서버의 insert 구문으로 인한  TCP  ESTABLISHED 상태였습니다.
치솟기(뒤기) 전에는 CLOSE_WAIT 가 24~27 정도를 유지하고 있다가, 튀기 바로 직전에 0~1로 변경됩니다.
치솟는 순간 250번 DB의 커넥션이 전부 ESTABLISHED 상태로 변경되는 것까지 눈으로 확인했습니다.

```
tcp      196      0 xx.xxx.x.x:54330            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          keepalive (6587.96/0/0)
tcp        7      0 xx.xxx.x.x:38082            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          keepalive (5745.34/0/0)
tcp        0      0 xx.xxx.x.x:50672            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          keepalive (7039.22/0/0)
tcp        0      0 xx.xxx.x.x:50670            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          keepalive (7039.17/0/0)
tcp        0      0 xx.xxx.x.x:50642            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          keepalive (7038.88/0/0)
tcp        0      0 xx.xxx.x.x:51210            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          keepalive (7043.51/0/0)
tcp        0      0 xx.xxx.x.x:50488            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          keepalive (7037.79/0/0)
tcp        0     57 xx.xxx.x.x:38166            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          on (0.19/0/0)
tcp        0      0 xx.xxx.x.x:50688            xxx.xxx.x.250:3306          ESTABLISHED 22388/java          keepalive (7039.35/0/0)
tcp        0     11 xx.xxx.x.x:57636            xxx.xxx.x.250:3306          ESTABLISHED 20882/java          on (0.20/0/0)
tcp        0    667 xx.xxx.x.x:56624            xxx.xxx.x.250:3306          ESTABLISHED 20882/java          on (0.19/0/0)
~~~~~ 중략 ~~~~~~~~~~
```

처음에는 ESTABLISHED 상태가 커넥션 풀 갯수만큼 차면서 당연히 db가 밀리거나 lock 이 걸릴 것으로 판단했으나,
실질적인 DBA는 db가 안정적이라고 하여, 혹시 네트워크 커넥션에 관련된 문제인지 확인하고자 하였습니다.

현재 DB는 3분마다 자동으로 커넥션이 끊도록 셋팅되어있다고 하였습니다.

사용한 명령어
---
해당 명령은 250 마스터 서버의 3306 포트를 1초 간격으로 숫자를 카운트 하는 명령어를 사용하여,
로그를 분석하고자 하였습니다.

```aidl
[dream-WAS-03:root]/root>#while true; do date; netstat -an | grep '.250:3306' | grep ESTABLISHED | wc -l; sleep 1; done
```


```
2018. 05. 28. (월) 16:15:39 KST
88
2018. 05. 28. (월) 16:15:49 KST
99
2018. 05. 28. (월) 16:16:02 KST
88
2018. 05. 28. (월) 16:16:13 KST
88
2018. 05. 28. (월) 16:16:22 KST
99
2018. 05. 28. (월) 16:16:34 KST
97
2018. 05. 28. (월) 16:16:45 KST
89
~~~~~ 중략 ~~~~~~~~~~
```

실제 요청콜에 의해 99를 치다가, 88로 내려갔다 다시 치는 현상이 반복되었습니다.

실제 server.xml 에서, minimumIdle="100", maximumPoolSize="100" 으로 되어있으며, 해당 셋팅을 한 이유는,
minmunIdle 와 maximumPoolSize의 수를 같게 하여, 항상 커넥션을 유지하게 하기 위한 설정으로 알고 있습니다.

```
<Resource name="dreamdb" auth="Container"
     factory="com.zaxxer.hikari.HikariJNDIFactory"
     type="javax.sql.DataSource"
     minimumIdle="50"
     maximumPoolSize="50"
     maxLifetime="3600000"
     connectionTimeout="3000"
     dataSourceClassName="com.mysql.jdbc.jdbc2.optional.MysqlDataSource"
     dataSource.cachePrepStmts="true"
     dataSource.prepStmtCacheSize="250"
     dataSource.prepStmtCacheSqlLimit="2048"
     registerMbeans="true"
     poolName="dreamdb"
     dataSource.logger="com.mysql.jdbc.log.StandardLogger"
     dataSource.logSlowQueries="false"
     dataSource.dumpQueriesOnException="false"
     dataSource.user="xxxx"
     dataSource.password="xxxx"
     dataSource.url="jdbc:mysql://mpstdbm1:3306/xxxxx?autoReconnect=true"
     validationQuery="SELECT 1"
     validationInterval="240000"
     testWhileIdle="true" />
```
해당 설정값으론 SELECT 1을 계속 연결하여, 커넥션을 유지할 것으로 판단하였으나,
실제로는 3분간격으로 CLOSE WAIT 가 발생하는 것으로 보입니다.




원인은?
---
DB 쪽에서 강제적으로 3분 간격으로 커넥션을 끊는다고 합니다.

결론...
---

DB 쪽 이슈라고만 하기에는,
```
while true; do date; netstat -an | grep '.250:3306' | grep ESTABLISHED | wc -l; sleep 1; done
```
해당 명령어를 호출할 때 sleep 을 1초에 걸렸음에도 12~14초가 걸리도록 서버에 지연이 있는 상태였으므로,
전반적인 다른 부분을 파악해야하는 걸로 결론이 났습니다.

-----
# 참조
-----

* [리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 1편](http://meetup.toast.com/posts/53)
* [리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 2편](http://meetup.toast.com/posts/54)
* [리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 3편](http://meetup.toast.com/posts/55)


문제를 분석하는데 많은 도움을 받았습니다.

[리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 1편]을 통해 위의 설정으로 실제 tcp 메모리가 얼마만큼을 사용하는지 확인해봤습니다.

```
[WAS-03:root]/root>#sysctl net.ipv4.tcp_mem
net.ipv4.tcp_mem = 3067296	4089728	6134592
```

min / pressure / max 값을 지정할 수 있다고 하는데, 현재 우리 서버의 메모리는 32기가로 참고한 내용에 별 문제 없음을 확인할 수 있었습니다.

```
[WAS-03:root]/root>#sysctl fs.file-nr
fs.file-nr = 5984	0	3251359
```
세 값은 각각 현재 열려 있는 파일의 수, 현재 열려 있으나 사용되지 않는 파일의 수, 열 수 있는 파일의 최대 개수를 뜻합니다.
물론 시스템 전체에 대한 수치입니다. 라고 [리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 2편]을 통해 알 수 있었습니다.

이것도 문제가 없습니다. 예전에 이미 Too many open files 에러로 인해 설정을 변경했던 겁니다!


[리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 3편]에서 볼때,
```
[WAS-03:root]/root>#sysctl net.ipv4.tcp_max_tw_buckets
net.ipv4.tcp_max_tw_buckets = 262144
```
TIME_WAIT 상태의 소켓은 위 설정된 값 보다 많아질 수 없다고 합니다.
이미 이 설정값 만큼의 TIME_WAIT 상태의 소켓이 있다면, TIME_WAIT 상태로 전이되어야 할 소켓은 더이상 대기하지 않고 파괴(destroy)되어 버린다고 하네요.
이것도 문제가 없을 같습니다.  

다음은 레디스에 대해 분석합니다.


-----
# 참조
-----

* [CLOSE_WAIT 문제 해결](http://docs.likejazz.com/close-wait/)
* [TIME_WAIT 상태란 무엇인가](http://docs.likejazz.com/time-wait/)
