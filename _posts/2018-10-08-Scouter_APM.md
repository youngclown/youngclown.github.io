---
layout: post
title: "Scouter APM 개발환경 구성하기"
comments: true
---

2018년 10월 2일 기준,

[이슈사항](https://github.com/scouter-project/scouter/issues/499)에 대해서 처리해보고 싶어서,
eclipse-jee-photon-R-win32-x86_64 이클립스 사용하여,

git으로,
https://github.com/youngclown/scouter.git 에서 import 로 받아 처리했습니다.

```
추출된 쿼리의 "/" (나누기 연산자 표현 누락현상)
```
현상으로,

[스카우터 쿼리 파서](https://youngclown.github.io/scouterLogParsers/)를 만들어서 쓰다가,
해당 이슈로 인해,
강제로 "/"를 밀어넣는 로직을 구현할 수 밖에 없었습니다. (회사전용으로 특정 패턴시에 "/"를 강제로 삽입.)

간단하게 소스만봤을때 별도의 HttpEncoding을 하거나 특수문자를 삽입하는 부분이 없어, 그냥 넘기다가,
한번 기여해보고 싶어 제대로 된 분석을 하기 위해 셋팅을 하면서 기록을 남깁니다.


1. Scouter Github 저장소에서 내 저장소로 Fork 한다.
2. fork 된 projects 를 내려받는다.
3. lombok 을 설치한다.
4. scala flugin 을 설치한다. Scala IDE (http://download.scala-ide.org/sdk/lithium/e44/scala211/stable/site)
5. build path를 확인하고, 만약 source 디렉토리에 /src/main/scala 가 포함되지 않았다면, 이를 포함시킨다.
6. scouter.server 프로젝트에 scala nature가 포함되지 않았다면, 이를 프로젝트에 포함시킨다. (configure > scala nature)

여기까지 처리해서 소스를 봤더니, 해당 이슈는 클라이언트쪽에서 제대로 파싱을 하지 못하는 이슈로 보여서, 분석을 해보려고했는데,
이미 3일 전에 해결했네요.

[해결]:(https://github.com/scouter-project/scouter/commit/2e414e5162ead351b5289587c8e5755761460cd3#diff-1a2a1326afa8db744212b9d054638943)
우선 분석하고 다음에 기여할 수 있도록 해야겠습니다.
