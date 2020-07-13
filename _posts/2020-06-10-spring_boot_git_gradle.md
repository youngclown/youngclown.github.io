---
layout: post
title: "스프링부트 다중 모듈 아키텍쳐"
comments: true
---


보통의 구조 아키텍쳐를 구성할 때는 core, common, api 로 크게 3개를 나눕니다.  
core는 중요하고 거의 동작하지 않는 서버간의 연결 정도 (RDBMS, NOSQL) 등의 설정을 관리합니다.  

common 은 도메인 및 dto, model등을 관리합니다.  

api, sender, batch 는 각각의 설정에 따라 분리되어 동작하는 어플리케이션(Service)를 관리합니다.  

```
- core
  - redis
  - db connetion
- common
  - util
- api(request)
  - request Api
- sender
  - local call
- batch

```

즉, core는 redis 등 타 lib 을 처리하며, common 은 util 성을 처리하고자 합니다.  

api 는 외부에서 오는 connection 을 처리하며, sender 는 서버 to 서버 용도로 사용할 경우 각기 다른 용도로 처리하게 됩니다.   
batch 는 매분, 매시간, 매일, 매달 돌아가는 배치성 프로세스가 동작할 예정이라, 해당 어플리케이션을 각각의 스프링부트로 별도 구성 예정입니다.  
(soft한 MSA)

고민되는 부분이 core 랑 common 은 거의 중복되는 소스로 구성되게 되어,
실제 프로젝트는

```
api(Request)
   - core
   - common
   - api(request)

sender
   - core
   - common
   - sender

batch
   - core
   - common
   - batch
```

로 core와 common 이 중복되서 처리되게 될 가능성이 높습니다.   

그래서, core 와 common을 별도의 git으로 관리하여 하나의 프로젝트로 처리하는 부분을 고려해야합니다.  


즉,

```
api (개발자가 로컬에서 직접생성)
  - core (core 로 별도의 git 제어)
  - common (common 이라는 별도의 git 제어)
  - api (api 라는 별도의 git 제어)
```

형태로 처리하고자 합니다.   

다만, 같은 git 이나 모듈로 관리하기 편하게 해당 명칭은 앞에 접두사를 붙이는 걸 권합니다. 예를 들어,

```
extCore
extCommon
extApi
```

로 한눈에 보이는 것으로 처리하는게 좋습니다!  


core 와 common 과 api 가 이미 git에 올라가 있다고 가정했을 때,  

```
인텔리J에서
new Project > gradle > Artifact Coordinates > GroupId 로,
기존 GroupId를 맞춥니다. (올려진 git의 group으로)
```

만들어진 src를 삭제합니다. 새로워진 프로젝트에는 필요하지 않습니다.  

소스트리를 사용하여, 만들어진 프로젝트 경로에 앞서 말한 core와 api 를 다운받습니다.   
만들진 프로젝트는 다음과 같아집니다.

```
api
  - .gradle
  - .idea
  - gradle
  - xxxCore
  - xxxApi
  build.gradle
  settings.gradle
```

xxx 를 접두사로 붙여 한줄에 보이도록 조치합니다.  

api 를 우측버튼을 누른 후에, new Module을 선택합니다.  
new Module > grale > xxxCore 를 생성하면, 이미 체크아웃되어있는 git에 연결됩니다.  
build.gradle 을 history를 보고 복원해야합니다.  

```
xxCore 는
 - src
 - build.gradle만 설정되면 됩니다.
```

우선 root 의 settings.gradle 을 확인합니다.  

```
include 'xxxCore'
include 'xxxApi'
```

이렇게 자동으로 추가되어있을겁니다.

이제 root 프로젝트의 build.gradle을 확인합니다.

```
group 'com.ssp'
version '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

buildscript {
    ext {
        springBootVersion = '2.2.6.RELEASE'
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
        classpath "io.spring.gradle:dependency-management-plugin:1.0.9.RELEASE"
    }
}

/*
plugins {
    id 'org.springframework.boot' version '2.2.6.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'
}
 */


subprojects {
    group 'com.xxx'
    version '1.0'
    apply plugin: 'java'
    apply plugin: org.springframework.boot.gradle.plugin.SpringBootPlugin
    apply plugin: 'io.spring.dependency-management'

    repositories {
        mavenCentral()
    }

    dependencies {
        // 여기 설정은 sub 프로젝트에 모두 적용됨
        compile('org.springframework.boot:spring-boot-starter-web')
        testCompile('org.springframework.boot:spring-boot-starter-test')
    }
}

project(':xxxApi') {
    dependencies {
        compile project(':xxxCore')
    }
}
```
로 설정하면 설정이 끝나게 됩니다.


참고주소 : https://jojoldu.tistory.com/123
