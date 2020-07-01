---
layout: post
title: "jdk version history(jdk 버전간 차이)"
comments: true
---

# JDK 1.4 -> JDK 1.5

가장 변화가 힘들었던 시기로, 해당 버전업 프로젝트의 로직은 상당 수 수정해야만하였습니다.  
추억이라면 추억이겠지만,

특히 for문에 대한 수정사항이 매우 많았던 시기입니다.  
왜 버전업하면서 for문의 수정을 해야했냐면,

- Generics
- foreach

이 두가지 때문이라고 할 수 있겠습니다. foreach 의 경우는 기존의 for문을 그대로 사용해도 되었지만,
Generics 의 경우 기존방식의, 비 구체화 타입(non-reifiable type)에서,
강제 형변환 시에 약간의 오류가 있었습니다.

1.5 버전부터 신규 버전에서는 Deprecated 를 걸더라도, 계속 쓸 수 있게 서포트해주었지만,
1.4 에서 1.5로 바뀔때는 그러한 배려가 좀 부족했던 기억이 납니다.  

가장 기억에 남는 건,
```
enum, vararg, foreach, static imports
```

인데, 인터넷 검색해보니 annotation, auto boxing 도 있때 도입이 되었었다고 하네요.
Boxing 과 Unboxing 을 예전에는

```
Integer age = new Integer(30); // 기본 자료형을 Wrapper 클래스의 객체로 변경하는 과정
int num = age.intValue();     // 와퍼 클래스를 기존자료형으로 변환하는 과정
```
형변환하는 별도의 구현이 필요했다면,

Auto(Un)Boxing을 통해 자동으로 변환 가능하게 되었었네요.
```
Integer age = new Integer(30);
int num = age;
```


* AutoBoxing과 AutoUnBoxing 은 단지 기본형 타입과 상응하는 Wrapper class에만 일어납니다.
다른 경우에 대입을 시도하면 컴파일 에러가 발생합니다.
예를 들어, Integer는 intValue(), Double은 doubleValue() 등만 AutoBoxing과 AutoUnBoxing이 발생하기에 다음과 같은 경우의 수가 생깁니다.

```
Double obj = 3.14;
int num1 = obj.intValue() ;   (O)
int num2 = obj;               (X)
int num3 = (int)((double)obj);(O)
```


# JDK 1.5 -> JDK 1.6

G1(Garbage First) GC도입 되었습니다.(JDK 1.6 update 14 에 포함됨, early access)

자바의 GC는 Parallel GC를 기본으로 사용했지만, Java 9부터는 G1 GC가 기본값으로 설정되게 되었고, JDK 1.6 부터 G1 GC가 되었다고 하네요.

early access 라고 부르며, JDK 1.7 update 4에 정식으로 추가된 것으로 보입니다.   
자세한 내용은 [Naver D2의 글](https://d2.naver.com/helloworld/1329) 을 참고로 하시면 될 거 같습니다.

```
Young의 세가지 영역에서 데이터가 Old 영역으로 이동하는 단계가 사라진 GC 방식이라고 이해하고 넘어갑시다!
```

```
This SCP area is part of the method area (Permgen) until Java 1.6 version.
```
참고로, SCP(String constant pool)이라고 하여, 1.6 버전까지 리터럴 변수는 Permgen 에 속해있었습니다!


# JDK 1.6 -> JDK 1.7

실제로 실업무에서, 1.4에서 1.5로 바뀌었을 때를 제외하고는,  
1.5 에서 1.7 로 이동할 경우에 Deprecated 이 적용되는 경우는 있었으나,  
컴파일이나 런타임에서 오류가 난 적은 없었습니다.  

```
- Switch문 인자로 String 허용
- try-resource
- generics 타입추론
- 숫자에서 undersocre 사용
```

위의 세개는 자주 사용하는데, 숫자에서 undersocre 사용하는 건 이번에 조사하면서 알게 되었네요.  


예전 버전의 경우 String은 PermGen(런타임시 크기가 변경되지 않는 메모리)에 위치하며, 동일한 String의 경우 Pooling 된다고 배워왔는데요.    
java6 이후 String이 저장되는 메모리가 PermGet에서 heap으로 변경되었습니다.  
String의 경우 추후 1.9 java가 나올때까지 이러한 형태를 유지하는데요,  
String은 두 가지 생성 방식이 있고 각각의 차이점이 존재합니다.    
두 가지 방식에는 큰 차이점이 있습니다.  

new를 통해 String을 생성하면 Heap 영역에 존재하게 되고 리터럴을 이용할 경우 String constant pool이라는 영역에 존재하게 되기 때문입니다.  

```
- new 연산자를 이용한 방식
- 리터럴을 이용한 방식
```

String 객체와 String 리터럴의 차이점이 존재합니다.



```

int money1 = 19000000000;

// 반드시 숫자 사이에만 올 수 있다.
// 숫자 언더스코어, 숫자의 가독성 상승
int money2 = 19_000_000_000;  
```


# JDK 1.7 -> JDK 1.8

오라클로 인수된 후 첫번째 버전.  
현재 대다수의 한국기업들이 사용하는 버전이 아닐까 합니다.  

JDK 1.5이후 가장 큰 언어적 변화가 있었다고 하며, 실제로 1.8을 사용하는 한국 기업에서 해당 기능을 그렇게 많이 사용하는가 하면 아닌거 같습니다. ^^;

```
- Lambda expression   
- Defauit Method Ingerface   
- default method를 이용한 다중상속 지원
```
