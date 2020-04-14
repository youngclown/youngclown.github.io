---
layout: post
title: "프로세스 재시작"
comments: true
---

```
#!/bin/bash

DATE=`date +%Y%m%d-%H%M`

LOGGING_1=`ps ax | grep java | grep -i xxxx1-0.0.1-SNAPSHOT-real.jar | grep -v grep | awk '{print $1}'`
LOGGING_2=`ps ax | grep java | grep -i xxxx2-0.0.1-SNAPSHOT-real.jar | grep -v grep | awk '{print $1}'`

if [ -z ${LOGGING_1} ]; then
        sh /home/xxxx/xxxx/xxxx1/xxxx1_consumer_start.sh &
        echo "$DATE - xxxx1-0.0.1-SNAPSHOT-real.jar start" >> /root/shell/log/logging_check.log
fi

if [ -z ${LOGGING_2} ]; then
        sh /home/xxxx/xxxx2/xxxx2/xxxx2_consumer_start.sh &
        echo "$DATE - xxxx2-0.0.1-SNAPSHOT-real.jar start" >> /root/shell/log/logging_check.log
fi
```

프로세스에서 해당 프로세스가 없을 시 재시작하도록 하도록 쉘스크립트 생성

ps :
해당 쉘스크립트가 경로를 찾지 못해 cd 로 해당 파일 이동 후 jar파일을 재실행하도록 함.
[프로세스 재시작]:(https://youngclown.github.io/2020/02/batch_shell_1)
에 이동할 하는 쉘스크립트 추가하여, 크론탭에 등록하여 사용하였습니다.
