---
layout: post
title: "jdk version history(jdk 버전간 차이)"
comments: true
---

CentOS 6.9(Final) 에 jdk 11 설치
---


1. jdk 11 다운로드 받아, /usr/local 로 이동시킴

```
curl -O https://download.java.net/java/GA/jdk11/13/GPL/openjdk-11.0.1_linux-x64_bin.tar.gz
tar zxvf openjdk-11.0.1_linux-x64_bin.tar.gz
mv jdk-11.0.1 /usr/local/
```



2. jdk11 을 JAVA_HOME 변수에 export 시킬 스크립트 작성

```
vi /etc/profile.d/jdk11.sh
```

```
# create new
export JAVA_HOME=/usr/local/jdk-11.0.1
export PATH=$PATH:$JAVA_HOME/bin
```

```
source /etc/profile.d/jdk11.sh
```

3. 자바 버전 확인

```
java -version
```


자바 버전이 11이 아니라 계속 기존 설정 값일 경우,
---

설치된 /usr/bin/java 를 1번에서 설정한 폴더로 변경
```
sudo update-alternatives --install /usr/bin/java java /usr/local/jdk-11.0.1/bin/java 1
sudo update-alternatives --config java
````

```
[root@localhost java]# sudo update-alternatives --config java

2 개의 프로그램이 'java'를 제공합니다.

  선택    명령
-----------------------------------------------
*  1           /usr/lib/jvm/jre-1.8.0-openjdk.x86_64/bin/java
 + 2           /usr/local/jdk-11.0.1/bin/java

```
위의 값에서 기존 2번을 선택함.  
