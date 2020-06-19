---
layout: post
title: "centos 6"
comments: true
---

## 계정 생성, 폴더 변경, 그룹 지정, 비밀번호 설정
- centos 6 기준

```
# root 계정으로 실행
groupadd develop
useradd rpapp -G develop
mkdir -p /home/users/rpapp
usermod -d /home/users/rpapp/ rpapp
cp /root/.bash_profile /home/users/rpapp/
cp /root/.bashrc /home/users/rpapp/
passwd rpapp
```

# NIC 구성 및 default route 설정

```
[root@test01 ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
HWADDR=08:00:27:46:23:0E
TYPE=Ethernet
UUID=d00a91fa-db26-4e50-99a9-77954ce4c161
ONBOOT=yes
BOOTPROTO=static
IPV6INIT=no
NM_CONTROLLED=no
IPADDR=10.0.3.101
NETWORK=10.0.3.0
NETMASK=255.255.255.0
GATEWAY=10.0.3.2
METRIC=0
DNS1=8.8.8.8
```

```
[root@test01 ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth1
DEVICE=eth1
HWADDR=08:00:27:43:14:3A
TYPE=Ethernet
UUID=d00a91fa-db26-4e50-99a9-77954ce4c161
ONBOOT=yes
BOOTPROTO=static
IPV6INIT=no
NM_CONTROLLED=no
IPADDR=192.168.56.101
NETWORK=192.168.56.0
NETMASK=255.255.255.0
GATEWAY=192.168.56.1
METRIC=10
```

```
[root@test01 ~]# route   
Kernel IP routing table  
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
10.0.3.0        *               255.255.255.0   U     0      0        0 eth0
192.168.56.0    *               255.255.255.0   U     0      0        0 eth1
link-local      *               255.255.0.0     U     1002   0        0 eth0
link-local      *               255.255.0.0     U     1003   0        0 eth1
172.17.0.0      *               255.255.0.0     U     0      0        0 docker0
default         10.0.3.2        0.0.0.0         UG    0      0        0 eth0
default         192.168.56.1    0.0.0.0         UG    10     0        0 eth1
```

```
[root@test01 ~]# cat /etc/sysconfig/network  
NETWORKING=yes  
HOSTNAME=test01  
```

```
[root@test01 ~]# ping google.com  
PING google.com (216.58.197.206) 56(84) bytes of data.  
64 bytes from nrt13s48-in-f206.1e100.net (216.58.197.206): icmp_seq=1 ttl=53 time=32.8 ms  
64 bytes from nrt13s48-in-f206.1e100.net (216.58.197.206): icmp_seq=2 ttl=53 time=32.6 ms  

--- google.com ping statistics ---  
2 packets transmitted, 2 received, 0% packet loss, time 1651ms  
rtt min/avg/max/mdev = 32.673/32.758/32.843/0.085 ms  
```


# centos 6 호스트네임 변경

- hostname 영구 변경

CentOS 6  
```
[root@localhost ~]# vi /etc/sysconfig/network   
HOSTNAME=myhost   
```  

CentOS 7    
```
[root@localhost ~]# hostnamectl set-hostname myhost  
```

## virtual-box 설정  

- 각 vm NIC 설정을 'NAT' 가 아니라 'NAT 네트워크' 로 설정합니다.  
- VM 설정 > 네트워크 > 어댑터2 > 다음에 연결됨 > NAT 네트워크    

## route 명령어로 default route 설정을 확인합니다.

```
[root@localhost ~]# route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
10.0.2.0        *               255.255.255.0   U     0      0        0 eth0
192.168.56.0    *               255.255.255.0   U     0      0        0 eth1
link-local      *               255.255.0.0     U     1002   0        0 eth0
link-local      *               255.255.0.0     U     1003   0        0 eth1
172.17.0.0      *               255.255.0.0     U     0      0        0 docker0
default         10.0.2.2        0.0.0.0         UG    0      0        0 eth0
```

## 10.0.2.x eth0 은 NAT 사용하여 호스트 외부와 통신, 192.168.56.x eth1 은 호스트 전용 사용

```
[root@localhost ~]#
[root@localhost ~]# ifconfig -a
docker0   Link encap:Ethernet  HWaddr 96:61:63:82:22:52
          inet addr:172.17.42.1  Bcast:0.0.0.0  Mask:255.255.0.0
          inet6 addr: fe80::14df:dbff:fe8a:8d27/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:9 errors:0 dropped:0 overruns:0 frame:0
          TX packets:6 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:600 (600.0 b)  TX bytes:468 (468.0 b)

eth0      Link encap:Ethernet  HWaddr 08:00:27:3F:44:07
          inet addr:10.0.2.15  Bcast:10.0.2.255  Mask:255.255.255.0
          inet6 addr: fe80::a00:27ff:fe3f:4407/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:12 errors:0 dropped:0 overruns:0 frame:0
          TX packets:20 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:1772 (1.7 KiB)  TX bytes:1862 (1.8 KiB)

eth1      Link encap:Ethernet  HWaddr 08:00:27:AF:A6:00
          inet addr:192.168.56.110  Bcast:192.168.56.255  Mask:255.255.255.0
          inet6 addr: fe80::a00:27ff:feaf:a600/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:108 errors:0 dropped:0 overruns:0 frame:0
          TX packets:128 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:15122 (14.7 KiB)  TX bytes:38296 (37.3 KiB)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b)

vethe9aa064 Link encap:Ethernet  HWaddr 96:61:63:82:22:52
          inet6 addr: fe80::9461:63ff:fe82:2252/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:7 errors:0 dropped:0 overruns:0 frame:0
          TX packets:13 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:558 (558.0 b)  TX bytes:1014 (1014.0 b)
```

## default gw 설정 !!  
> ifcfg-eh0,1 에 GATEWAY 옵션을 지우고  
> /etc/sysconfig/network 에 GATEWAY 를 넣어서 route 의 default gw 를 잡아줍니다.  

```

[root@localhost ~]# cat /etc/sysconfig/network   
NETWORKING=yes  
HOSTNAME=localhost.localdomain  
GATEWAY=10.0.2.2


[root@localhost ~]# cat /etc/sysconfig/network  
network          network-scripts/ networking/  
[root@localhost ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth0  
DEVICE=eth0  
HWADDR=08:00:27:3f:44:07  
TYPE=Ethernet  
UUID=d00a91fa-db26-4e50-99a9-77954ce4c161  
ONBOOT=yes  
NM_CONTROLLED=yes  
BOOTPROTO=dhcp  

[root@localhost ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth1  
DEVICE=eth1  
HWADDR=08:00:27:af:a6:00  
TYPE=Ethernet  
UUID=d00a91fa-db26-4e50-99a9-77954ce4c161  
ONBOOT=yes  
#NM_CONTROLLED=yes  
BOOTPROTO=static  
IPV6INIT=no  
IPADDR=192.168.56.110  
NETMASK=255.255.255.0  
#GATEWAY=192.168.56.1  
#BOOTPROTO=dhcp  
```

# eth0, eth1 등의 nic mac 주소 수정  

```
vi /etc/udev/rules.d/70-persistent-net.rules  
```

# 수정한 mac 주소 적용  

```
vi /etc/sysconfig/network-scripts/ifcfg-eth0  
```

# 재시작  

```
reboot
```

초기 설정은 다음과 같이 해서 완료했습니다.
설정이 잘 적용이 안될 경우 계속 재시작하는 것이 중요합니다.  
