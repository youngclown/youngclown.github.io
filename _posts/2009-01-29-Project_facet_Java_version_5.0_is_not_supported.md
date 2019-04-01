---
layout: post
title: "Project facet Java version 5.0 is not supported. 오류"
date: 2009-01-29 16:30:00 +0900
comments: true
---

<!--# Project facet Java version 5.0 is not supported. 오류-->

문제 발생
---

```
Project facet Java version 5.0 is not supported.
Project facet Java version 6.0 is not supported.
```


문제에 대한 고찰
---

```
1. 새로운 jre 버전을 설치했습니까?
2. 새로운 jre 로 JSP를 작성해야합니까?
3. Project 를 Dynamic Web Project 로 만들었습니까?

현재 사용하는 JRE 버전이 1.5 이면서, JRE를 1.4 를 써야한다던가
여하튼 지금 사용하는 JRE와는 다른 버전을 사용했을 때 이런 문제가 뜹니다.
```


원인은?
---
이클립스 안에는 기본값으로 설정된 [Configuration] 항목의 값을 <custom>. [Project Facets] 항목의 값이 Dynamic Web Module java 가 기본값을 그대로 사용합니다.

즉, 현재 기본값으로 설정된 다른 버전의 JRE를 그대로 사용하므로서 인한 혹은 기존에 사용된 JRE가 다른 버전으로 바뀌면서 생성되는 에러인 것입니다.

```
조치 1.

Properties - > Project Facets
에서 현재 JAVA 를 현재 사용하는 JRE 로 바꿔주면 됩니다.

조치 2.

Dynamic Web Project 로 Project를 만들지 않습니다.
```

해결
---

Facets 에 있는 Java 의 셋팅을 현재 사용하는 JRE 버전으로 바꿔주면 됩니다.
