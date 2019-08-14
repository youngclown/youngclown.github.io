---
layout: post
title: "NetworkInterface.getNetworkInterfaces"
comments: true
---

```
String hostAddr = null;
        try {
            Enumeration<NetworkInterface> nienum = NetworkInterface.getNetworkInterfaces();
            while (nienum.hasMoreElements()) {
                NetworkInterface ni = nienum.nextElement();
                Enumeration<InetAddress> kk= ni.getInetAddresses();
                while (kk.hasMoreElements()) {
                    InetAddress inetAddress = kk.nextElement();
                    if (!inetAddress.isLoopbackAddress() &&
                            !inetAddress.isLinkLocalAddress() &&
                            inetAddress.isSiteLocalAddress()) {
                        hostAddr = inetAddress.getHostAddress();
                        logger.info("hostAddr ########### {}", hostAddr);
                    }
                }
            }
        } catch (SocketException e) {
            logger.error("######### Memory Load #########",e);
        }
```

프로퍼티로 관리하고 있는 서버가 있는데, 특정 서버에서만 별도의 동작을 수행하기 위하여, IP를 체크한 후 해당 아이피에 따른 SERVER_TYPE 을 정의하여,
IP별로 서비스 구분을 하거나,
하나의 IP서버에만 특정 기능이 동작하도록 구현하였습니다.

문제는 이렇게 할 경우, 서버가 증설하여 그룹해야할 IP가 추가될 때마다 일일이 추가해야하는 문제가 있습니다.
