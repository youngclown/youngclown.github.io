---
layout: post
title: "IP 대역폭 필터 기능"
comments: true
---

2012년, IP를 수치로 변환, 수치를 IP로 변환하는 법에 대해 블로그를 한 경험이 있습니다.  
특정 아이피가 왔을 때 해당 대역이 어떤 지역에 속한지 분석하여 필터링 하는 로직이었습니다.
ip 대역폭을 계산해야하기 때문에 long 형으로 변환하여,

```java
public Long ipToInt(String ipAddr) {
		String[] ipAddrArray = ipAddr.split("\\.");

		long num = 0;
		for (int i=0;i<ipAddrArray.length;i++) {
			int power = 3-i;
			/*
			 * i의 값으 범위는 0~255 사이이며, 그 값을 256으로 나눈 나머지 값에
			 * 256을 power의 값인
			 * 1~9 사이는 2,
			 * 10~99 사이는 1,
			 * 100 이상은 0 의 값에 누승하여 num 값에 더함
			 */
			num += ((Integer.parseInt(ipAddrArray[i])%256 * Math.pow(256,power)));
		}
		return num;
	}
```

해당 대역폭에 속한 IP인지를 판단하는 로직이었습니다.  
추후, 해당 로직이 조금더 간편하게 변경되었던 걸로 기억하는데,

```java
/**
 * Returns the long version of an IP address given an InetAddress object.
 *
 * @param address the InetAddress.
 * @return the long form of the IP address.
 */
private static long bytesToLong(byte [] address) {
    long ipnum = 0;
    for (int i = 0; i < 4; ++i) {
        long y = address[i];
        if (y < 0) {
            y+= 256;
        }
        ipnum += y << ((3-i)*8);
    }
    return ipnum;
}
```
회사에서는 InetAddress 클래스를 별도로 구성하여, 이런 형태로 변경되었던 것으로 기억합니다.

[참고주소](https://okky.kr/article/100970)로 보면, 조금더 디테일한 소스를 볼 수 있습니다.

```java
public static final long[] IP_RANGE = { 16777216L, 65536L, 256L };
/**
* long형태의 아이피 정보를 "."(127.0.0.1과 같은)으로 구분된 아이피 정보로 변환하여
* 반환한다.
* @param address
* @return
*/
public static String longToIp(long address) {
String ip = "";
for (int i = 0; i < 4; i++) {
if (i < 3) {
ip += (address / IP_RANGE[i]) % 256 + ".";
} else {
ip += address % 256;
}
}
return ip;
}
/**
* 특정 IP를 "."을 기준으로 파싱한 String[]으로 받아 long IP로 반환한다.
* @param address
* @return
*/
public static long ipToLong(String[] address) {
if (address == null || address.length < 4) {
return 0L;
}
long ip = 0L;
for (int i = 0; i < 4; i++) {
if (HoverStringUtils.isDigit(address[i])) {
if (i < 3) {
ip += IP_RANGE[i] * HoverStringUtils.toDigit(address[i]);
} else {
ip += HoverStringUtils.toDigit(address[i]);
}
} else {
return 0L;
}
}
return ip;
}
/**
* 특정 아이피(IP)를 long으로 변환하여 반환한다.
* @param ip
* @return
*/
public static long ipToLong(String ip) {
return ipToLong(getBytesByInetAddress(ip));
}
/**
* 특정 아이피의 값을 byte[]받아 long으로 반환한다.
* @param address
* @return
*/
public static long ipToLong(byte[] address) {
if (address == null || address.length < 4) {
return 0L;
}
long ip = 0L;
for (int i = 0; i < 4; ++i) {
long y = address[i];
if (y < 0) {
y += 256;
}
ip += y << ((3 - i) * 8);
}
return ip;
}
/**
* 특정 아이피를 byte[]로 변환하여 반환한다.
* @param ip
* @return
*/
public static byte[] getBytesByInetAddress(String ip) {
InetAddress addr = null;
try {
addr = InetAddress.getByName(ip);
} catch (UnknownHostException e) {
return new byte[0];
}
return addr.getAddress();
}

```

급한 기능을 추가할 때, 옛날에 사용했던 내용들을 정리해두면, 역시 편하다는 것을 다시한번 느꼈습니다.
