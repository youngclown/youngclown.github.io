---
layout: post
title: "WINDOWS 10 Bash Shell"
comments: true
---

윈도우즈 10에서 Linux bash shell 사용방법
---

윈도우즈 10에서는 우분투(Ubuntu bash shell) 리눅스  쉘이 사용 가능합니다.  
윈도우에서 리눅스를 사용할 수 있다니 얼마나 행복한 일인가요~ 현재 베타 버전으로 윈도우 10에서 사용이 가능합니다.  
사용방법은 비교적 간단합니다.   

윈도우즈 설정으로 이동
---

업데이트 및 복구 > 개발자 모드 선택  
제어판 > 프로그램 > 윈도우 기능켜기/끄기 > 윈도우리눅스프로그램(리눅스용윈도우 하위시스템) 선택  



Open PowerShell as Administrator and run:
---
PowerShell
```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

윈도우즈의 Microsoft Store에서 다운받아 설치하는 합니다.
[윈도우 우분투](https://aka.ms/wslstore) 이동 후 앱에서 ubuntu를 클릭하여 설치합니다.

루트권한으로 접속하기 위해서는,
만약 루트 권한으로 바꾸려면,

```
sudo -i
```
명령어를 사용하면 가능함. 실제 경로는 윈도우즈 최근 버젼에서는!

```
C:\Users\%USERNAME%\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs\
```
이처럼 경로가 좀 더 복잡하게 바뀌었습니다.
만약 숨겨진 폴더를 찾기 어려우면 탐색기 옵션에서 숨겨진 폴더 보기 옵션을 선택하시기 바랍니다.
찾기가 더 간단하며 이를 즐겨찾기에 포함해두시면 더 좋습니다.


JAVA 설치하기
---
```
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
apt install openjdk-8-jdk-headless
```

openjdk 를 설치합니다.


-----
# 참조
-----

* [Windows 10 Installation Guide](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10)
