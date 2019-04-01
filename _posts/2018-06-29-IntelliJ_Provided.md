---
layout: post
title: "Exception in thread HttpServlet NoClassDefFoundError"
comments: true
---

```
"Exception in thread "main" java.lang.NoClassDefFoundError: javax/servlet/http/HttpServlet"
```

psvm 으로 main을 만들어 사용할 때,

Intellij 에서만 HttpServlet 을 못찾는 에러가 발생합니다.
이클립스라든가 IntelliJ 내부의 JUnit 을 사용했을 때는 정상적으로 동작합니다.

```
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.0.1</version>
    <scope>provided</scope>
</dependency>
```

보통, javax.servlet-api 는 서버에서는 tomcat 에 존재하므로,
dependency의 scope를 provided로 적용해두고 있습니다.

그런데, main에서 호출할시에는 tomcat 과는 별개의 동작이므로, 외부에서 이 라이브러리가 제공되는 선언시, NoClassDefFoundError 가 발생하는 것입니다.

결국 IntelliJ 설정 중,
![provided](/images/20180629Provided.PNG){: width="100%"}
로 인해 발생한 문제로 확인이 되었습니다.

Include dependencies with "Provided" scope 를 체크하면, 정상적으로 동작합니다.
