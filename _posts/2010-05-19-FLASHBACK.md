---
layout: post
title: "FLASHBACK TABLE"
date: 2010-05-19 11:42:00 +0900
comments: true
---

FLASHBACK TABLE 테이블명 TO BEFORE DROP;

DROP 해서 날려버린 테이블을 복구하려고 할때 사용됩니다.

```$xslt
1. 쓰레기통 비워져있으면,
 -> 그날로 짐싸야합니다.

2. 10G 이하면,
 -> 10G 이상부터  휴지통이 있으므로, 그냥 짐싸야합니다.

3. 동일 Table 이 있으면,
 -> 복구가 안됩니다. 짐쌉시다.
```

아차 3번일 경우에는 짐싸기 전에 확인합시다.

새로운 이름으로 변경하여 복구 후 rename 을 해줍시다.

FLASHBACK TABLE 테이블명 TO BEFORE DROP RENAME TO 변경 테이블 명;

원래 테이블명과 동일한 테이블이 존재할 경우에 제약조건만 없다면,

```$xslt
INSERT INTO DEPT SELECT * FROM "BIN$W7Q+R0EGy9rgQAB/AQA02Q==$0";
```
위와같은 명령어로 복구가 가능합니다.


-----
# 참조 
-----

* [FLASHBACK TABLE ](http://blog.naver.com/woosa7?Redirect=Log&logNo=20059355223)

