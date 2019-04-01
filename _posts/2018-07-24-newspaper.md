---
layout: post
title: "newspaper/0.2.6"
comments: true
---



```
175.125.19.92 - - [23/Jul/2018:00:45:24 +0900] "GET /servlet/xxxx HTTP/1.1" 200 433 "-" "newspaper/0.2.6" 57ms
```

특정아이피에서 이상한 USER-AGENT 값이 지속적으로 유입되고 있습니다.   
보통의 USER-AGENT 의 경우에는,  


```
"Mozilla/5.0 (Linux; Android 7.1.1; SM-N950N Build/NMF26X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.84 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/159.0.0.38.95;]"
```

이런 형태로 해당 유입패턴을 가지고 웹, 모바일을 구분하거나

모바일에서도,
삼성인지, 아이폰인지 분석하는 용도로 잘 사용합니다.

근데 해당 ua(user-agent)값에 떡하니,
"newspaper/0.2.6"란 값이 들어오며,   
해당 패턴들이 부정유입,   
들어와서는 안되는 예전 데이터들로 파악되어,
추측컨데 크롤링이나 bot 으로 판단이 되었습니다.

실제, 해당 녀석이 무엇인지 검색을 해보기 위해,  
newspaper로 검색해보니 파이썬 크롤링관련 내용이 검색이 되었으며,



해당 github의 [66라인](https://github.com/codelucas/newspaper/blob/master/newspaper/configuration.py)을 보니



```
self.browser_user_agent = 'newspaper/%s' % __version__
```


위와 같이 별도의 설정이 없으면 "newspaper/0.2.6" 라는 ua값이 찍히도록 되어있는 것을 확인했습니다.

해당 IP는 바로 차단을 해야할 것으로 보이며, ua에 대한 체크로직을 추가했습니다.




-----
# 참조
-----

* [Newspaper3k](http://newspaper.readthedocs.io/en/latest/)
