---
layout: post
title: "SQL*Loader 프로그래밍"
date: 2010-06-07 09:43:00 +0900
comments: true
---

엑셀의 많은 데이터를 오라클에 저장하는 방법입니다.
물론 저는 특정 클라이언트가 업로드한 파일을 그대로 DB에 넣기 위해 사용합니다.

내용은 간단합니다.

 

1. 엑셀파일을 다른 이름으로 저장해서 확장자를 csv 로 저장합니다.
(미리 csv 에서 지정된 구분자를 정할 수 있습니다. 'tab' , ',' 등..)
 

2. 오라클에 데이터를 저장할 수 있는 테이블을 데이터 형식에 맞게 만들어줍니다.

 

3. 새로운 메모장으로 SQL*Loader 컨트롤 파일을 작성해줍니다.
```
LOAD DATA
INFILE 'c:\biotest.csv'  // 파일 경로
APPEND                       // 저장 옵션 (기존의 행에 추가, 이외에 REPLACE, INSERT, TRUNCATE 가 있음)
INTO TABLE BIO_TEST   // 데이터를 저장할 테이블명 
FIELDS TERMINATED BY ','  // 데이터간의 구분 문자
("Entrez_GeneID","Gene_symbol","Ka","Ks","Ka/Ks","5'UTR","CDS")    // 테이블 속성명

```

4. 명령어 창에서
    > sqlldr userid/passwd@db_ip control='파일경로' 를 쳐줍니다.


5. 데이터 저장이 완료되면 컨트롤파일명과 동일한 텍스트파일이 생성되어 저장 결과를 확인합니다.

-----
# 참조 
-----

* [SQL*Loader 를 처음 써보다.](https://blog.naver.com/kjhfreedom21/110082610606)

