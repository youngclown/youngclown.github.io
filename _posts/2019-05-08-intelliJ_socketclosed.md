---
layout: post
title: "IntelliJ_IDEA"
comments: true
---

서버 재시작이 안되며 에러문구
---

```
오전 11:23	Error running 'Tomcat': Address localhost:2099 is already in use
오전 11:23	Error running 'Tomcat': Unable to open debugger port (127.0.0.1:6662): java.net.SocketException "socket closed"
```

계속 뒤에 있는 문자때문에,

Error running 'Tomcat': Unable to open debugger port (127.0.0.1:6662): java.net.SocketException "socket closed"  

를 해결하려고 했으나, 원인은 처음 발생했던   

```
Error running 'Tomcat': Address localhost:2099 is already in use  
```

2099 포트가 문제였습니다.
Tomcat edit 화면에 가서 JMX port 를 변경하여 문제를 해결했습니다.

개발할때 성격 상,  
debug mode 로 값을 수정하면서 여러가지 case by case 를 테스트하는 성격이라,  
서버 실행 중에 소스 수정이 많고,   
재시작이 빈번한 편입니다.  

또한 local(windows) 환경과, centos 환경의 차이가 있을 수 있어(Encoding), 실 서버에 ftp로 연결하면서,
윈도우 특정상 파일을 점거하고 있어,

인텔리J가 해당 파일을 변경하지 못하여, 불안정하게 종료되면서 포트가 안죽는 이슈가 간혈적으로 발생합니다.

명령프롬포트창인
```
netstat -a -o
```
를 입력합니다. 그러면 수많은 네트워크를 사용하고 있는 프로세스들의 목록이 출력됩니다.
프로토콜 / 로컬 주소 / 외부 주소 / 상태 / PID 형태로 출력이 되는데요. 너무 많은 프로세스가 뜨기 때문에, 해당 port를 특정할 필요가 있습니다.   

우리가 원하는 port 는 2099 이므로 다음과 같은 형태의 살아있는 port를 찾습니다.  
(아래 테스트 문구는 52124라는 포르틀 찾는 예제 명령어입니다.)

```
\apache-tomcat-8.5.23\bin>netstat -a -o | find ":52124"
  TCP    192.168.100.11:52124   5.62.53.224:http       CLOSE_WAIT      2728
```

이제 PID 번호(2728)를 확인한 다음에 해당 프로세스ID를 종료시키면됩니다.

```
taskkill /f /pid PID번호
```

를 사용하면, 바로 해당 프로세스가 종료됩니다.   
저는 해당 프로세스를 킬하기보다는 JMX Port 를 변경하는 식으로 작업을 합니다.  
