---
layout: post
title: "sqlMapConfig"
date: 2009-02-26 13:06:00 +0900
comments: true
---

sqlMapConfig
---

properties resource="데이타베이스 설정한 곳 주소"  
알바티스를 위한 셋팅, 정의는 되어있으나 특별하게 셋팅할 필요는 없습니다.  

```xml
<settings
cacheModelsEnabled="true"
enhancementEnabled="true"
lazyLoadingEnabled="true"
maxRequests="32"
maxSessions="10"
maxTransactions="5"
useStatementNamespaces="false"
/>
```
cacheModelsEnabled : 한번 사용했던 데이타는 나중에 또 언젠가는 쓸지 모르니 caching 하여 사용할 것인지 확인
useStatementNamespaces : 여러개의 sqlMap의 namespace 가 BlogUser 라 할때, resource 가 존재했을때 유용함, id로만 접근할 것인가, 아미녀 sqlmap.statement이름으로 구성할 것인지를 확인

```
<typeAlias alias="full pacage 에 대한 별칭을 알려줌">
```

JDBC, SIMPLE 같은 경우에는 iBATIS가 별칭으로 해당 명칭을 매칭시켜줍니다.


```xml
<transactionManager type="JDBC" >
<dataSource type="SIMPLE">
<property name="url을 읽어옴.">
```

```
JDBC : 트랙젝션을 그대로 사용
EXTERNAL : 사용자가 직접
JTA :  2기종간의 데이터베이스 여러가지의 DB를 하나로 관리가능
```

```
SIMPLE : (내가 집적) 알바티스 설정 문서 안에서 DB 커넥션을 얻거나, 데이터 소스 설정을 얻을 수 있습니다.
JNDI : 컨테이너가 제공하는 WAS가 제공해주는 DB 소스를 사용
DBCP : 자카르타의 DBCP
```

최종적으로 소스에 가장 상위에는

```
SqlMapConfig.xml
SqlMap.xml .. . .. . . . ...
```

가 하나가 되서 iBATIS 로 이루어져있습니다.  
파라미터를 넘기고 결과를 객체로 받거나 XML로 받거나 하는 형태가 iBATIS 를 의미합니다.  
settings 요소를 건드릴 필요는 없습니다.  
