---
layout: post
title: "Web 화면에서 특수한 기호(이하 특수문자) 인식"
date: 2009-09-30 10:12:00 +0900
comments: true
---

특수문자를 HTML TAG로 변환하는 방법
---
```
1. " : &quot;
2. & :  &amp;
3. < : &lt;
4. > : &gt;
5. non-breaking space : &nbsp;
```

문제
---

```
ㄱ. <input type=text name=n value="">">
ㄴ. alert("">");
```

ㄱ, ㄴ 의 예제와 같이 특정 html 출력시에 DB의 데이터를 그대로 사용할 경우 HTML 문서 오류가 발생할 가능성이 있습니다.

이러한 경우 4번과 5번은 HTML 태그를 손상시키지 않으므로 무시해도 됩니다.

그렇다면 문제가 발생하지 않기 위해선

1. DB에 넣기 전에 1,2,3 의 경우 변환한 후 데이터 입력
2. HTML에 그대로 적용

(만약 HTML 에 적용하기 전에 수정하거나 사용되어진다면, DB에는 그대로 넣고
HTML 출력 바로 직전에 변환하는 과정 필요)

결론 :
----
DB에 넣을 때는 신경쓰지 않아도 되지만, 빼올 때 어떻게 처리하는 지에 따라서 고민해보아야 합니다.

HTML 출력시 혹은 디바이스에서 처리할 때 문제가 발생하면,

 ( ", &, <) 와 같은 문자열을 (&quot;, &amp;, &lt;)로 변환시켜주면 됩니다.
```
ㄷ. <input type=text name=n value="&quot;&lt;">
ㄹ. alert("&quot;&lt;");
```
위와 같은 경우에도 실제로는 메시지 창에서 "> 란 값이 출력될 수도 있으므로 고민을 해봐야합니다.
아무때나 변경시키면 곤란하다는 의미입니다.

```java
<!-- 상세 소스-->
 public static String escapeHtmlString(String s)
 {
  String s1 = s;
  if (s1 == null)
   return null;
  if (s1.indexOf(38, 0) != -1)
   s1 = replace(s1, "&", "&amp;");
  if (s1.indexOf(60, 0) != -1)
   s1 = replace(s1, "<", "&lt;");
  if (s1.indexOf(62, 0) != -1)
   s1 = replace(s1, ">", "&gt;");
  if (s1.indexOf(34, 0) != -1)
   s1 = replace(s1, "\"", "&quot;");
  return s1;
 }

```
로 강제로 변환하는 로직을 구현합니다.
