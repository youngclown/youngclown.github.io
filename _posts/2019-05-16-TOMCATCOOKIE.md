---
layout: post
title: "Cookie Header Size 오류"
comments: true
---

```
5월 15, 2019 10:34:56 오전 org.apache.coyote.http11.AbstractHttp11Processor process
정보: Error parsing HTTP request header
 Note: further occurrences of HTTP header parsing errors will be logged at DEBUG level.
```
서버에 해당 값 오류가 발생하기 시작했습니다.  

헤더 정보를 파싱하다 발생한 오류입니다. 파싱을 실패하는 이유는 여러가지 존재하지만, 현재 시스템이 cookie를 많이 사용하는 기반이기 때문에,
cookie 설정을 확인했습니다.

tomcat 의 server.xml 을 보면,

```xml
<Connector  connectionTimeout="20000"
       port="8080"
       protocol="HTTP/1.1"
       redirectPort="8443"
       maxHttpHeaderSize="8192"
       maxThreads="150"
       minSpareThreads="25"
       enableLookups="false"
       acceptCount="100"
       disableUploadTimeout="true"
       maxPostSize="0"
       URIEncoding="UTF-8"/>
```
에서 확인할 수 있습니다. (local의 connector를 예제로 적었습니다. )
여기서, maxHttpHeaderSize 를 수정하면 되는데,
예전에 해당 값을 늘렸었습니다.  

그래서 원인을 못찾고 있다가,
실제 메시지 요청에서도 400 bad request 가 발생하는 현상을 확인하게 되었습니다.  

```
175.213.173.54 - - [17/May/2019:07:59:47 +0900] "GET /rtb/xxx HTTP/1.1" 400 - "https://googleads.g.doubleclick.netxxx" "Mozilla/5.0 (Linux; Android 9; SM-G965N Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.128 Whale/1.0.0.0 Crosswalk/23.69.590.22 Mobile Safari/537.36 NAVER(inapp; search; 592; 10.3.2)" 0ms "IP_info: 175.213.173.54.58834 , fp: - ,Start_Time: 2018081901"
```

400 bad request 발생 조건 중에 하나가 cookie 의 예정된 길이를 초과했을 경우에 발생하는 것을 확인할 수 있었습니다.
그래서 다시 확인해보니,

http (80) 은 수정이 되어있었는데 https(443) 은 인증키를 바꾸는 과정에서 누군가, 해당 maxHttpHeaderSize 를 지운 것으로 확인되어,
해당값을 늘리면서 해결할 수 있었습니다.

```xml
         <Connector port="443" keystoreFile="keystore_path"                
                keystorePass="password" protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="4000" SSLEnabled="true" scheme="https" secure="true"
               clientAuth="false" connectionTimeout="8000" maxHttpHeaderSize="40960" />
```
maxHttpHeaderSize="40960" 로 설정하여,
문제를 해결했습니다.

-----
# 참조
-----

* [tomcat_maxHttpHeaderSize](https://sejoung.github.io/2017/12/2017-12-13-tomcat_maxHttpHeaderSize/#tomcat-maxHttpHeaderSize)
