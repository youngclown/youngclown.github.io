---
layout: post
title: "Execution failed for task"
comments: true
---


```
Execution failed for task ':xxx:bootJar'.
> Main class name has not been configured and it could not be resolved
```


해당 xxx 모듈에 build.gradle 내용 추가..

```
bootJar {
    enabled = false
    archiveVersion = '0.0.1-SNAPSHOT'
    archiveExtension = 'jar'
}

jar {
    enabled = true
}
```

다중 모듈의 경우, bootJar 와 jar에서 메인 클래스가 없는 경우 발생할 수 있는 문제입니다.   
