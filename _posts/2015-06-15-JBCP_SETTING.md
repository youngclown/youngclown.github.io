---
layout: post
title: "TOMCAT Server.xml 에 설정된 DBCP 설정값"
date: 2015-03-25 10:28:46 +0900
comments: true
---



```
<Resource name="dreamdb"  
  auth="Container"  
  type="javax.sql.DataSource"  
  username="xxxxx"  
  password="xxxxx"                         	
  url="jdbc:mysql://xxxx/database?autoReconnect=true"
  driverClassName="org.gjt.mm.mysql.Driver"
  maxActive="1000"
  minIdle="3"
  maxIdle="5"
  maxWait="5000"
  removeAbandoned="true"
  testWhileIdle="true"
  testOnBorrow="true"
  validationQuery="select 1"
/>
```

> name - 필수 항목으로서 root java context 인 java:comp/env 에 상대적인 resource 이름이며 jdbc/ 로 시작 (예를 들어 jdbc/sarc)

> auth - resource manager 에 sign on 하는 주체로 Container (container-managed 일 경우) 혹은 Application (application-managed 일 경우)

> initialSize - 초기 connection 수로, default 는 0

> maxActive - 동시 사용 가능한 connection 수로 0 일 경우 무제한이며, default 는 8
(최대 동시 대여 가능 커넥션수)

> minIdle - maxActive 를 넘을 수 없으므로 때에 따라 idle connection 이 minIdle 보다 적을 수도 있고, -1 일 경우 무제한이며, default 는 0

> maxIdle - connection 의 최대 개수로, default 는 8

> maxWait - 새로운 connection 을 얻기 위해 대기하는 시간 (msec) 으로, 이 시간에 도달하게 되면 exception 이 발생하며, default 는 -1 로 무제한

> validationQuery - connection 유효성 체크 query 로 default 는 null 이다. 만일 MySQL/MariaDB/PPAS/PostgreSQL 에 적용하려면 select 1, Oracle 에 적용하려면 select 1 from dual 을 사용

> removeAbandoned - 대여시간 초과했는데 반납 안된 커넥션 처리

> removeAbandonedTimeout - 대여시간 설정 ( 1=5초 60=5분 )

> logAbandoned - 커넥션 삭제시에 로그출력 여부

> testWhileIdle - 커넥션에 아무런 데이터 송수신이 없을 경우 해당 커넥션이 유효한지 테스트를 할지 여부를 결정.

> timeBetweenEvictionRunsMillis - 커넥션이 쉬고 있을 때 커넥션 체크 쿼리를 실행하는 시간 간격을 설정. 놀고 있는 connection을 pool에서 제거하는 시간기준 (설정된 시간동안 놀고 있는 connection을 minIdle&maxIdel 설정값을 고려하여 제거.)

> testOnBorrow - connection pool에서 connection을 가져올 때 해당 connection이 유효성 검사 여부
