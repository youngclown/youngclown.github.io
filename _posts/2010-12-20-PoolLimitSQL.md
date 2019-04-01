---
layout: post
title: "PoolLimitSQLException 관련 조치 사항"
date: 2010-12-28 09:15:00 +0900
comments: true
---

웹로직에서 PoolLimitSQLException 에러 대응 작업
---

"PoolLimitSQLException" 오류가 발생하였고,
이유는 웹로직(Weblogic)설정에 Maxinum capacity 가 15로 설정되어있었기 때문으로 추측됩니다.(기본 설정)

접속 Connection 이 많을때는 117까지 Idle이 증가되면서, 해당 오류가 발생된 것으로 파악되면서, 기본형으로 셋팅되었던 몇군대의 문제점이 발견되었습니다.

```
Home > Summary of Services: JDBC > Summary of JDBC Data Sources > XXX 설정
```

Test Connections On Reserve 를 Check 합니다.
Check 할 경우 120 초 마다 “SELECT 1 FROM DUAL” 을 날려, 성공했을 경우 900초 동안은 검증이 되었다고 판단합니다.

900초는 너무 짧고, 1200 초가 적당하다고 합니다.

또한, 문제가 되었던 Maximum Capacity를 200으로 잡아주었습니다.
그런데 초기 용량이 1 이러다로 증가 수치 또한 1이면 부담이 될 수 있을 거 같습니다.

그 이유는, Monitoring 을 보면, 접속된 connections count 0인데, 가장 높은 count는 52 ~ 117까지 존재하는 걸 확인했고,  
만약 초기용량이 1로 증가수치가 1씩 증가할 경우 connections 요청이 많을 경우 문제가 발생할 수 있을 걸로 추정되었습니다.

처음 용량을 5로 잡고 증가 수치 폭 또한 5씩 잡는 게 좋아 보아 같이 수정했습니다.

PS.
Diagnostics 에서 Profile Connection Leak를 Check 를 해둬야할 거 같습니다.
Monitoring 에서 해당 Leaked Count 를 알 수 있기 때문 있습니다.
이 옵션은 leaked connection이 connection pool에 자동 반환되는 것을 의미하는 것은 아니고, 단순히 로그에 leak정보의 출력을 의미하지만, Monitoring 에는 중요한 정보입니다
