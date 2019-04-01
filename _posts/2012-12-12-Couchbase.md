---
layout: post
title: "Couchbase IP address seems to have changed. Unable to listen on 'ns_1"
date: 2012-12-12 11:49:00 +0900
comments: true
---
1. C:\Program Files\Couchbase\Server\bin 경로로 이동합니다.
2. C:\Program Files\Couchbase\Server\bin\service_stop.bat 로 서비스를 멈춥니다.
3. C:\Program Files\Couchbase\Server\bin\service_unregister.bat 로 레지스터를 지웁니다.
4. C:\Program Files\Couchbase\Server\bin\service_register.bat 를 편집기로 엽니다.
5. 앞에 내용 중 NS_NAME=ns_1@%IP_ADDR% 이 부분을 NS_NAME=ns_1@127.0.0.1 등으로 바꿉니다. (아무 아이피바꿔도 크게 문제없습니다.)
6. C:\Program Files\Couchbase\Server\var\lib\couchbase\mnesia 폴더를 지웁니다.
7. C:\Program Files\Couchbase\Server\bin\service_register.bat 로 레지스터를 재등록합니다.
8. C:\Program Files\Couchbase\Server\bin\service_start.bat 로 서비스를 시작합니다.
9. 다시 couchebase 창을 열면 재등록을 해야합니다. 재등록 후에는 저런 경고창이 뜨지 않습니다.

로컬에서 카우치베이스 테스트하다가 에러가 나는 경우에 대한 대응 방법.