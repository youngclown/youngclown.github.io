---
layout: post
title: "HOSTNAME 변경"
comments: true
---

HOSTSNAME 변경하는 법
---

1. vim /etc/sysconfig/network

```
NETWORKING=yes
HOSTNAME=xxxx-WAS-05
```

호스트 네임 변경.

2. hostname xxxx-WAS-05

3. vi /etc/hosts
```
127.0.0.1   xxxx-WAS-01 localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
```

여기서 3번은 scouter에서,

```
오류: 에이전트에 예외사항이 발생했습니다. : java.net.MalformedURLException: Local host name unknown: java.net.UnknownHostException: xxxx-WAS-01: xxxx-WAS-01: 이름 혹은 서비스를 알 수 없습니다.
```
라는 오류가 발생하는 경우가 생겨서 입니다.
localhost 가 등록이 되지 않아 못찾는 것이므로 /etc/hosts에 해당 내용을 수정해야합니다.

추가로 서버를 새롭게 설정한 후에 접속이 안되는 이슈가 있었는데,
/etc/hosts 에 자기 자신을 호출 할 수 있게 등록을 해줘야하는 것으로 보입니다.

```
127.0.0.1   xxxx-WAS-01 localhost.localdomain localhost4 localhost4.localdomain4 test.com
10.251.0.xxx test.com
```
