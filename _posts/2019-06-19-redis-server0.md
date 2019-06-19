---
layout: post
title: "WSL에서 netstat 사용하기"
comments: true
---

윈도우에서 실행되어있는 프로세스를 확인 후 삭제하는 것은 다음과 같습니다.

```
\apache-tomcat-8.5.23\bin>netstat -a -o | find ":52124"
  TCP    192.168.100.11:52124   5.62.53.224:http       CLOSE_WAIT      2728
```

이제 PID 번호(2728)를 확인한 다음에 해당 프로세스ID를 종료시키면됩니다.

```
taskkill /f /pid PID번호
```

리눅스에서는 보통 다음과 같은 방법으로 프로세스를 확인하고 저는 삭제합니다.

```
root@DESKTOP-RNJILIO:~# ps -ef|grep redis
root        74    15  0 15:41 tty1     00:00:00 ./redis-server
root        96    15  0 15:49 tty1     00:00:00 grep --color=auto redis
root@DESKTOP-RNJILIO:~# kill -9 74
```

이렇게 할 경우 74번 프로세스가 삭제되면서 자동적으로 해당 port 가 사라집니다.  

근데 WSL(Windows Subsystem For Linux)에서 프로세스를 실행하면,
윈도우의 열려진 port 를 확인할 수 있지,  

```
netstat -tnlp
```
를 쳐도 해당값이 보여지거나 하지는 않습니다.  

2018년 4월 기준으로 WSL의 문제로 netstat 명령은 올바르게 동작하지 않는다고합니다.
[참고주소](https://zetawiki.com/wiki/WSL%EC%97%90%EC%84%9C_netstat_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)에서 그럴 경우,
WSL의 리눅스 배포판 내에서는 윈도우용 응용 프로그램의 실행을 허용하기 때문에 윈도우의 NETSTAT.EXE를 alias로 가져와서 사용할 수 있다고 하여,
해당값을 그대로 사용할 수 있는 것을 확인했습니다.

```
root@DESKTOP-RNJILIO:~# /mnt/c/Windows/System32/NETSTAT.EXE -a | grep ':50'
  TCP    0.0.0.0:5040           DESKTOP-RNJILIO:0      LISTENING
  TCP    0.0.0.0:50391          DESKTOP-RNJILIO:0      LISTENING
  TCP    0.0.0.0:50392          DESKTOP-RNJILIO:0      LISTENING
  TCP    127.0.0.1:50351        www:50352              ESTABLISHED
  TCP    127.0.0.1:50352        www:50351              ESTABLISHED
  TCP    127.0.0.1:50353        www:50354              ESTABLISHED
  TCP    127.0.0.1:50354        www:50353              ESTABLISHED
  TCP    127.0.0.1:50374        DESKTOP-RNJILIO:0      LISTENING
```

옵션과 일부 사용법의 경우 윈도우의 NETSTAT와 리눅스의 netstat 간에 상이할 수 있어 사용옵션은 윈도우를 따르며 grep 방법은 리눅스 방법을 따라야합니다.  
