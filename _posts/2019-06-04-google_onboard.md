---
layout: post
title: "클라우드 온보드"
comments: true
---


[Cloud OnBoard](
https://cloudplatformonline.com/2018-onboard-kr-q4?4BEiQABVDF-c3Lkwr9Vy2R0AwXOMyqeKz-a8gnXI9b-1ts9i54mZ7w_wcB)  


클라우드 온보드 (Cloud OnBoard)는 하루동안 무료로 제공되는 교육 이벤트로서 GCP(Google Cloud Platform)의 기술적 측면을 강의식으로 세세하게 소개해준다고 하여 참석하게 되었습니다.

```
클라우드 온보드 - 서울이 2018년 12월 6일 목요일에 개최됩니다.

08:30 AM	행사 등록
10:00 AM	환영 인사 및 키노트
10:40 AM	모듈 1 - Google Cloud Platform 소개
11:20 AM	모듈 2 - Google Cloud Platform 시작하기
12:00 PM	점심식사
01:00 PM	모듈 3 - 클라우드 환경에서의 가상 머신
01:40 PM	모듈 4 - 클라우드 스토리지
02:30 PM	모듈 5 - 클라우드 컨테이너 서비스
03:00 PM	휴식 시간
03:30 PM	모듈 6 - 클라우드 애플리케이션
04:00 PM	모듈 7 - 클라우드 환경에서의 개발, 배포 그리고 모니터링
04:30 PM	모듈 8 - 클라우드 빅데이터 및 머신러닝
05:00 PM	폐회사 및 경품 추첨
```

개별 세션과 기술 시연을 통해 Google App Engine, Datastore, Storage, Container Engine, Compute Engine 및 네트워크, 빅데이터, 머신러닝에 처음 입문하시는 분들에게 길잡이가 되어준다고 하였습니다. 

-  SDN
   - 지역에 개념을 띄어넘을 수 있게 되었다.
   - 하나의 네트워크에서 여러 지역을 묶을 수 있다. HUB을 건널필요가 없다. (라우터 개념이 없다.)
   - 전세계를 하나의 네트워크로 관리할 수 있다.
   
traceroute 외부 아이피를 요청할 경우, Internal 네트워크(사설망)을 연결했을 경우, 하나의 홉으로만 연결할 수 있게 됩니다.
홉이 훨씬 줄어들며 속도도 빨라진다.

Virtual Private Cloud 네트워크
---
 - VPC
   - subnets = 20 --> 각 리젼별로 존재함.
   
   
   스토리지에서 메모리로 갈때는 느리기 때문에 메모리와 스토리지를 떨어뜨리는것은 매우 어려운 일이입니다. 
   
   1.3 Pbps (페타피트) Bisection Brandwidth 라고합니다. 우리 회사는 4gbps 인 IDC를 사용하고 있는데, 정말 놀랍습니다.   
  실제 서버를 사용하다보면, 4 gbps 의 반도 사용하지 못해 스위치에 부담이 되어 지연이 발생하게 되는데, 실제 스위치라든가 해당 기능에 대해서 궁금합니다.  
  
  IaaS : 컴퓨팅, 스토리지, 네트워크 더 세부적으로 제어
  
  PaaS : 런타임 사전 설정, 자바 Go, PHP, Pyhoen 등의 어플리케이션
  
  
  쿠버네티스 : Kubernetes : K8S : 현재 표준화가 되었따.
  하이브리드/멀티 클라우드 세상을 고려한 설계.
  
  컨테이너가 많아 그걸 조절할 수 있는 기능이 만들어졌습니다. 그게 쿠버네티스
 
  

 


