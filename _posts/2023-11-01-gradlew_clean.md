---
layout: post
title: "gradlew clean build "
comments: true
---


```
(base) ➜  dcode-apis_231101 git:(master) ✗ ./gradlew clean build --refresh-dependencies
FAILURE: Build failed with an exception.

* What went wrong:
  Timeout waiting to lock daemon addresses registry. It is currently in use by another Gradle instance.
  Owner PID: unknown
  Our PID: 69227
  Owner Operation: unknown
  Our operation:
  Lock file: /Users/bymin/.gradle/daemon/6.7/registry.bin.lock

* Try:
  Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org
```


--refresh-dependencies: 
이 옵션은 프로젝트의 의존성(dependencies)을 새로 고침하는 역할을 합니다.  
이는 프로젝트의 Gradle 설정 파일 (보통은 build.gradle 또는 build.gradle.kts)에서 정의된 의존성을 검사하고,  
캐시된 의존성 정보를 업데이트합니다.  
이렇게 하면 최신 버전의 라이브러리 및 종속성을 사용할 수 있게 됩니다.


```
(base) ➜  dcode-apis_231101 git:(master) ✗ ./gradlew --stop
Stopping Daemon(s)
2 Daemons stopped

```

다른 Gradle 데몬 인스턴스가 실행 중인 경우, 해당 프로세스를 종료하고 다시 시도하는 것이 좋습니다.   

만약 stopped 가 잘안되면,  
```
ps -ef | grep gradle
```

로 검색 후 kill -9 프로세스ID 로 처리 가능합니다.  