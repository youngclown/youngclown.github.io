---
layout: post
title: "java.lang.UnsatisfiedLinkError: no JniTrustNet in java.library.path"
date: 2011-03-04 09:15:00 +0900
comments: true
---

```
Error >> Failure loading shared library
java.lang.UnsatisfiedLinkError: no JniTrustNet in java.library.path
```

윈도우의 경우 PATH 에 해당되는 lib 을 넣어주지 않을 경우에 발생합니다.
서버 기동시에는 오류가 발생하지 않으나 WebPage 접속시에 해당 오류가 발생합니다.

설정방법은

```
set PATH=해당lib 경로
```

와 같이 실제 dll, lib 과 같은 파일 경로를 잡아줍니다.
보통 Windows/System32 안에 해당 dll 파일을 넣어주면 동작해야하는데,

접근 권한이라든가 그런 문제로 발생하는 걸로 파악됩니다.
