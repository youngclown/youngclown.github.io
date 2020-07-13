---
layout: post
title: "ngnix error 처리"
comments: true
---


soft 한 MSA를 구축해보고 싶어,
각각의 API 마다 별도의 어플리케이션을 구축하고자합니다.

그러므로 어플리케이션은 각각의 API
80 포트로 유입시,
8080 으로 띄어진 스프링부트로 연결이 안되고,


# open() "/usr/share/nginx/html/xxxx" failed (2: no such file or directory),

```
[root@localhost ~]# sudo yum install nginx   
[root@localhost ~]# sudo service nginx start   
[root@localhost ~]# ps -ef | grep nginx  
root      1451     1  0 18:43 ?        00:00:00 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
nginx     1453  1451  0 18:43 ?        00:00:00 nginx: worker process                   
root      1455  1402  0 18:43 pts/0    00:00:00 grep nginx
```

Nginx가 잘 실행되었습니다!

```
sudo vi /etc/nginx/nginx.conf  

설정 내용 중 server 아래의 location / 부분을 찾아서 아래와 같이 추가합니다.  
proxy_pass http://localhost:8080;  
proxy_set_header X-Real-IP $remote_addr;  
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
proxy_set_header Host $http_host;  
```

라고 설정을 했는데,

```
[root@localhost ~]# nginx -v
nginx version: nginx/1.10.3
```

위와 같은 ngnix 의 1.10.3 의 경우 default.conf 에 server 설정이 적용되어있어,
nginx.conf 에 server 설정을 정의해도,

```
vi /etc/nginx/conf.d/default.conf
```

위의 default 값이 강제로 설정되어, /usr/share/ngnix/html 의 경로의 url 을 matching 시키려고 하는 이슈가 있었습니다.  



# connect() to 127.0.0.1:8080 failed (13: Permission denied) while connecting to upstream,

SELinux 보안의 문제라고 합니다.  
```
setsebool [옵션] [on/off]
getsebool [옵션] : 해당 옵션에 대한 상태확인
getsebool -a : 모든 옵션 상태확인
getsebool -a | grep http : 검색 예시
ftpd_full_access : ftp 접근 허용
httpd_can_network_connect : my_sql 외부접속 허용
vi /etc/sysconfig/selinux : 설정파일
setenforce : 임시 설정 (0-미사용, 1-사용)
getenforce : 설정 보기
```

/var/log/audit/audit.log 로그로 해당 denied 에러를 확인가능합니다.  

```
[root@localhost ~]# sudo cat /var/log/audit/audit.log | grep nginx | grep denied
type=AVC msg=audit(1594629572.748:986): avc:  denied  { name_connect } for  pid=14785 comm="nginx" dest=8080 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=system_u:object_r:http_cache_port_t:s0 tclass=tcp_socket
type=AVC msg=audit(1594629578.570:987): avc:  denied  { name_connect } for  pid=14785 comm="nginx" dest=8080 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=system_u:object_r:http_cache_port_t:s0 tclass=tcp_socket
type=AVC msg=audit(1594629594.715:988): avc:  denied  { name_connect } for  pid=14785 comm="nginx" dest=8080 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=system_u:object_r:http_cache_port_t:s0 tclass=tcp_socket
```



```
setsebool -P httpd_can_network_connect 1
```
라는 명령어를 사용하여 처리되었습니다. (변경 사항을 지속 시키려면 -P 플래그를 사용)

```
getsebool -a | grep httpd
```
명령어를 통해 SELinux boolean 에 대한 정보를 알 수 있다고 합니다.  
