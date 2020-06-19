---
layout: post
title: "WSL 2 기능 적용"
comments: true
---


```
Failed to open/create the internal network 'HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adapter' (VERR_INTNET_FLT_IF_NOT_FOUND).
Failed to attach the network LUN (VERR_INTNET_FLT_IF_NOT_FOUND).
```

갑자기, Host-Only Ethernet Adapter 에러가 발생했습니다.  

순간 어제 WSL 2(Windows Subsystem For Linux 2)를 하기 위해,
Windows 10 update 한 게 생각나서, 확인해보니,

Windows update 후(Window 10 1903)에 VirtualBox에서 이미지를 돌릴때 이미지의 네트워크 인터페이스를
호스트 전용 아답터(Host-only) 로 구동시 아래와 같이 VERR_INTNET_FLT_IF_NOT_FOUND 에러 메시지가 나면서
구동이 안되는 문제가 있었습니다.

```
Failed to open/create the internal network 'HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adapter' (VERR_INTNET_FLT_IF_NOT_FOUND).
Failed to attach the network LUN (VERR_INTNET_FLT_IF_NOT_FOUND).
```

우선 기존 네트워크 연결로 가서, VirtualBox Host-Only Ethernet Adapter 를 전부 OFF 처리합니다.

```
제어판\네트워크 및 인터넷\네트워크 연결
```

그 후 기존에 설정했던 셋팅을 다시 합니다.

```
가상 머신 GIT_001의 세션을 열 수 없습니다.

Interface ('VirtualBox Host-Only Ethernet Adapter') is not a Host-Only Adapter interface (VERR_INTERNAL_ERROR).

결과 코드: E_FAIL (0x80004005)
구성 요소: ConsoleWrap
인터페이스: IConsole {872da645-4a9b-1727-bee2-5585105b9eed}

```
이제 다른 에러가 나네요  ^-^
새로 수정한 VirtualBox Host-Only Ethernet Adapter 를 설정하지 않았기 때문입니다!

잘 수정하니 정상적으로 동작하네요.
