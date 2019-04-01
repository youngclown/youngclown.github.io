---
layout: post
title: "IMP-00013: DBA만이 다른 DBA가 엑스포트한 파일을 임포트할 수 있습니다"
date: 2012-05-14 11:28:00 +0900
comments: true
---
 
```aidl
Import: Release 11.1.0.6.0 - Production on 월 5월 14 11:21:47 2012
Copyright (c) 1982, 2007, Oracle.  All rights reserved. 

다음에 접속됨: Oracle Database 11g Enterprise Edition Release 11.1.0.6.0 - Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options
```


엑스포트 파일은 규정 경로를 거쳐 EXPORT:V10.02.01 에 의해 생성되었습니다
```aidl
IMP-00013: DBA만이 다른 DBA가 엑스포트한 파일을 임포트할 수 있습니다
IMP-00000: 임포트가 실패로 끝났습니다
```

Export 시에 시스템권한까지 포함하여 익스포트를 한 경우 임포트 대상도 시스템권한이 부여되어야합니다.

보통은 Grant connect, resource to DB_ID 로 권한을 부여해주는데 DBA권한을 추가해주기 위해서 한가지 조건을 더 붙입니다.
```aidl
GRANT CONNECT, RESOURCE, DBA TO DB_ID
```

이렇게 할 경우 정상적으로 임포트가 가능합니다.
익스포트할때 시스템권한으로 익스포트하지 않는게 가장 중요하겠지만요.

 