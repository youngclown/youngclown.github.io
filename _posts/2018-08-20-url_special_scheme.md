---
layout: post
title: "url special scheme"
comments: true
---

http://,ftp://,market://과 같은 문자열을 url scheme이라 부릅니다.

[url special scheme](https://sejoung.github.io/2018/08/url_special_scheme) 에서 처리된 내용을 첨부합니다.

위키피디아에 대한 내용입니다.
```aidl
//americanbilliardclub.com/about/history/
http://americanbilliardclub.com/about/history/
```
두개의 링크가 존재했을 때,
위키피디아의 화면은 https 입니다.
클릭시, americanbilliardclub.com 의 도메인을 가진 홈페이지는 https 를 대응하지 않는 사이트로,
강제로 http를 넣으면 잘되지만,
// 만 넣고 스키마를 넣지 않은 도메인에서는 위키피디아의 https 를 그대로 사용하기 때문에,

```aidl
이 페이지를 표시할 수 없습니다.
```
라는 메시지가 뜨게 됩니다.
// 만 사용할 경우, Protocol-Relative URL로 현재 쓰고있는 프로토콜을 명시합니다. 
현재 접속한 페이지는 https 이니 https://와 동일해집니다.
만약 접속한 페이지가 http 면 자동으로 http로 변환해줍니다.

여지까지 개발시, 동적 https 와 http를 판단하기 위해서는,

```aidl
    var url = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//xxx";
```
document.location.protocol 을 사용하여 판단하거나 java 단에서는 헤더정보를 이용하여 판단했습니다.
광고솔류션의 경우,
어떤 매체, 어떤 광고주에 우리 스크립트가 삽입되는지, 개발자가 일일이 신경쓰지 못할 경우,
사용자에 따라 http, https 가 다양하게 들어올 경우에 대한 대응 책으로,

```aidl
<script src="//code.jquery.com/jquery-2.2.3.min.js"></script>
```
가 우선적으로 처리되고 있지만, 해당 기술은 2010년도에 나온 little trick 입니다.  
이미 2014년도에 사용하지 않게 지양되고 있는 기술입니다.  

URL 표준에는 없지만 Uniform Resource Identifier (URI) 표준인 [rfc3986#section-4.2](https://tools.ietf.org/html/rfc3986#section-4.2)에서 명시하고 있습니다.

남용하지 말아야한다는 이야기입니다.  
http 일지 https 일지 모르는 브라우져에서,   
무언가를 해야한다면,  
그냥 https 를 사용하는 게 좋다고 결론이 나오는 거 같다는 결론이 나옵니다.  

다만, 왜 광고솔류션 특징상 본인의 홈페이지에 iframe이나 script나 image가 삽입되는 것이 아니므로,
정확하게 보안이슈가 아닌 어찌해서 안되는 지에 대한 부분을 조금 더 찾아봐야할 거 같습니다.
좀더 좋지 않았을 까 싶은데, 해당 내용을 찾기가 어렵네요.

```aidl
https://url.spec.whatwg.org/#special-scheme
```
어디에도 '//'를 사용해도 좋다라는 글은 없으며, 테스트할 때,
크롬에서 about:// 이 스키마로 붙는 경우가 생겨, 해당 문제에 대해 고찰했습니다.

사용가능한 경우는
a, link element, href attribute 정도로 국한해서 처리되었으면 합니다.


```aidl
<iframe src="about:blank" width="300" height="120" ></iframe>
```

예를 들어, iframe 의 src는 about:blank 로 되어있으며,
해당 iframe 안에서 팝업이 뜬 상태에서 부모창을 제어할 때, about://도메인 으로 호출하는 구조가 되게 되므로,
이 경우에는 "//도메인"형태를 사용해서는 안됩니다.

-----
# 참조
-----

* [Wikipedia:Protocol-relative URL](https://en.wikipedia.org/wiki/Wikipedia:Protocol-relative_URL)

* [Stop Using the Protocol-relative URL](https://www.jeremywagner.me/blog/stop-using-the-protocol-relative-url/)

* [The Protocol-relative URL](https://www.paulirish.com/2010/the-protocol-relative-url/)

* [about scheme](https://en.wikipedia.org/wiki/About_URI_scheme)

* [Login Register path-abempty in URI](http://w3-org.9356.n7.nabble.com/path-abempty-in-URI-td170118.html)

* [SENSE ARIGATO](https://sejoung.github.io/2018/08/url_special_scheme)