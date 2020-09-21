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
쿠키에 SCOUTER 가 저장되는 것을 막는 모드입니다.
써드파티 도메인을 사용하는 분들은 쿠키에 SCOUTER를 저장하지 않게 하는 것이 더 좋습니다.  



18:30분 이후 100ms 로 적용한 후, 밴드폭의 감소폭에 대한 이미지입니다. (녹색이 인바운드 파란색이 아웃바운드)

![이미지](/images/20200804.PNG){: width="100%"}

밴드폭(BandWidth)을 줄이는 것은 서비스 안정화에도 도움이 되어, 단순히 로그 분석용이라면 적용할 만한 가치가 있다고 생각합니다.


참고로,

```properties
tomcat_pool_enabled=false
hikari_pool_enabled=true
```

```properties
hook_method_patterns=분석할메소드
```
위의 두가지의 경우는 해당 상황에 맞게 유동적으로 잘 사용하면 됩니다.
