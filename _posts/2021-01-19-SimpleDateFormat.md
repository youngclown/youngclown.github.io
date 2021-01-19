---
layout: post
title: "brew install"
comments: true
---

2018년도에 발생했던 이슈에 대해 추가 설명이 필요해보여, 이력을 남깁니다.  

![simple](/images/20210119simple.png){: width="100%"}

위 에러는,

java.lang.NumberFormatException: multiple points

란 에러로, SimpleDateFormat 가 Thread safe 하지 않은 데, 여러곳에서 동시 호출될 때 발생하는 경우입니다. 

멀티 스레드에서 안전하지 못하므로, 해당 클래스를 내부 메소드로 이동하거나,

synchronized 처리하여야 할것으로 판단됩니다.


```java
private static final DateFormat formatter = new SimpleDateFormat 
private static final SimpleDateFormat formatter = new SimpleDateFormat
```

로 되어있는 로직이 존재할 경우 해당 클래스 수정이 필요하게 됩니다.

Java 8부터는 스레드로부터 안전 DateTimeFormatter 라는 새로운 Date API를 지원합니다.

```java
private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
```



참고 주소 : https://stackoverflow.com/questions/6137548/can-we-declare-simpledateformat-objects-as-static-objects/30106763




 