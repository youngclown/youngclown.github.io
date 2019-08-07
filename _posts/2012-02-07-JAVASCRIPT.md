---
layout: post
title: "value.replace('x','z') -> value.replaceAll('x','z');"
date: 2012-02-07 12:30:00 +0900
comments: true
---


value.replace("x","z"); : value 안에서 x라는 값을 z로 변경. 처음 z 가 나오는 한 부분만 바뀌므로 replaceAll 명령이 필요합니다.
그러나 자바스크립트에는 replaceAll 이라는 명령어가 존재하지 않으므로 정규식을 사용하여야합니다.
간단하게 "" 와 ''를 //로 바꿔서 사용하고 뒤에 정규식을 붙이면 됩니다.


```
g : 모든 문자에 대하여 적용한다.
i : 대소문자를 가리지 않는다.
\s : 공백을 의미한다.
\ : 특수문자를 사용할때 사용한다. ex) \" , \' , \[ , \/
| : or 조건을 의미한다.
(.*?) : 두 문자열사이의 모든 문자를 의미한다. ex) a(.*?)b : a와b 사이의 모든 문자.
```


value.replace(/x/gi, "z");
해석은 x라는 단어를 대소문자 구분없이 모두 z로 바꾸라는 정규식명령이 되므로,
실질적으로 value.replaceAll('x', 'z'); 라는 명령이 됩니다.

더 자세한 정규식 표현은 http://kio.zc.bz/Lecture/regexp.html 에서 확인하시기 바랍니다.
