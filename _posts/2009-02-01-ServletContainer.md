---
layout: post
title: "Servlet Container에서 JAR 파일 설치 시 주의할 점"
date: 2009-02-01 18:06:00 +0900
comments: true
---

Tomcat4.X의 경우
---

```
commons-collection.jar, commons-logging.jar
```

Tomcat5.X인 경우
---

```
commons-collections.jar
```

해당 파일이 이미 Tomcat의 common/lib에 이미 설치되어 있으므로 일부 이긴 하지만 jar 파일이 충돌이 나는 경우가 있을 수 있습니다.

작성하는

```
Web Application의 WEB-INF/lib
```

에는 이런 파일을 lib 폴더에 넣지 않는 것이 좋습니다.

PS . 가끔가다가 jar 파일을 JRE 에다가 넣어야할 때가 있고, JRE에 넣었는데도 서블릿에서 찾지 못할 경우에는 서블릿 쪽에다가 넣어야할 때도 존재합니다.

그럴때는 두군대에 같은 jar 파일을 넣어두었다는 것을 꼭 기록에 남겨두록 합시다. ^-^;
언제 다른 서블릿 컨테이너와 충돌날지 장담할 수 없으니까요. ^-^
