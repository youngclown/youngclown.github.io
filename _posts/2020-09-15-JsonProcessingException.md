---
layout: post
title: "java.lang.NoClassDefFoundError: com/fasterxml/jackson/core/JsonProcessingException"
comments: true
---


```
caused by: org.springframework.beans.factory.beancreationexception: error creating bean with name 'redisrepository': injection of resource dependencies failed; nested exception is org.springframework.beans.factory.beancreationexception: error creating bean with name 'redistemplate' defined in class path resource [com/ssp/config/redisconfig.class]: bean instantiation via factory method failed; nested exception is org.springframework.beans.beaninstantiationexception: failed to instantiate [org.springframework.data.redis.core.redistemplate]: factory method 'redistemplate' threw exception; nested exception is java.lang.noclassdeffounderror: com/fasterxml/jackson/core/jsonprocessingexception
```

jackson-databind 를 라이브러리에 추가하여 다운받으면 됩니다. 

```
compile "com.fasterxml.jackson.core:jackson-databind"
```
