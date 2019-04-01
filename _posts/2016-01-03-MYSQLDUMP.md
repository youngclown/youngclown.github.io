---
layout: post
title: "mysqldump 작업"
date: 2016-01-03 19:07:00 +0900
comments: true
---

mysql dump 처리를 위한 작업

```aidl
FILENAME=`LANG=C date +%Y%m%d_%H%M%S`
mkdir $FILENAME
chmod 755 $FILENAME
#\cp -rf /var/lib/mysql/데이터베이스명 /home/파일경로/$FILENAME/
mysqldump -uroot -p패스워드 데이터베이스명 > 파일명_$FILENAME.sql
```
이런식으로 sh 파일(쉘스크립트)로 만들어서 계속 backup 해서 사용합니다.
