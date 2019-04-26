---
layout: post
title: "OpenAPI_001"
comments: true
---

한국수출입은행에서, 현재 환율을 실시간으로 제공합니다.  

https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?data=AP01&authkey=xxxxxxx&searchdate=20190314

인증키를 발급받아 요청을 할 경우, 해당 환율이 나오게 됩니다.
테스트 시 나오는 결과값입니다.

```json
[{"result":1,"cur_unit":"AED","ttb":"305.77","tts":"311.94","deal_bas_r":"308.86","bkpr":"308","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"308","kftc_deal_bas_r":"308.86","cur_nm":"아랍에미리트 디르함"},{"result":1,"cur_unit":"AUD","ttb":"794.74","tts":"810.79","deal_bas_r":"802.77","bkpr":"802","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"802","kftc_deal_bas_r":"802.77","cur_nm":"호주 달러"},{"result":1,"cur_unit":"BHD","ttb":"2,979.02","tts":"3,039.21","deal_bas_r":"3,009.12","bkpr":"3,009","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"3,009","kftc_deal_bas_r":"3,009.12","cur_nm":"바레인 디나르"},{"result":1,"cur_unit":"CAD","ttb":"838.57","tts":"855.52","deal_bas_r":"847.05","bkpr":"847","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"847","kftc_deal_bas_r":"847.05","cur_nm":"캐나다 달러"},{"result":1,"cur_unit":"CHF","ttb":"1,112.36","tts":"1,134.83","deal_bas_r":"1,123.6","bkpr":"1,123","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"1,123","kftc_deal_bas_r":"1,123.6","cur_nm":"스위스 프랑"},{"result":1,"cur_unit":"CNH","ttb":"166.78","tts":"170.15","deal_bas_r":"168.47","bkpr":"168","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"168","kftc_deal_bas_r":"168.47","cur_nm":"위안화"},{"result":1,"cur_unit":"DKK","ttb":"169.62","tts":"173.05","deal_bas_r":"171.34","bkpr":"171","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"171","kftc_deal_bas_r":"171.34","cur_nm":"덴마아크 크로네"},{"result":1,"cur_unit":"EUR","ttb":"1,265.45","tts":"1,291.02","deal_bas_r":"1,278.24","bkpr":"1,278","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"1,278","kftc_deal_bas_r":"1,278.24","cur_nm":"유로"},{"result":1,"cur_unit":"GBP","ttb":"1,488.12","tts":"1,518.19","deal_bas_r":"1,503.16","bkpr":"1,503","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"1,503","kftc_deal_bas_r":"1,503.16","cur_nm":"영국 파운드"},{"result":1,"cur_unit":"HKD","ttb":"143.08","tts":"145.97","deal_bas_r":"144.53","bkpr":"144","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"144","kftc_deal_bas_r":"144.53","cur_nm":"홍콩 달러"},{"result":1,"cur_unit":"IDR(100)","ttb":"7.86","tts":"8.01","deal_bas_r":"7.94","bkpr":"7","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"7","kftc_deal_bas_r":"7.94","cur_nm":"인도네시아 루피아"},{"result":1,"cur_unit":"JPY(100)","ttb":"1,009.25","tts":"1,029.64","deal_bas_r":"1,019.45","bkpr":"1,019","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"1,019","kftc_deal_bas_r":"1,019.45","cur_nm":"일본 옌"},{"result":1,"cur_unit":"KRW","ttb":"0","tts":"0","deal_bas_r":"1","bkpr":"1","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"1","kftc_deal_bas_r":"1","cur_nm":"한국 원"},{"result":1,"cur_unit":"KWD","ttb":"3,694.95","tts":"3,769.6","deal_bas_r":"3,732.28","bkpr":"3,732","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"3,732","kftc_deal_bas_r":"3,732.28","cur_nm":"쿠웨이트 디나르"},{"result":1,"cur_unit":"MYR","ttb":"274.64","tts":"280.19","deal_bas_r":"277.42","bkpr":"277","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"277","kftc_deal_bas_r":"277.42","cur_nm":"말레이지아 링기트"},{"result":1,"cur_unit":"NOK","ttb":"129.84","tts":"132.47","deal_bas_r":"131.16","bkpr":"131","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"131","kftc_deal_bas_r":"131.16","cur_nm":"노르웨이 크로네"},{"result":1,"cur_unit":"NZD","ttb":"768.01","tts":"783.52","deal_bas_r":"775.77","bkpr":"775","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"775","kftc_deal_bas_r":"775.77","cur_nm":"뉴질랜드 달러"},{"result":1,"cur_unit":"SAR","ttb":"299.48","tts":"305.53","deal_bas_r":"302.51","bkpr":"302","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"302","kftc_deal_bas_r":"302.51","cur_nm":"사우디 리얄"},{"result":1,"cur_unit":"SEK","ttb":"119.95","tts":"122.38","deal_bas_r":"121.17","bkpr":"121","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"121","kftc_deal_bas_r":"121.17","cur_nm":"스웨덴 크로나"},{"result":1,"cur_unit":"SGD","ttb":"827.49","tts":"844.2","deal_bas_r":"835.85","bkpr":"835","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"835","kftc_deal_bas_r":"835.85","cur_nm":"싱가포르 달러"},{"result":1,"cur_unit":"THB","ttb":"35.46","tts":"36.17","deal_bas_r":"35.82","bkpr":"35","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"35","kftc_deal_bas_r":"35.82","cur_nm":"태국 바트"},{"result":1,"cur_unit":"USD","ttb":"1,123.15","tts":"1,145.84","deal_bas_r":"1,134.5","bkpr":"1,134","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"1,134","kftc_deal_bas_r":"1,134.5","cur_nm":"미국 달러"}]
```

만약 미국 달러가 필요할 경우,

https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?data=AP01&authkey=xxxx&searchdate=20190312&cur_unit=USD

USD를 요청하면됩니다.
정확한 스펙문서는,

https://www.koreaexim.go.kr/site/program/openapi/openApiList?menuid=001003002002001
에 정의되어있습니다.



-----
# 참조
-----

* [Open API 제공목록](https://www.koreaexim.go.kr/site/program/openapi/openApiView?menuid=001003002002001&apino=2&viewtype=C)
