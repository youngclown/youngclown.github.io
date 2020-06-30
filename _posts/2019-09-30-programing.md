---
layout: post
title: "프로그래밍 원칙"
comments: true
---

-- 면접봤던 질문 내용에 대해 간략하게 정리합니다.--

# SOLID (객체 지향 설계)

두문자   | 약어   | 개념 | 설명 |
:----|:-----------|:-------|:------|
S | SRP  | 단일 책임 원칙 (Single responsibility principle)  | 한 클래스는 하나의 책임만 가져야 함. |
O | OCP | 개방-폐쇄 원칙 (Open/closed principle)  | 소프트웨어 개체(클래스, 모듈, 함수 등등)는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 함 |
L | LSP  | 리스코프 치환 원칙 (Liskov substitution principle)  | 프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야함. |
I | ISP  | 인터페이스 분리 원칙 (Interface segregation principle)  | 특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 나음. |
D | DIP    | 의존관계 역전 원칙 (Dependency inversion principle) |  프로그래머는 추상화에 의존해야지, 구체화에 의존하면 안됨 |  


# YAGNI

You aren't gonna need it
