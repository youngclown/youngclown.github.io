---
layout: post
title: "Mybatis에서 IndexOutOfBoundsException이 나왔을 경우"
comments: true
---

```
### Cause: java.lang.IndexOutOfBoundsException: Index 2 out of bounds for length 2
```
에러가 발생했을 경우,  
언뜻보기에는 실제로 배열 범위 오류가 있다고 생각하지만,
lombok을 부적절하게 사용하여 select 를 했기 대문에 일반적인 구분 오류가 난 경우입니다.

```
@Builder
```
주석을 사용한 후 노트가있는 엔티티 클래스는 생성자 표시 를 선언

```
@AllArgsConstructor
```
하거나

```
@NoArgsConstructor
```
구문을 사용 하거나 선언해야합니다.
