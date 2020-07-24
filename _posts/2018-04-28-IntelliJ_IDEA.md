---
layout: post
title: "IntelliJ_IDEA 기본 설정"
date: 2018-04-28 14:08:00 +0900
comments: true
---

# 인텔리제이 설정


<H1>1. 플러그인 설치</H1>

Camelcase
---
카멜케이스 변환 플러그인

Java Method Reference Diagram
---
기본적으로 Ctrl+ALt+U(윈도우기반 단축키 기준)을 하면 UML을 보여주는데 이 플러그인을 설치하면 메소드 레퍼런스도 볼 수 있음
UML을 볼때 연관 Class들을 source explorer 에서 선택한 상태에서 보면 유용합니다.

Nyan Progress Bar : 고양이 Progress Bar
-----
 - https://plugins.jetbrains.com/plugin/8575-nyan-progress-bar

```
String manipulation : alt + m (텍스트 편집기, 카멜케이스등의 가이드 제공)
Translation   : 번역기
grep console  : log에 색깔 입히기(특정단어만 log창에 띄울수있음.)
generateAllSetter
  : 객체 생성하고, alt + enter setter 자동 생성(객체생성시 생성한 객체에 alt_enter 시 setter에 대한 메뉴등장)
codeglance  : 스크롤 옆에 화면 파일에 대한 전체 flow 축소하여 보여줌
Power Mode ll : 타자를 입력시 불꽃효과
gittoolbox : 푸시한 사람과 푸시 시간이 출력됨 (무거움)
```





 <H1>2. 단축키</H1>

ctrl + E
---
최근 작업 소스

shift + shift
-----
만능 서치

VM 용량 변경작업
---
windows
```
IDE_HOME\bin\<product>[bits][.exe].vmoptions
```
mac
```
/Applications/<Product>.app/Contents/bin
```

-----


SVN checkout 시 에러날 경우
---

```
Cannot load supported formats: Cannot run program "svn": CreateProcess error=2, The system cannot find the file specified
```

```
_Settings -> Version Controll -> Subversion -> Use command line client
```
위와 같은 내용을 체크 해제하라는 글을 봤는데, 2018.01 버전에서는 해당 옵션이 보이지않습니다.

결국 svn 재설치를 하여 해결했습니다.   
[Slik-Subversion-1.9.7-x64.msi](https://sliksvn.com/pub/)설치합니다.

Version Control > Subversion 의 경로를,
```
C:\Program Files\SlikSvn\bin\svn.exe
```
로 설정합니다.


프로퍼티 에디터
---
```
Settings -> Editor -> file encoding -> Transparent native-to-ascii conversion 체크
```
![이미지](/images/20180428intelliJ_idea.PNG){: width="100%"}

해당 기능을 체크하면, 한글이 유니코드로 깨져서 보여지는 것이 한글로 변환되어 보여지게 됩니다.


VM 파라미터
-----
경로 :
```
- 64bit : C:\Program Files\JetBrains\IntelliJ IDEA 2018.1.2\bin\idea64.exe.vmoptions
```
VM 옵션
```
-Xms256m
-Xmx2048m
-XX:ReservedCodeCacheSize=240m
-XX:+UseConcMarkSweepGC
-XX:SoftRefLRUPolicyMSPerMB=50
-Duser.name=bymin
-Dfile.encoding=UTF-8
-ea
-Dsun.io.useCanonCaches=false
-Djava.net.preferIPv4Stack=true
-XX:+HeapDumpOnOutOfMemoryError
-XX:-OmitStackTraceInFastThrow
```

```
-Dfile.encoding=UTF-8 는 꼭 해줘야합니다. 콘솔창 등에서 한글이 깨지지 않게 하기 위한 설정값입니다.
```

TOMCAT VM 파라미터
-----

```
-Dfile.encoding=UTF-8
-Dfile.client.encoding=UTF-8
-Dfile.encoding.override=UTF-8
```


TOMCAT SSL 설정
-----

옵션에 있는 https 포트 설정은 왜 만들어 져있는지 모르겠으나, 해당 값에 대한 설정 처리가 안됩니다.
실제 톰캣 경로의 server.xml을 수정해서 ssl 설정을 마무리했다는 글밖에 없으며,
별도의 instance를 생성하여 처리하는 방안밖에는 없어 보입니다.
(이클립스의 서버별 tomcat의 분리 instance를 자동으로 생성하는 부분이 아쉽습니다.)



Exception in thread "main" java.lang.NoClassDefFoundError: javax/servlet/http/HttpServlet
---

```
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.0.1</version>
            <scope>provided</scope>
        </dependency>
```

servlet 을 provided로 설정했을 경우, intelliJ에서는 별도의 Main class 에서 동작시에는,
IntelliJ 설정에서
include dependencies with "Providd" scope 체크를 해야합니다.

폰트설정
---
Ctrl+Alt+S > 키워드: Font를 친 후


Gradle 5.0 version 이슈
----
Gradle 5.0 이상의 경우 인텔리J 2019.1 버전으로 올리지 않으면 에러가 발생합니다.



IntelliJ 단축키 모음
-----

ctrl + alt + L 전체 코드 재정렬
ctrl + Z undo
ctrl + shift + Z redo
shift + shift 모든검색
ctrl + D 줄복사






-----
# 참조
-----

* [인텔리제이 configuring-encoding-for-properties-files](https://www.jetbrains.com/help/idea/configuring-encoding-for-properties-files.html)

* [김세중 SENSE](https://sejoung.github.io/2017/11/IntelliJ_IDEA)

* [인텔리제이 단축키를 빨리 습득하고 싶으실떄 유용한 동영상](https://www.youtube.com/watch?v=eq3KiAH4IBI)

* [인텔리제이 JVM-options-and-platform-properties](https://intellij-support.jetbrains.com/hc/en-us/articles/206544869-Configuring-JVM-options-and-platform-properties)

* [툴박스 설명](https://blog.jetbrains.com/blog/2016/05/25/introducing-jetbrains-toolbox-app/)

* [Jetbrain 계열 IDE에서 SVN checkout 에러 해결](http://chomman.github.io/blog/tool/subversion/intellij-subversion-checkout-error/)
