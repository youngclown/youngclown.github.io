---
layout: post
title: "scouter.conf 파일 추가 내용"
comments: true
---


```properties
xlog_lower_bound_time_ms=300
trace_user_mode=0
tomcat_pool_enabled=false
hikari_pool_enabled=true
```


xlog_lower_bound_time_ms : 300 ms 이하는 무시!
trace_user_mode : 0 방문자 유입 수 차단 (쿠키에 SCOUTER 생성 방지)
tomcat_pool_enabled,hikari_pool_enabled : tomcat 설정 보지 않고, 히카리 pool 설정 보기


hook_method_patterns : 지연이 발생하는 경우 T-GAP의 정확한 위치를 찾기 위해 사용합니다!
