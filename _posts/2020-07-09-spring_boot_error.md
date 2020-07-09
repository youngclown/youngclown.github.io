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
