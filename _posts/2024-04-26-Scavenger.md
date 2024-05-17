---
layout: post
title: "런타임 데드 코드 분석 도구 Scavenger"
comments: true
---

> 당신의 코드는 생각보다 많이 죽어있다.

라는 제목으로 Naver Deview 2023 발표가 있었습니다.

요약된 내용은 아래와 같습니다.

```
시스템이 나이를 먹어갈수록 API client들이 서비스를 중단하거나,
기획 스펙 아웃 등의 여러 사유로 인하여 더 이상 사용되지 않는 코드(이하 데드 코드)가 늘어갑니다.

내 API를 사용하던 client들이 사용 중단을 알려주면 좋겠지만,
대부분 사용을 하지 않게 되었다는 사실을 API 제공자에게 알려주지 않습니다.

이런 데드 코드를 주기적으로 확인하고,
청소해 주면 시스템을 쌩쌩하게 유지할 수 있겠지만,
혹시나 이 API를 호출하는 클라이언트가 남아 있을지 모른다는 공포감이 데드 코드를 방치하게 하고,
방치된 데드 코드는 암덩어리처럼 자라게 됩니다.

이 암덩어리는 컴파일과 부팅 속도를 지연시키며,
테스트를 느리게 하고,
리팩토링을 힘들게 하는 등, 두고두고 개발자를 괴롭힙니다.

Scavenger는 이런 문제를 해결하고자 만들어진 DevOps 플랫폼이고
이미 70여 개의 크고 작은 네이버 서비스에 적용되어 있습니다.
네이버가 오픈소스로 공개하고 있는 Pinpoint와 유사한 방식으로 시스템 부팅 시에 Java agent만 설정해 주면, 자동으로 어떤 메서드가 언제 마지막으로 호출이 되었고,
어떤 메서드가 더 이상 호출되지 않는 것인지 기록합니다.
그리고 이를 UI를 통해 쉽게 확인할 수 있습니다.

이 발표에서는 이번 DEVIEW를 통해 오픈소스로 공개하는 Scavenger라는 런타임 데드 코드 분석 도구를 소개하고,
네이버 페이 등의 신규 시스템으로 재개발하는 중에 Scavenger를 활용하여 어떻게 몇십만 라인의 데드 코드를 제거했는지 설명합니다.
또한 Scavenger을 구현하는 데 사용한 bytecode instrumentation 등의 기술적 백그라운드에 대해서도 살펴봅니다.

Scavenger를 사용하면 여러분의 Java 코드가 날씬해집니다!
```


위의 내용에 대한 동영상은 아래와 같습니다.
<iframe width="560" height="315" src="https://www.youtube.com/embed/qE7HY7Y-5vs?si=2ZM5-w9zjZSxhxNt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

요약 내용 : https://news.hada.io/topic?id=8610

- 네이버가 공개한 오픈소스. 네이버내 80여개 서비스에서 사용중  
- 데드코드 : 실행되지 않는 코드 / 실행되더라도 어플리케이션 동작에 영향을 미치지 않는 코드  
- 데드코드의 문제점  
  - 시스템을 이해/유지보수 하기 어렵게 만듦  
  - 성능/보안에 악영향을 줌  
  - 컴파일/테스트 속도를 지연시켜 전체 개발 속도를 저하  
- Scavenger는 
  - 디버깅 또는 로그를 추가하지 않고 메서드 호출이 확인 가능  
  - 메서드 호출 기록을 수집하여 이를 시각화해 유저에게 보여줌  
  - Java agent 방식으로 손쉽게 사용 가능  
- JVM 기반 언어(Java, Kotlin)만 지원  
  - Python은 현재 베타이고, 그외 다양한 언어 지원 예정



pdf 문서 링크 : https://deview.kr/data/deview/session/attach/%5B225%5D%EB%9F%B0%ED%83%80%EC%9E%84+%EB%8D%B0%EB%93%9C%EC%BD%94%EB%93%9C+%EB%B6%84%EC%84%9D+Scavenger+-+%EB%8B%B9%EC%8B%A0%EC%9D%98+%EC%BD%94%EB%93%9C%EB%8A%94+%EC%83%9D%EA%B0%81%EB%B3%B4%EB%8B%A4+%EB%A7%8E%EC%9D%B4+%EC%A3%BD%EC%96%B4%EC%9E%88%EB%8B%A4..pdf  
github opensource 위치 : https://github.com/naver/scavenger  

관련 블로그 등을 검색해봤을 때,  
package 또는 class 단위에서 어느 정도의 method가 호출되었는지 확인할 수 있으며,  
controller 에 사용하지 않는 API 파악에 매우 도움이 될 것이라고 판단합니다.   


 

 