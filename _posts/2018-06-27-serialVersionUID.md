---
layout: post
title: "serialVersionUID 선언"
date: 2018-06-27 16:27:00 +0900
comments: true
---

@SuppressWarnings("serial") 선언한 class 에서 에러가 발생했습니다.

```
java.io.InvalidClassException: com.openrtb.api.dto.xxx; local class incompatible: stream classdesc serialVersionUID = -8253581617857313489, local class serialVersionUID = -5676156168200907805
	at java.io.ObjectStreamClass.initNonProxy(ObjectStreamClass.java:616)
	at java.io.ObjectInputStream.readNonProxyDesc(ObjectInputStream.java:1630)
	at java.io.ObjectInputStream.readClassDesc(ObjectInputStream.java:1521)
	at java.io.ObjectInputStream.readOrdinaryObject(ObjectInputStream.java:1781)
	at java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1353)
	at java.io.ObjectInputStream.readObject(ObjectInputStream.java:373)
	at java.util.ArrayList.readObject(ArrayList.java:791)
	at sun.reflect.GeneratedMethodAccessor77.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at java.io.ObjectStreamClass.invokeReadObject(ObjectStreamClass.java:1058)
	at java.io.ObjectInputStream.readSerialData(ObjectInputStream.java:1909)
	at java.io.ObjectInputStream.readOrdinaryObject(ObjectInputStream.java:1808)
	at java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1353)
	at java.io.ObjectInputStream.readObject(ObjectInputStream.java:373)
```

개발하면서 @SuppressWarnings("serial") 선언한 클래스에, 타개발자가 나중에 사용할 특정 변수를 추가하면서, JVM 에서 발급해주는 serialVersionUID가 변경되면서 발생한 문제.

해당 서비스는 혼자 관리하기 때문이라는 안일하게 SuppressWarnings을 걸어놓았는데... ㅠㅜ

class 가 내부 클래스에서 처리하면 문제가 없었지만, redis 를 사용하고 있었고, 해당 nosql 에 해당 클래스의 객체 정보를 바이너리화 하여 저장하고 있었기 때문에 조금의 실수라도 바로 문제가 발생할 수 밖에 없었던 겁니다!!!!!!

JVM에 자동으로 변경된 Default 시리얼 번호와, redis에 바이너리로 저장한 class의 시리얼 번호가 틀리면서 문제가 발생했습니다.

serialVersionUID 는 직렬화에 사용되는 고유 아이디인데, 다른 대부분의 redis 사용하는 객체클래스에는 적용해놓고, 이 녀석만 @SuppressWarnings("serial")을 선언해놓았더군요.

잠시 배포 중단을 할 수 밖에 없었습니다.

해당 클래스에 @SuppressWarnings("serial")을 선언할 때는,
해당 객체가 더이상 변경될 이유가 없고, 내가 관리하는 부분이니, 누군가 수정하지 않을 것이니 문제없겠지 하고 작업했던 걸로 기억합니다.

정말 안일했고, 권장하는 방법을 무시하면 안된다는 것을 다시 한번 깨닫습니다.

[예전에 봤던글,자바 직렬화, 그것이 알고싶다. 실무편]:(http://woowabros.github.io/experience/2017/10/17/java-serialize2.html)

예전에 봤던 글의 결론을 첨부합니다.


결론
---

자바 직렬화는 장점이 많은 기술입니다만 단점도 많습니다.  
문제는 이 기술의 단점은 보완하기 힘든 형태로 되어 있기 때문에 사용 시 제약이 많습니다.  
그래서 이 글을 적는 저는 직렬화를 사용할 때에는 아래와 같은 규칙을 지키려고 합니다.  
1. 외부 저장소로 저장되는 데이터는 짧은 만료시간의 데이터를 제외하고 자바 직렬화를 사용을 지양합니다.  
2. 역직렬화시 반드시 예외가 생긴다는 것을 생각하고 개발합니다.
3. 자주 변경되는 비즈니스적인 데이터를 자바 직렬화을 사용하지 않습니다.
4. 긴 만료 시간을 가지는 데이터는 JSON 등 다른 포맷을 사용하여 저장합니다.
