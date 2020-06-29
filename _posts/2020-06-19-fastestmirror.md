---
layout: post
title: "loaded plugins: fastestmirror"
comments: true
---

yum update 나 yum check-update 를 실행했는데 "loaded plugins: fastestmirror" 라는 메시지가 나오고 Hang on 되는 현상

* KT olleh  
  -. 기본 DNS 주소: 168.126.63.1  
  -. 보조 DNS 주소: 168.126.63.2

* SKT  
  -. 기본 DNS 주소: 210.220.163.82  
  -. 보조 DNS 주소: 219.250.36.130  

* LGU+  
  -. 기본 DNS 주소: 164.124.107.9  
  -. 보조 DNS 주소: 203.248.242.2  

* Google public  
  -. 기본 DNS 주소: 8.8.8.8   
  -. 보조 DNS 주소: 8.8.4.4  


```
[root@localhost ~]# /etc/init.d/network restart
인터페이스 eth0 (을)를 종료 중:                            [  OK  ]
인터페이스 eth1 (을)를 종료 중:                            [  OK  ]
loopback 인터페이스 종료 중:                               [  OK  ]
loopback 인터페이스 활성화중 입니다:                       [  OK  ]
eth0 인터페이스 활성화중 입니다:  Determining if ip address 10.0.2.101 is already in use for device eth0...
                                                           [  OK  ]
eth1 인터페이스 활성화중 입니다:  Determining if ip address 192.168.56.101 is already in use for device eth1...
                                                           [  OK  ]
```


참고주소 : [제타위키](https://zetawiki.com/wiki/VirtualBox_%EB%A6%AC%EB%88%85%EC%8A%A4_%EC%9D%B8%ED%84%B0%EB%84%B7_%EC%97%B0%EA%B2%B0)

최종적으로 셋팅된 값은 다음과 같습니다.


```
vi /etc/sysconfig/network
GATEWAY=10.0.2.1
```
게이트웨이 값 추가합니다.


```
[root@localhost ~]# vi /etc/sysconfig/network-scripts/ifcfg-eth0  
DEVICE=eth0
TYPE=Ethernet
ONBOOT=yes
BOOTPROTO=static
IPADDR=10.0.2.101
NETMASK=255.255.255.0
NM_CONTROLLED=no
DEFROUTE="yes"
PEERDNS="yes"
PEERROUTES="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_PEERDNS="yes"
IPV6_PEERROUTES="yes"
IPV6_FAILURE_FATAL="no"
```

BOOTPROTO=static 과 게이트웨이 위치의 문제로 확인되었습니다.

```
[root@localhost ~]# vi /etc/sysconfig/network-scripts/ifcfg-eth1  
DEVICE=eth1
TYPE=Ethernet
ONBOOT=yes
IPADDR=192.168.56.101
```

간략한 정보만 남기고 나머지 정보들은 다 지웁니다.  

```
[root@localhost ~]# vi /etc/resolv.conf
nameserver 8.8.8.8

```

해당값을 설정 후 reboot를 합니다.
