---
layout: post
title: "Docker와 VirtualBox 동시 사용 불가"
comments: true
---

도커와 VirtualBox 동시에 사용이 불가능합니다.

- Docker Desktop은 Hyper-V가 enable(활성화)되어 있어야 합니다.
- Hyper-V가 활성화된 상태에서는 VirtualBox 사용 불가합니다.
- 요구조건(Hyper-V) 불충족 PC에서의 경우는 Hyper-V대신 Oracle VirtualBox로 구동되는 Docker-Toolbox 제공합니다.


도커를 사용하려고 했다가 윈도우 상세 서비스를 분리해서 사용해보고 싶어 VirtualBox로 재적용했습니다.


처음 centos 7 설치했을 때, 기존에 알고 있는 기능과 상이한 점이 많았습니다.

 ```
 sudo: update-rc.d: 명령이 없습니다
 ```

yum install sysv-rc-conf


```
firewall-cmd --permanent --zone=public --add-port=5105/tcp
```

특정 포트 open

```
while true; do sleep 2; clear; date; route -n; done
```

결국, centos 6으로 변경해서 사용합니다. 
