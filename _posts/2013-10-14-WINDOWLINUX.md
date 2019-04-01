---
layout: post
title: "Java 에서 현재 리눅스인지 윈도우 환경인지 아는 법"
date: 2013-10-14 12:35:00 +0900
comments: true
---

관련 주소 : http://stackoverflow.com/questions/2357758/what-does-system-getpropertyos-name-return-in-latest-windows-oss

```
String osName = System.getProperty("os.name");
    if (osName.equals("Windows NT") || osName.equals("Windows 2000") || osName.equals("Windows XP")) {
        cmd = new String[3];
        cmd[0] = WINDOWS_NT_2000_COMMAND_1;
        cmd[1] = WINDOWS_NT_2000_COMMAND_2;
        cmd[2] = command;
    } else if (osName.equals("Windows 95") || osName.equals("Windows 98") || osName.equalsIgnoreCase("Windows ME")) {
        cmd = new String[3];
        cmd[0] = WINDOWS_9X_ME_COMMAND_1;
        cmd[1] = WINDOWS_9X_ME_COMMAND_2;
        cmd[2] = command;

```

조건절을 주어

```aidl
String shellmkdir = "mkdir -p" + " " + dest;
String shellcp = "cp -rf" + " " + target + " " + dest;
String[] commanddir = { "cmd", "/c", shellmkdir };
String[] commandcp = { "cmd", "/c", shellcp };
```
와
```aidl
String shellmkdir = "mkdir -p" + " " + dest;
String shellcp = "cp -rf" + " " + target + " " + dest;
String[] commanddir = { "/bin/sh", "-c", shellmkdir };
String[] commandcp = { "/bin/sh", "-c", shellcp };
```
로 분기합니다.