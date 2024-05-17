---
layout: post
title: "CloudRun 도입 전 Log 설정"
comments: true
---


대부분의 프로젝트에서 구글 클라우드의 로깅을 위한 Logback 통합 라이브러리가 build.gradle 에 설정되어있습니다.
```
implementation 'com.google.cloud:google-cloud-logging-logback:0.129.1-alpha'
```

이번에 CloudRun 도입시 'Failed to find a usable hardware address from the network interfaces; using random bytes:' 
오류가 발생했고, 문제가 생긴 이유는 Netty 로 인한 오류였습니다. 

추가적으로 https://mvnrepository.com/ 사이트에서 확인 시, 종속성으로 인한 취약점 또한 가지고 있습니다.
(https://mvnrepository.com/artifact/com.google.cloud/google-cloud-logging-logback)
그로인해, 새로운 logback 라이브러리를 도입하는 것이 좋을 듯 하며, 추천하는 라이브러리는 다음과 같습니다.  

# Logback

```
implementation 'ch.qos.logback:logback-classic:1.5.5'
```
https://mvnrepository.com/artifact/ch.qos.logback/logback-classic

# log4j

```
implementation 'org.apache.logging.log4j:log4j-api:2.23.1'
```
https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-api

둘 중에 하나를 선택하면 됩니다.  
log4j 의 경우 2021년 경 보안 이슈가 있었는데, 지금은 버전이 올라가 적용을 하여도 문제 없습니다.
https://namu.wiki/w/Log4j%20%EB%B3%B4%EC%95%88%20%EC%B7%A8%EC%95%BD%EC%A0%90%20%EC%82%AC%ED%83%9C?from=Log4j#s-2.1
https://www.igloo.co.kr/security-information/apache-log4j-%EC%B7%A8%EC%95%BD%EC%A0%90-%EB%B6%84%EC%84%9D-%EB%B0%8F-%EB%8C%80%EC%9D%91%EB%B0%A9%EC%95%88/  

현재 logback 라이브러가 종속성으로 인한 취약점이 있다고 maver repogitory사이트에서 확인되어, 
log4j 를 설정하는게 오히려 좋지 않을까 판단합니다.  

logback 과 log4j 둘다 적용하여, 정상적으로 GCP의 로그탐색기에 수집되어 동작하는 것을 확인했습니다.  

로그 관련 라이브러리를 다 제거하고, 순수한 스프링부트의 내장 라이브러리를 사용해도 무방하며(logback 과 동일한 구조로 실행됩니다.), 그래도 구현체를 주입시키는 게 좋다고 생각하여, logback 이나 log4j 로 변환하는 것에 대해 의견을 정해 진행하길 원합니다.  

# logback.xml

GCP 에 CloudRun 이 도입되게 된다면 (모든 데이터는 로그탐색기에서 보게 되므로),  
기존에 file로 저장하거나, console로 저장하거나 자체 커스텀 하던 logback-xxx.xml 을 console-appender.xml 만 사용하도록 정의하는게 좋습니다.  

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="30 seconds">
    <include resource="config/logback/console-appender.xml" />
    <logger name="kr.co.xxx.api" level="DEBUG"/>
    <root level="INFO">
        <appender-ref ref="APTICONSOLE"/>
    </root>
</configuration>
```

대부분 프로젝트는 console-appender.xml 과 file-rolling.xml 가 구성되도록 작업되어있고,  
file의 경우 APTIROLLING , console의 경우 APTICONSOLE로 호출하게 개발된 것으로 파악됩니다.  


CloudRun 의 경우, 위의 xml 로 정의된 것처럼 console(APTICONSOLE) 로 설정하면 됩니다.  

Google Cloud Logging은 Google Cloud Platform (GCP)의 로그 관리 및 분석 서비스로 표준 출력 (stdout)과 표준 오류 (stderr) 스트림을 자동으로 수집합니다.  
별도의 구성없이 자동으로 활성화되기 때문에, 로그 데이터를 로그탐색기로 보내어, 사용자가 쉽게 로그를 조회하고 분석할 수 있게 합니다.  
오히려 실수로 APTIROLLING 와 APTICONSOLE를 2개가 동작하게 설정하면, 자동으로 로그 데이터를 2배로 보내게 되어, 관련 트래픽 비용이 2배로 발생하게 될 수 있습니다.  

# 참고 사항1

```
private static final Logger log = LoggerFactory.getLogger(클래스명.class);
```
으로 해도 되나, 편리하게
```
@Slf4j
```
클래스 상단에 @Slf4j 를 설정하여 처리하는 게 코드 간결성이 더 편하다고 생각합니다.  
Slf4j는 로깅에 대한 추상화 계층을 제공하는 라이브러리로, 다양한 백엔드 로깅 프레임워크 (예: Log4j, Logback, Java Util Logging 등)와의 통합을 제공해줍니다.  
@Slf4j는 컴파일 시점에 실제 로깅 프레임워크를 결정하므로, 코드의 유연성을 높여주기에, Slf4j를 사용하면 코드의 종속성을 최소화합니다.  

# 참고 사항2

로그를 전부 로그탐색기에 보게 되면, logback.xml 을 지금 처럼 다양한 파일(logback-local.xml, logback-qa.xml)이 아닌,  
```
    <springProfile name="dev, stage, master">
        <logger level="INFO" name="xxx" />
        <root level="INFO" >
            <appender-ref ref="xxx" />
        </root>
    </springProfile>
```

와 같은 하나의 파일에서 관리하는 것도 좋다고 생각합니다.