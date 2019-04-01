---
layout: post
title: "contains 을 쓸 것인가? indexOf 를 쓸 것인가?"
date: 2018-05-24 20:47:00 +0900
comments: true
---

IntelliJ 에서 자주 애용하는 (indexOf(s) > -1) 을 contains(s) 로 바꾸라는 가이드(ctrl+f1)를 준다.
가이드를 주면서 보여주는 메시지는 다음과 같다.


```
Reports any String.indexOf() expressions which can be replaced with a call to the String.contains() method available in Java 5 and newer.
This inspection only reports if the project or module is configured to use a language level of 5.0 or higher.
```


고찰
---

과연 String.indexOf 와 contains 의 속도는 어떻게 될지,
궁금하여, 실제 적용된 소스를 별도의 Test Class 로 분리하여 확인해보았다.

```
String text = ",힙업,{중략},탱키니,비치웨어,"; // 대략 2000단어의 하나의 문장
long startTime = System.currentTimeMillis(); // 시작시간

for (int i = 0; i < 10000000; i++) {
if(text.contains(",크리비아,")) {}
}

System.out.println("완료 : " + (System.currentTimeMillis() - startTime) / 1000.000);
```
성인 keyword 를 체크하는 로직인데 별도의 property 로 관리하는 로직을 테스트를 위해 하드코딩으로 호출하도록 해봤다.
indexOf로 테스트했을 때 1억건을 돌리는 데, 평균적으로 0.020~0.025 초가 발생하였다.

contains로 테스트 했을 때는 평균적으로 0.030~0.035 초가 발생하였다.

원인은?
---
실제 contains 을 decomplie 해보면, 다음과 같은 소스가 보인다.
```
public boolean contains(CharSequence var1) {
		return this.indexOf(var1.toString()) > -1;
}
```
결국 contains 은 indexOf를 예쁘게 포장한 method 라는 것.....

해결
---
```
Using indexOf() to test for the presence of an object in a list can be cumbersome. Using the contains() method leads to clearer code.
```
[참고주소](https://blog.jetbrains.com/idea/2007/04/intellij-idea-7-milestone-1-better-code-inspections-intention-actions-and-more/) 를 통해 확인해보니, 실제론 소스를 읽기 편하게 하는 측면을 가진 java 5 이상에서만 발생하는 suggesion 이라고 한다.

가독성을 높일 것인지, 속도를 높일 것인지에 대해 고민해봐야겠다. 물론 해당 테스트는 local 에서 확인한 것으로, 실제 서버에서는 더 빠를 것이다..
