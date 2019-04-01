---
layout: post
title: "스프링 프레임워크를 기반으로 한 개발플랫폼 01"
comments: true
---

스프링 부트 기능정의
---

단독실행가능한 스프링 애플리케이션 생성
내장 컨테이너로 톰캣, 제티, 혹은 언더토우 중에서 선택가능
스타터(starter)를 통해 간결한 의존성 구성지원
스프링에 대한 자동구성(Auto-Configuration) 제공
더이상 XML 구성 필요없음 (pom.xml 정도만 작업 후 순수한 자바만 가지고 적용가능.
제품 출시(release) 후 운영에 필요한 다양한 기능(상태점검, 모니터링 등) 제공 (healthcheck?)

스프링부트 구성요소
---

빌드도구(그레이들 vs 메이븐) : 요근대는 그레이들을 많이씀. (아직 maven 사용)
스프링 프레임워크(4.x vs 5.x)
스프링 부트(v1.5 vs v2.0)
스프링 부트 스타터(spring-boot-starter)

프랑스 철학자 '장 풀 샤르트르'가 인생은 BCD 라고 했다고 합니다.
태어나고(Bitch)- 죽는(Death) 사이에 수많은 선택을 한다고,

스트링 부트 또한 BCD입니다.
```
Build - Code - Deploy
```

- Build
- Code.
  - spring-boot-starter
  - Auto-configuration
  - programming in spring enviroment
- Deploy


Build(빌드)
---

[spring initializr]:(https://start.spring.io)를 통해 파일을 생성해서 다운받을 수 있습니다.

Java va Kotilin vs Groovy
---
스프링 부트는 자바, 코틀린, 그루비를 지원합니다.

빌드도구로는 그레이들과 메이븐이 있는데,
의존성과 빌드동작들을 실행하는 스크립트가 존재합니다.
그래들은 build.gradle 에 선언하고 maven의 경우 pom.xml 에 선언하게 됩니다.

Executable Jar or war

실행학능한(Executable) JAR (or WAR) : App 과 tocmat 이 공존
고전적인 WAR : 톰캣과 APP이 분리되어있는 형태

스프링부트는 2.0부터!!
---
1.5 는 스프링 4 지원 2.0은 스프링 5 지원이며 주가되는 것은 스프링부트 2.0을 주가 됩니다.

스프링부트는 애너테이션 기반으로 작동(컴포넌트를 탐색하여 동작함.)
---
@SpringBoodtApplication(with SpringApplication)
@ComponentScan
@EnableAutoConfiguration
@configuration
@ConditonalOn~~
@SpringBoodtConfigration(= @Configuration)
@EnableConfigurationProperties
@ConfigurationProperties

Auto-Configuration
---
- spring-starter 를 github에서 검색가능합니다.
- 스프링부트가 기술흐름에 따라 제공하는 관례(Convention)적인 구성
- 봐야할 모듈 : spring-boot-autoconfigure
- 동작선언
  - @EnableAtuoConfigurazion(with @SpringBootApplication)
  - @Configuration
- tkdyd dosjxpdltus
  - @Configuration
  - @ConditonalOn

외부구성(External Configuration)
---
1. 실행인자
2. spring_application_json
 - 서버안에 json 으로 선언한 구성파일의 위치 지정
3. 환경변수(운영체제)
4. 기타등등
5. application.yml or application.properties
6. application-{defaultprofiles}.yml

1이 우선순위가 가장높습니다.

Programming in Spring Environment
---

- @ComponentScan 을 통해 ApplicationContext 적재
  - @Repository
  - @Component
  - @Service
  - @Controller & @RestController
  - @Configuratioin
    - @Bean
    - @ConfiguraitonProperties
  - DI, IoC, @Autowired
  - @Value Vs @ConfigurationProperties
  - AOP 프로그래밍

완료
-- 업무 구현(비즈니스 로직)
