---
layout: post
title: "AutoResultMapAutoResultMap 에러"
date: 2018-05-17 14:30:00 +0900
comments: true
---

<!--# Perhaps JAVA_HOME does not point to the JDK 오류-->

문제 발생
---
```
[ERROR][2018/05/17 10:35:21] c.o.d.c.d.RTBDao$9 [217] selMobileAdInfo param ############# > {test=0, platformType=mobile, adGubun=xx, userId=xxx} 
com.ibatis.common.jdbc.exception.NestedSQLException:   
--- The error occurred in xxx.xml.  
--- The error occurred while applying a result map.  
--- Check the rtb.selMobileAdInfo-AutoResultMap.  
--- Check the result mapping for the 'imageInfo' property.  
--- Cause: java.sql.SQLException: Column 'imageInfo' not found.
	at com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryWithCallback(MappedStatement.java:208) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryForList(MappedStatement.java:144) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate.queryForList(SqlMapExecutorDelegate.java:571) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate.queryForList(SqlMapExecutorDelegate.java:544) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.impl.SqlMapSessionImpl.queryForList(SqlMapSessionImpl.java:118) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.impl.SqlMapClientImpl.queryForList(SqlMapClientImpl.java:94) ~[ibatis-2.3.4.726p.jar:na]
	---중략---
	at java.lang.Thread.run(Thread.java:745) [na:1.8.0_112]
Caused by: java.sql.SQLException: Column 'imageInfo' not found.
	at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:959) ~[mysql-connector-java-5.1.37.jar:5.1.37]
	at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:898) ~[mysql-connector-java-5.1.37.jar:5.1.37]
	at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:887) ~[mysql-connector-java-5.1.37.jar:5.1.37]
	at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:862) ~[mysql-connector-java-5.1.37.jar:5.1.37]
	at com.mysql.jdbc.ResultSetImpl.findColumn(ResultSetImpl.java:1076) ~[mysql-connector-java-5.1.37.jar:5.1.37]
	at com.mysql.jdbc.ResultSetImpl.getString(ResultSetImpl.java:5206) ~[mysql-connector-java-5.1.37.jar:5.1.37]
	at sun.reflect.GeneratedMethodAccessor42.invoke(Unknown Source) ~[na:na]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_112]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_112]
	at com.mysql.jdbc.MultiHostConnectionProxy$JdbcInterfaceProxy.invoke(MultiHostConnectionProxy.java:91) ~[mysql-connector-java-5.1.37.jar:5.1.37]
	at com.mysql.jdbc.FailoverConnectionProxy$FailoverJdbcInterfaceProxy.invoke(FailoverConnectionProxy.java:81) ~[mysql-connector-java-5.1.37.jar:5.1.37]
	at com.sun.proxy.$Proxy9.getString(Unknown Source) ~[na:na]
	at com.zaxxer.hikari.pool.HikariProxyResultSet.getString(HikariProxyResultSet.java) ~[HikariCP-2.6.0.jar:na]
	at com.ibatis.sqlmap.engine.type.StringTypeHandler.getResult(StringTypeHandler.java:35) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.mapping.result.ResultMap.getPrimitiveResultMappingValue(ResultMap.java:619) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.mapping.result.ResultMap.getResults(ResultMap.java:345) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.mapping.result.AutoResultMap.getResults(AutoResultMap.java:47) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.execution.SqlExecutor.handleResults(SqlExecutor.java:384) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.execution.SqlExecutor.handleMultipleResults(SqlExecutor.java:300) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.execution.SqlExecutor.executeQuery(SqlExecutor.java:189) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.sqlExecuteQuery(MappedStatement.java:229) ~[ibatis-2.3.4.726p.jar:na]
	at com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryWithCallback(MappedStatement.java:196) ~[ibatis-2.3.4.726p.jar:na]
	... 41 common frames omitted

```


문제에 대한 고찰 
---
```
AutoResultMap 는 왜 발생했는가?
캐싱은 왜 발생했는가?
해당 캐싱을 그대로 유지할 것인가?
```


원인은?
---
```
    <settings
            cacheModelsEnabled="true"
            enhancementEnabled="true"
            lazyLoadingEnabled="true"
            maxRequests="512"
            maxSessions="256"
            maxTransactions="64"
            useStatementNamespaces="true"/>
```
cache 처리를 우선 true 로 해두었는데,
IBATIS 는 기본적으로 해당 쿼리에 대한 메타데이터(필드, 타입 등)를 캐시를 하며,
dynamicQuery 구문이 실행된 이후 그 결과의 컬럼 정보가 캐시되었고,
이후 다른 컬럼 정보를 포함한 쿼리가 dynamicQuery 로 실행되었을 때
캐시된 컬럼 정보로 값을 찾으려하다 오류가 나는 경우였음.

해결
---
```
<select xxxx remapResults="true">
</select>
```
실제 setting 을 건드리면 모든 query 에 대한 검증을 해야하므로, 해당 쿼리가 dynamic 한 경우에는 remapResults 값을 true로 설정한다.

-----
# 참조 
-----

* [iBATIS 동적 쿼리 수행 시 AutoResultMap 에러](http://ohgyun.com/280)
