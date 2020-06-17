---
layout: post
title: "Failed to retrieve application JMX service URL and AttachProvider for the vm is not found"
comments: true
---

```
Failed to retrieve application JMX service URL and AttachProvider for the vm is not found
```

실제 원인은 build.gradle은 java 11 버전으로,
Run Configurations 의 JRE는 12 로 설정해서 발생하는 오류였습니다.

Toy project 진행시에, 경고 에러만 뜨고 정상적으로 화면은 부팅되어서, 미루고 미루다가 오늘 해결했네요.



참고주소 : https://youtrack.jetbrains.com/issue/IDEA-220666
