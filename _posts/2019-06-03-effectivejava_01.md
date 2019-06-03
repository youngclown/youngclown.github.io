---
layout: post
title: "이펙티브 자바_01"
comments: true
---

```java
                    Pattern urlPattern = Pattern.compile("^(http[s]?):\\/\\/([^:\\/\\s]+)(:([^\\/]*))?((\\/[^\\s/\\/]+)*)?\\/([^#\\s\\?]*)(\\?([^#\\s]*))?(#(\\w*))?$");
                    Matcher mc = urlPattern.matcher(this.domain);
                    if (mc.matches()) {
                        this.domain = mc.group(2);
                    }
``
http 를 찾는 로직입니다.  
urlPattern 이라는 String 을 정규표현식에서 문자열 형태를 확인하는 가장 쉬운 방법이지만, 성능이 중요한 상황에서는 반복해 사용하기에 적합하지 않다고 써져있습니다.  
이 메서드가 내붕네서 만드는 정규표현식용 Pattern  인스턴스는, 한번 쓰고 버려져 곧바로 가비지 컬렉션 대상이 된다고 합니다.  


Pattern은 입력받은 정규표현식에 해당하는 유한 상태머신(finite state machine)을 만듥기 때문에 인스턴스 생성 비용이 높다고 하여, 성능을 개선하기 위해서 정규표현식을 표현하는 (불변인) Pattern 인스턴스를 초기화(정적 초기화)과정에서 직접 생성해 캐싱해두고, 나중에 static 메소드로 반복하여 이 인스턴스를 재사용하는 방법을 가이드 주었습니다.


```java
private static final Pattern URL_PATTERN = Pattern.compile("^(http[s]?):\\/\\/([^:\\/\\s]+)(:([^\\/]*))?((\\/[^\\s/\\/]+)*)?\\/([^#\\s\\?]*)(\\?([^#\\s]*))?(#(\\w*))?$");

public static String isUrlPattern(String url) {
  Matcher mc = URL_PATTERN.matcher(url);
  if (mc.matches()) {
    return mc.group(2);
  }
  try {
    String[] temp = url.split("\\?");
    return temp[0];
  } catch (Exception e) {
    return url;
  }
}
```

이렇게 처리했을 때, 빈번히 호출되는 상황에서 성능을 상당히 끌어올릴 수 있다고 합니다.
테스트를 위해 임시 테스트 클래스를 생성했습니다.

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        long start = System.currentTimeMillis(); //시작하는 시점 계산
        for (int i = 0; i < 100000; i++) {
            PastternTest.isUrlPattern("www.daum.net");
        }
        long end = System.currentTimeMillis(); //프로그램이 끝나는 시점 계산
        System.out.println("실행 시간 : " + (end - start) / 1000.0 + "초"); //실행 시간 계산 및 출력


        start = System.currentTimeMillis(); //시작하는 시점 계산
        for (int i = 0; i < 100000; i++) {
            PastternTest.isUrlPattern2("www.daum.net");
        }
        end = System.currentTimeMillis(); //프로그램이 끝나는 시점 계산
        System.out.println("실행 시간 : " + (end - start) / 1000.0 + "초"); //실행 시간 계산 및 출력
    }


    private static class PastternTest {
        private static final Pattern URL_PATTERN = Pattern.compile("^(http[s]?):\\/\\/([^:\\/\\s]+)(:([^\\/]*))?((\\/[^\\s/\\/]+)*)?\\/([^#\\s\\?]*)(\\?([^#\\s]*))?(#(\\w*))?$");

        private static String isUrlPattern(String url) {
            Matcher mc = URL_PATTERN.matcher(url);
            if (mc.matches()) {
                return mc.group(2);
            }
            try {
                String[] temp = url.split("\\?");
                return temp[0];
            } catch (Exception e) {
                return url;
            }
        }

        private static String isUrlPattern2(String url) {
            Pattern URL_PATTERN2 = Pattern.compile("^(http[s]?):\\/\\/([^:\\/\\s]+)(:([^\\/]*))?((\\/[^\\s/\\/]+)*)?\\/([^#\\s\\?]*)(\\?([^#\\s]*))?(#(\\w*))?$");
            Matcher mc = URL_PATTERN2.matcher(url);
            if (mc.matches()) {
                return mc.group(2);
            }
            try {
                String[] temp = url.split("\\?");
                return temp[0];
            } catch (Exception e) {
                return url;
            }
        }
    }
}
```
100000 번 돌렸을 때 결과는 다음과 같았습니다.  

```
실행 시간 : 0.029초
실행 시간 : 0.308초
```

대략 9~10배 정도의 성능향상이 생길 것으로 기대됩니다.  
