---
layout: post
title: "Client IP 문제(X-Forwarded-For) 해결 방안"
date: 2010-12-06 09:15:00 +0900
comments: true
---

L4 에서 IP를 바꿔버리는 문제가 발생했습니다.  
스위치를 예전 모델로 교체한다고 하여도 해당문제는 앞 단에 위치하게 되는 Firewall 장비에서 IP Remapping 할 가능성이 존재한다는 답변을 들었습니다.  
L4 에서는 IP 를 Remapping 하면서 Client IP 를 아예 없애버리는 게 아니고 X-Forwarded-For 라는 헤더에 남겨 놓는다고 하여 해당 값을 가져다 쓰라고 하였습니다.
(대부분의 Proxy에서 이런 방법으로 IP를 기록한다고 합니다.)

기본적으로는 X-Forwarded-For 정보를 헤더에서 추출하고 그 값이 비어있을 경우 Remote-Addr 헤더로 문제없이 사용이 가능합니다.


참고로 해당 값은 LP VIP 을 통해 들어갈 때만 생기며, 클라이언트에서 보내주는 헤더값이 아니라 L4 VIP 를 통해 들어갈때 L4에서 헤더에 넣어주는 헤더값을 의미합니다.

자바내의 처리로직 :
```
    HttpServletRequest request

    String ip = request.getHeader("HTTP_X_FORWARDED_FOR");

    if(ip == null || ip.length() == 0 || ip.toLowerCase().equals("unknown"))
        ip = request.getHeader("REMOTE_ADDR");

    if(ip == null || ip.length() == 0 || ip.toLowerCase().equals("unknown"))
        ip = request.getRemoteAddr();
```

아래는 해외 문서를 참고한 내용입니다.


Getting The Real IP Of Your Users
---

```
There are a lot of sites around the internet that try and get your IP address. Most of their reasons are legitimate. For example Google Adsense will log your IP to see where the user clicking the advert is from (and kick you off if its the same IP you logged into that account with).

However, there are some sites that try to look at your IP for various reasons but do it wrong. Rapidshare is a beatifully painful example of this. If you’re on an ISP that uses a transparent proxy, RapidShare will log the proxy address instead of the actual account IP. As they limit the downloading on a per-IP basis, that means everyone using that ISP, going through that proxy, has the same IP to Rapidshare, meaning the limit to how much you download is split among those users.

What I’m saying here is, if you’re going to do your own IP lookups for whatever reason, do them correctly. My initial code here was in VB.net but since I have translated what its doing to the most popular server-side languages. As its based on the server variables, rather than the code’s process, its quite easy to port to something else if you need to.

The lookup that these “incorrect” sites are doing is something like this:

Request.ServerVariables("REMOTE_ADDR")
What then need to be doing is comparing the HTTP_X_FORWARDED_FOR variable against it, to check that there isn’t a non-transparent proxy in the way. Like so:

' Look for a proxy address firstDim _ip As String = Request.ServerVariables("HTTP_X_FORWARDED_FOR")' If there is no proxy, get the standard remote addressIf (_ip = "" Or _ip.ToLower = "unknown") Then _ _ip = Request.ServerVariables("REMOTE_ADDR")
This doesnt help people that are limited to (or otherwise) on anonymous proxies. They will hide the forwarding address (like they’re supposed to) and therefore the lookup will ONLY get the proxy’s address. Some ISPs do this by default to “protect” their users… Its just retarded. If you ISP does this, and you’ve been wondering why RS or other sites don’t work… Now you know.

If you want to check against an existing “wrong site”, try IP Chicken. It will return an incorrect value (eg the proxy). WhatsMyIP.orgis one that will look through the proxy and should give you the correct IP.

Here are some more examples in other languages:
```
C#
---
```
// Look for a proxy address firstString
_ip = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
// If there is no proxy, get the standard remote address
If (_ip == "" || _ip.ToLower == "unknown")
_ip = Request.ServerVariables["REMOTE_ADDR"];
```
C#
---
```
// Look for a proxy address firstString
_ip = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
// If there is no proxy, get the standard remote address
If (_ip == "" || _ip.ToLower == "unknown")
_ip = Request.ServerVariables["REMOTE_ADDR"];
```
PHP
---
Based on code from OxyScripts.

```
function GetUserIP() {
if (isset($_SERVER)) {
if (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
return $_SERVER["HTTP_X_FORWARDED_FOR"];
if (isset($_SERVER["HTTP_CLIENT_IP"]))
return $_SERVER["HTTP_CLIENT_IP"];
return $_SERVER["REMOTE_ADDR"]; }
if (getenv('HTTP_X_FORWARDED_FOR'))
return getenv('HTTP_X_FORWARDED_FOR');
if (getenv('HTTP_CLIENT_IP'))
return getenv('HTTP_CLIENT_IP');
return getenv('REMOTE_ADDR');}
```
Java and JSP
---
```
String ipaddress = request.getHeader("HTTP_X_FORWARDED_FOR");
if (ipaddress == null)
ipaddress = request.getRemoteAddr();
```
ASP/VBScript
---
```
ipaddress = Request.ServerVariables("HTTP_X_FORWARDED_FOR")
if ipaddress = ""
then
ipaddress = Request.ServerVariables("REMOTE_ADDR"
)end if
```

ColdFusion
---
```
<CFCOMPONENT>
<CFIF #CGI.HTTP_X_Forwarded_For# EQ "">
<CFSET ipaddress="#CGI.Remote_Addr#">
<CFELSE>
<CFSET ipaddress="#CGI.HTTP_X_Forwarded_For#">
</CFIF>
</CFCOMPONENT>
```
Perl
---
```
$ip = $req->header('Client-IP') || $req->header('Remote-Addr');
if ($req->header('X-Forwarded-For'))
{ $proxy = $ip; $ip = $req->header('X-Forwarded-For');}
```

If you know anymore, just ping them in my general direction and they can be added.

C# 계열은 정상 동작했는데,
우리쪽에서는 헤더정보를 읽어오지 못했습니다.
이유는 웹로직에서 포워딩할때 변경하는게 아닌가 추측됩니다.
모든 헤더 정보를 찍어보니 해당 헤더이름은
"X-Forwarded-For"(HTTP-X-FOWARDED-FOR) 로 변환해서 들어오는 것을 확인했습니다.

 그것은 IIS 설정에서 X-Forwarded-For 를 IP로 잡는 겁니다.
 인터넷에서 F5XForwardedFor 로 검색하면 상세한 정보를 알 수 있습니다.

 -----
 # 참조
 -----

 * [윈도우즈 X-Forwarded-For 아이피 변환](http://blog.chonnom.com/10100163904)
