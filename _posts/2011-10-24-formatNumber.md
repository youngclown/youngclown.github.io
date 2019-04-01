---
layout: post
title: "fmt:formatNumber Attributes"
date: 2011-09-07 11:21:00 +0900
comments: true
---

#JSTL 정규 표현식 표현방법

type을 사용하는 방법
-----
```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

number : <fmt:formatNumber value="12345.678" type="number"/><br/>
currency : <fmt:formatNumber value="12345.678" type="currency" currencySymbol="\\"/><br/>
percent : <fmt:formatNumber value="12345.678" type="percent"/><br/>

<c:set var="now" value="<%=new java.util.Date()%>"/>
<c:out value="${now}"/><br/>

date : <fmt:formatDate value="${now}" type="date"/><br/>
time : <fmt:formatDate value="${now}" type="time"/><br/>
both : <fmt:formatDate value="${now}" type="both"/><br/>
```

결과
```
number : 12,345.678
currency : \ 12,345.68
percent : 1,234,568%
Wed May 18 12:49:38 KST 2011
date : 2011. 5. 18
time : 오후 12:49:38
both : 2011. 5. 18 오후 12:49:38
```



pattern을 사용한 방법
-----
```
<c:set var="num" value="234.5678"/>
<c:set var="money" value="9876543"/>

${num}<p>
${money}<p>

<fmt:formatNumber value="${num}" pattern="0.00"/><p>
<fmt:formatNumber value="${num}" pattern="0.0"/><p>
<fmt:formatNumber value="${num}" pattern=".0"/>
<fmt:formatNumber value="${money}" pattern="#,##0"/><p>

<c:set var="now" value="<%=new java.util.Date()%>"/>
<fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm EEE"/><p>
<fmt:formatDate value="${now}" pattern="yyyy-MM-dd hh:mm(a) EEEE"/><p>

```

결과
```
234.5678
9876543
234.57
234.6
234.6
9,876,543
2011-05-18 14:41 수
2011-05-18 02:41(오후) 수요일
```

-----
# 참조 
-----

* [JSTL 가이드](https://blog.naver.com/jgs135/110121197774)
