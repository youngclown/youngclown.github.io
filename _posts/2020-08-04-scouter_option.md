---
layout: post
title: "scouter.conf 파일 추가 내용"
comments: true
---

스카우터를 단순 장애 이슈로 확인하는 용도로만 쓰고 있는 경우,

300ms 이하의 응답을 굳이 스카우터 서버로 보낼 필요는 없을 거 같습니다.

제가 관리하는 서비스는,  
150ms 안에 응답을 해야하는 상황이라,   

100ms 안에 응답건을 볼필요없는데, bid request가 모비온가 비슷한 유입이 오기에,  
예전에 xlog_sampling_step을 조절해두었습니다.

```properties
xlog_lower_bound_time_ms=300
```

해당 설정이 좋은 이유는,  
많은 사용자가, scouter client 를 킬 경우,  
데이터를 전송을 받지 못해 끊겨서 보이는 문제가 보여,  
적용하는 것이 좋아 보입니다.  


서버에서 스카우터 서버로 xlog 정보를 보내는 데이터량도 많이 감소하여,

Band Width 를 줄이는데도 도움이 될 것으로 보입니다.


설정도 굳이 서버 재시작할 필요없이,
scouter client에서 변경가능합니다.
수정시 바로 적용됩니다.


```properties
trace_user_mode=0
```


tomcat_pool_enabled=false
hikari_pool_enabled=true





hook_method_patterns : 지연이 발생하는 경우 T-GAP의 정확한 위치를 찾기 위해 사용합니다!
