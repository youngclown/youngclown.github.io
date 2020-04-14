---
layout: post
title: "프로세스 재시작 version 2"
comments: true
---

프로세스가 살아있는지 확인하고, 해당 프로세스를 다시 실행시키는 쉘 스크립트 입니다.
해당 스크립트가 있는 곳으로 cd 로 경로로 이동한 후에 쉘스크립트를 실행시킵니다.

```
#!/bin/bash

DATE=`date +%Y%m%d-%H%M`

LOGGING_1=`ps ax | grep java | grep -i xxxx1-0.0.1-SNAPSHOT-real.jar | grep -v grep | awk '{print $1}'`
LOGGING_2=`ps ax | grep java | grep -i xxxx2-0.0.1-SNAPSHOT-real.jar | grep -v grep | awk '{print $1}'`

if [ -z ${LOGGING_1} ]; then
        cd /home/xxxx/xxxx/xxxx1/logging
        sh /home/xxxx/xxxx/xxxx1/xxxx1_consumer_start.sh &
        echo "$DATE - xxxx1-0.0.1-SNAPSHOT-real.jar start" >> /root/shell/log/logging_check.log
fi

if [ -z ${LOGGING_2} ]; then
        cd /home/xxxx/xxxx2/xxxx2/logging
        sh /home/xxxx/xxxx2/xxxx2/xxxx2_consumer_start.sh &
        echo "$DATE - xxxx2-0.0.1-SNAPSHOT-real.jar start" >> /root/shell/log/logging_check.log
fi
```

해당 경로로 이동한 후 쉘스크립트 실행, 이렇게 처리하는 이유가, crontab 에서, 해당 스크립트의 실행할때,
스크립트가 jar파일의 경로를 찾지 못하는 경우가 있는 오류가 있어서 그렇습니다.

```sh
#!/bin/sh

nohup java -Xms4g -Xmx4g -XX:+UseG1GC -server -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9994 -Djava.rmi.server.hostname=xx.xx.xx.xx -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -jar xxxxx-logging-0.0.1-SNAPSHOT-real.jar >/dev/null 2>&1
```

crontab 에 등록하여 동작시키면, 스크립트가 백그라운드로 실행됩니다.

ps : 앞서 작성한 ->  [프로세스 재시작]:(https://youngclown.github.io/2020/02/batch_shell)에서 제대로 된 jar파일이 실행안되는 문제가 발생하여 처리함.
