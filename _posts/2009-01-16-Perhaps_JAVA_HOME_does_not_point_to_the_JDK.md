---
layout: post
title: "Perhaps JAVA_HOME does not point to the JDK 오류"
date: 2009-01-16 14:30:00 +0900
comments: true
---

<!--# Perhaps JAVA_HOME does not point to the JDK 오류-->

문제 발생
---
```
exception
org.apache.jasper.JasperException: Unable to compile class for JSP
Unable to find a javac compiler;
com.sun.tools.javac.Main is not on the classpath.
Perhaps JAVA_HOME does not point to the JDK
```


문제에 대한 고찰
---
```
1. Tomcat 을 install 버전으로 깔았습니까?
2. 인스톨 할 당시에 JRE 버전을 1.5 로 맞추었습니까?

여하튼 Tomcat 의 JRE 버전은 1.5 이면서, JAVA_HOME 따위는 건드리지 않고 이클립스가 저절로 잡아준다고
확신하고 살아가는 당신이라면, 문제가 발생할 수 있습니다!
```


원인은?
---

톰켓이 JSP 파일을 JAVA 파일로 바꾸고, 이를 컴파일 하기 위해서는 1.5 버전에서는 tools.jar 파일이 필요합니다.
그래서 CLASS_PATH 가 잡여 있어야 하는데, 이게 적용이 잘 안되는 경우가 있는것 같습니다.

```
조치 1.

내컴퓨터 오른쪽 클릭 > 시스템 등록정보 > 고급 > 환경변수
에서 JAVA_HOME 경로를 제대로 맞추어 줍니다.

조치 2.
%JAVA_HOME%\lib\tools.jar 파일을 %CATALINA_HOME%\common\lib 폴더에 COPY 해 넣습니다.
```

해결
---

한마디로 환경변수로 1.5 위치를 잡아 주던가, 아니면 그냥 TOMCAT 의 common 안의 lib 폴더안에, tools.jar 파일을 넣어둡시다.
