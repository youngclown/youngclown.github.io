---
layout: post
title: "PINPOINT quickstart 설치시 유의했던 점"
date: 2018-06-04 20:00:00 +0900
comments: true
---

외부 인터넷이 막혀있는 환경
---
해당 서버에는 내부 IP는 허용하나 외부 IP를 차단한 경우로,  
quickstart의 s
tart-collector,  
start-web,  
start-testapp 스크립트 모두 mvnw를 통해 실행되도록 되어 있어,  
mvn 실행하도록 수정해서 처리해합니다.

start-collector.sh 예)
```
pid=`nohup ${bin}/../../mvnw -f $COLLECTOR_DIR/pom.xml clean package tomcat7:run -D$IDENTIFIER -Dmaven.pinpoint.version=$version > $LOGS_DIR/$LOG_FILE 2>&1 & echo $!`
->
pid=`nohup mvn -f $COLLECTOR_DIR/pom.xml clean package tomcat7:run -D$IDENTIFIER -Dmaven.pinpoint.version=$version > $LOGS_DIR/$LOG_FILE 2>&1 & echo $!`
```

log4j LOG 수정
---
quickstart 시 생성되는 모든 log4j.xml 은 debug 옵션으로 보여지게 되어있습니다.  
그걸 그대로 agent 및 서버에서 동작시키면, 1분에 8기가의 데이터가 쌓이는 아주 놀라운 경험을 할수 있었습니다.  
해당 옵션을 자신의 상황에 맞게 수정하시면 됩니다.  
저는 단순한 지연현상을 찾기 위해서, DEBUG > ERROR, INFO > ERROR 로 변경하였습니다.  
```aidl
./agent/lib/log4j.xml
./web/src/main/resources/log4j.xml
```
형태의 모든 xml 을 수정 했습니다.  
혹시 몰라 logs 폴더 또한 /data/ 폴더로 심볼릭 링크를 걸었습니다.  
```aidl
./quickstart/hbase/hbase/logs
./quickstart/logs
```

추가적으로 필요하면 hbase 에 대한 data 용량도 확인하는 것이 좋을 거 같습니다.

```aidl
./quickstart/data
```
테스트 시 특정 서버의 경우 하루에 5G까지 쌓이는 경우를 봐서, 초기화 관련된 부분도 고민해봐야할 거 같습니다.  
우선은 scouter를 대체하는 용도는 아니었기 때문에, 여기까지만 정의했습니다.  

jdk 버젼 추가
---

하단에 JAVA_6_HOME 및 추가된 jdk 경로 설정합니다.  
jdk 가 없을 시 download 하거나 yum install 로 설치합니다.
수정 후 꼭 ssh 재접속해야합니다.  
실제로 가이드 문서에는 jdk 9 (JAVA_9_HOME) 을 넣으라는 글이 없었는데, 해당 버젼이 없으면, 에러가 납니다.  

```aidl
vi /etc/profile

export JAVA_6_HOME=/usr/lib/jvm/java-1.6.0
export JAVA_7_HOME=/usr/lib/jvm/java-1.7.0
export JAVA_8_HOME=/usr/lib/jvm/java-1.8.0
export JAVA_9_HOME=/usr/lib/jvm/java-1.9.0
```
