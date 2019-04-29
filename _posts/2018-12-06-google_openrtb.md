---
layout: post
title: "google_openRTB"
comments: true
---

문서 정리겸 정리합니다.
----


[github](https://github.com/google/openrtb)에 올라온 google openrtb 를 정리해봅니다. google openRTB 연동에 관한 여러 고민이 있었습니다.


The OpenRTB specification
----



This library implements the protocol / data model from the latest OpenRTB Specification, so reading that should be your first step; it's also a good introduction to the concepts of real-time bidding.

OpenRTB is only specified in terms of JSON messages, so an implementation has to provide bindings for specific programming languages so you can create and manipulate its message objects in a convenient way, i.e. not needing to deal with the raw JSON representation. We do that by first translating the specification to a Protocol Buffer descriptor, which can be used to generate model classes. This library will only build a Java model out-of-the-box, but you can easily use the same Protobuf descriptor to generate the model code for many other languages. (Other features though, are only available for Java or other JVM-based languages.)

해당 google openrtb는 구글 프로토콜 버퍼 (Protocol Buffer)를 사용하여, data model 을 구성하였습니다.


구글 프로토콜 버퍼란?

````
<프토토콜 버퍼>는 랭귀지 중립적, 플랫폼 중립적인 데이터 시리얼라이즈 포맷입니다.  

서로 다른 종류의 머신, 서로 다른 종류의 플랫폼에서 동일한 의미를 갖도록 데이터의 포맷을 정의한다는 점에서 <프로토콜 버퍼>라는 이름은 프로토콜(통신)을 위한 버퍼(데이터)을 뜻하게 되며,  
<프로토콜 버퍼>는 이제 구글의 데이터 공용어 (gRPC의 디폴트 데이터 포맷) 입니다.  

What is gRPC?
- 구글이 정의한 RPC
- 구글의 최신 API는 이제 REST API 뿐 아니라 gRPC API도 함께 제공함
- gRPC는 <프로토콜 버퍼>를 기본 데이터 시리얼라이즈 포맷으로 사용 (JSON 등 다른 포맷도 사용 가능)
- 다양한 랭귀지 지원: C++, Java, Python, Go, Ruby, C#, Node.js, PHP, ...
  (JSON을 <프로토콜 버퍼>로 <프로토콜 버퍼>를 JSON으로 변환 가능)
- XML보다 작고, 빠르고, 간단

````

구글 프로토콜 버퍼를 적용하기 위해서는,
[IntelliJ protobuf plugin](https://github.com/protostuff/protobuf-jetbrains-plugin.git)을 설치해야합니다.
IntelliJ 의 Plugins 에서는 검색이 되지 않습니다.

```
https://plugins.jetbrains.com/plugin/8277-protobuf-support
```
경로에 가서 프로그인을 설치해야합니다.
또한, maven 을 정상적으로 build 하기 위해서는 protoc 를 설치해야하며,
```
https://developers.google.com/protocol-buffers/
```
를 통해 설치하였습니다.

[releases page](https://github.com/protocolbuffers/protobuf/releases/tag/v3.6.1)에서,
protoc-3.6.1-win32.zip 파일을 받아, 윈도우기반에서 환경설정을 하였습니다.

환경설정을 하지 않을 경우에는 경우는 intellij 에, Settings > Other Settings 에서 Protobuf Support 의 경로를 지정해주시면됩니다.
수정할 내용이 있으면 변경후, jar 파일을 만들어서 별도의 import 를 받아 처리해도 되고,

[open-core lib](https://mvnrepository.com/artifact/com.google.openrtb/openrtb-core)에서 dependency 를 추가해도 됩니다.
maven 을 사용하기 때문에,
```
<!-- https://mvnrepository.com/artifact/com.google.openrtb/openrtb-core -->
<dependency>
    <groupId>com.google.openrtb</groupId>
    <artifactId>openrtb-core</artifactId>
    <version>1.5.4</version>
</dependency>
```
해당 버전을 적용해도 상관없습니다.


-----
# 참조
-----

* [Protocol Buffer Basics: Java](https://developers.google.com/protocol-buffers/docs/javatutorial)
