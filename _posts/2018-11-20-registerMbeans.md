---
layout: post
title: "MBean (JMX) Monitoring and Management"
comments: true
---


```
<Resource name="xxx" auth="Container"
     factory="com.zaxxer.hikari.HikariJNDIFactory"
     type="javax.sql.DataSource"
     minimumIdle="30"
     maximumPoolSize="30"
     maxLifetime="3600000"
     connectionTimeout="5000"
     dataSourceClassName="com.mysql.jdbc.jdbc2.optional.MysqlDataSource"
     dataSource.cachePrepStmts="true"
     dataSource.prepStmtCacheSize="250"
     dataSource.prepStmtCacheSqlLimit="2048"
     registerMbeans="true"
     dataSource.logger="com.mysql.jdbc.log.StandardLogger"
     dataSource.logSlowQueries="false"
     dataSource.dumpQueriesOnException="false"
     dataSource.user="xxxx"
     dataSource.password="xxxx"
     dataSource.url="jdbc:mysql:/xxxxx:3306/xxx?autoReconnect=true"
     validationQuery="SELECT 1"
     validationInterval="240000"
     testWhileIdle="true" />
```

초창기 JNDI(tomcat-jdbc)의 경우 JMX(jconsole 등)에 대한 설정에서 자동으로 dbfool 이 보였으나,
HikariCP를 적용하면,

```
registerMbeans=true
```

를 해야지만, JMX 에서 확인이 가능하다고 합니다.
스프링 부트 2.0 의 default DBCP가 hikariCP 가 되었다고 합니다.

항상 hikariCP의 설명을 보면, 엄청 빠르고 가볍고, 신뢰할 수 있다고 설명합니다.
심지어 "zero-overhead"라며 엄청나게 높은 성능을 강조합니다.

2년전에 도입되었는데, 스프링 부트 2.0 의 default가 되었다는 것은 확실히 빠른다 뭐 그런 의미겠지요.





-----
# 참조
-----

* [HikariCP](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide#configuring-a-datasource)
