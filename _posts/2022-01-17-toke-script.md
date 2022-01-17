---
layout: post
title: "POST MAN 자동 로그인 이력 남기기"
comments: true
---

# 로그인 access_token


Post MAN 항목에 Tests 에 다음과 같은 스크립트를 삽입합니다. 

```
pm.test("로그인 access_token", function () {
    var jsonData = pm.response.json();
    pm.globals.set("auth-token", `${jsonData.token_type} ${jsonData.access_token}`);
    pm.globals.set("auth-token-test", `${jsonData.refresh_token}`);
});
```


auth-token 이란 값에 실제 로그인한 토큰값이 삽입되어,

```
Authorization : {{auth-token}}
```

로 자동 로그인한 헤더값을 사용할 수 있습니다. 