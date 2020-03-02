---
layout: post
title: "프로세스 재시작 version 2"
comments: true
---

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

해당 경로로 이동한 후 쉘스크립트 실행

```sh
#!/bin/sh

nohup java -Xms4g -Xmx4g -XX:+UseG1GC -server -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9994 -Djava.rmi.server.hostname=xx.xx.xx.xx -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -jar xxxxx-logging-0.0.1-SNAPSHOT-real.jar >/dev/null 2>&1
```

스크립트가 백그라운드로 실행됨.
