---
layout: post
title: "Constructor DI(Constructor Injection)"
comments: true
---

spring boot로 코딩 중에, @Autowired를 사용할 때,  
inteliJ warning에서

```
always use constructor based dependency injection in your beans. Always use assertions for mandatory dependencies
```  

이런 메시지가 뜰 경우에,

```java
@Autowired
private TestService testService;
```

위의 경우를

```java
private final PodsService podsService;
public TestController(TestService testService) {
    this.testService = testService;
}
```

다음과 같이 변경할 수 있습니다.

Spring 4.3부터는 Spring Bean으로 구성된 클래스가 오직 하나의 생성자를 가지면 Autowired 주석을 생략 할 수 있고 Spring은 해당 생성자를 사용하고 필요한 모든 의존성을 주입을 한다고 하네요.

DI도 디자인 패턴 중 하나이며, 의존성 주입이 코드 속에 숨겨질 경우, 의존하는 어떤 클래스가 문제가 생겼는지를 확인하기 위해서는 한번더 해당 클래스를 테스트해야하는 경우가 생깁니다.

Constructor DI 를 권장하는 이유는 다음과 같습니다.

1. 단일 책임의 원칙
생성자의 인자가 많을 경우 코드량도 많아지고, 의존관계도 많아져 단일 책임의 원칙에 위배됩니다.  
그래서 Constructor Injection을 사용함으로써 의존관계, 복잡성을 쉽게 알수 있어 리팩토링의 단초를 제공하게 됩니다.  

2. 테스트 용이성
DI 컨테이너에서 관리되는 클래스는 특정 DI 컨테이너에 의존하지 않고 POJO여야 합니다.   
DI 컨테이너를 사용하지 않고도 인스턴스화 할 수 있고, 단위 테스트도 가능하며, 다른 DI 프레임 워크로 전환할 수도 있게 됩니다.  

3. Immutability
Constructor Injection에서는 필드는 final로 선언할 수 있습니다.   
불변 객체가 가능한데 비해 Field Injection은 final는 선언할 수 없기 때문에 객체가 변경 가능한 상태가 된됩니다.

4. 순환 의존성
Constructor Injection에서는 멤버 객체가 순환 의존성을 가질 경우 BeanCurrentlyInCreationException이 발생해서 순환 의존성을 알 수 있게 된됩니다.  

5. 의존성 명시
의존 객체 중 필수는 Constructor Injection을 옵션인 경우는 Setter Injection을 활용할 수 있습니다.  




-----
# 참조
-----

* [DI(의존성 주입)가 필요한 이유와 Spring에서 Field Injection보다 Constructor Injection이 권장되는 이유](http://www.mimul.com/pebble/default/2018/03/30/1522386129211.html)
