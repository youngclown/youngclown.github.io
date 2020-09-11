---
layout: post
title: "Replace get() with orElse(null)."
comments: true
---

JPA 사용 시,

Optional<Entity> 로 결과값을 RETURN 하게 됩니다.
해당값을 사용시 Entity 로 처리하려면,
get을 사용해서 객체로 변환해야하는데, 인텔리J에서는
다음과 같은 경고를 해줍니다.

```
'Optional.get()' without 'isPresent()' check
```

get을 가져와서 사용시 그 전에 isPresent로 실제 객체가 정상적인지를 확인하라는 부분으로,

```java
if (entity.isPresent()) {
  Entity a = entity.get();
}
```
형태로 가져와야합니다.  

그게 실을 경우, orElse(null) 로 객체로 바로 변환하도록 합니다.  
