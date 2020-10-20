---
layout: post
title: "JVM_OPT 제거 관련"
date: 2018-05-10 18:39:00 +0900
comments: true
---


현재 서버에 설정되어있는 jvm 옵션.

```
JAVA_OPTS="-verbosegc -server -Xms6144m -Xmx6144m -XX:NewRatio=5  -XX:+UseParNewGC -XX:+CMSParallelRemarkEnabled -XX:+UseConcMarkSweepGC -XX:MaxTenuringThreshold=0 -XX:CMSInitiatingOccupancyFraction=75 -Djava.security.egd=file:/dev/urandom -Dscouter.config=/usr/local/tomcat7/conf/scouter.conf -Duser.timezone=GMT+09:00 -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/usr/local/tomcat7/logs/memory_err.log"
```

시작시 최소, 최대 메모리를 설정한 6144m 을 제외한 나머지 추가 옵션은

```
-XX:NewRatio=5  -XX:+UseParNewGC -XX:+CMSParallelRemarkEnabled -XX:+UseConcMarkSweepGC -XX:MaxTenuringThreshold=0 -XX:CMSInitiatingOccupancyFraction=75
```

총 6개 의 추가 옵션이 존재합니다.
위의 옵션은 Elasticsearch 설치시 적용된든 기본옵션이기도 합니다.



1번. -XX:NewRatio=5
---
해당 옵션은 추후 설명할 3번 항목때문에 설정된 것으로 보입니다.
제가 관리하는 프로젝트는 싱글 Thread 처리로 인해 부분 lock 이 발생함에 따라,
대부분의 DAO 커넥션을 위한 Dao 객체를 new 객체로 변환하였기 때문에,

newRatio 옵션을 default 로 처리하는 방안에 대해 고민하였습니다.
실제 NewRatio=5가 되면 new 영역은 전체 메모리의 1/6 밖에 되지 못함으로, 해당 기능에 대한 지연현상이 있을 수 있어, 해당 기능을 제거하는 것이 유리해보였습니다.


2번. -XX:+UseParNewGC
---
Eden Space 를 multi thread 로 정리하는데 사용합니다.
Eden Space의 경우 새롭게 생성된 객체들을 의미하는데, 해당 객체들을 multi thread로 GC 처리한다는것을 의미합니다.
사용할 thread 수는 -XX:ParallelGCThreads 로 결정하는데 해당 옵션은 들어가있지 않으므로, 기본값인 CPU core 수로 처리됩니다.


- 장점
 - Scavenge GC(default Copying Collector) 처리 속도를 비약적으로 상승
- 단점
 - thread 수를 과하게 늘릴 경우 thread contention(경합) 에 의해 성능 저하가 발생

특히 서버당 여러 인스턴스를 띄워야하는 경우에 전체 VM에 대해 ParallelGCThreads 의 총합이 CPU core 수를 넘기지 않도록 별도 옵션처리로 총합에 대한 관리가 필요합니다.
현재는 각 서버마다 단일 인스턴스를 띄우기 때문에, 그대로 유지하는 것을 고민해봤으나, 추후 여러 인스턴스를 띄울 때 4개 이상의 JVM 을 사용될때 총합에 대한 별도 관리가 필요하여 삭제하는 것이 유리해보였습니다.


3번. -XX:+UseConcMarkSweepGC
---

객체가 일정 횟수 이상 Scavenge GC 에 살아남으면, To Space 에서 Old Generation 으로 승격됩니다.
이때 일정 횟수는 -XX:MaxTenuringThreshold 로 설정 가능한데, 해당 옵션을 0으로 주었기 때문에, eden의 모든 객체가 한번의 gc 주기에 생존하면 바로 old generation 으로 옮겨지게 됩니다.
그 때, Old Generation 을 위한 병렬 collercor를 -XX:+UseConcMarkSweepGC (이하 CMS)로 활성화가 가능합니다.

GC 과정을 4개의 phase 로 진행되며,
```
initial marking > concurrent marking > second remarking > concurrent sweeping
```
순으로 진행되게 됩니다.

- 장점
 - Full GC 및 Out Of Memory Error 를 피하는 데 좋습니다.
- 단점
 - CPU 비용이 비싸다고 합니다.

concurrent marking phase 에서 하나 이상의 CPU core 가 할애되어야 하며, concurrent sweeping phase 에서 하나의 CPU core 가 할애되어야 한다고 합니다.
참고로, CMS 는 initial mark 와 remark phase 에서 stop-the-world pause 발생하기 때문에, -XX:+CMSParallelRemarkEnabled (remark 시 일시중단을 하지 않도록 함.) 와 같이 사용하길 권장하기에 해당 기능이 추가로 설정된 것으로 보입니다.

해당 CMS 는 4 CPU core 보다 더 많은 core 가 꽂힌 대형 시스템에서 OOME 를 주기적으로 경험하는 경우에만 사용하는 것이 좋다고 하며,
CMS 알고리즘이 효율적으로 동작하기 위해 -Xmn 은 전체 heap 의 1/4 로 설정하는 것이 좋다고 합니다. (이로인해 1번항목의 NewRatio=5 설정을 한 걸로 추정)
CMS 를 켜면 -XX:+UseParNewGC 가 같이 켜지므로, ParallelGCThreads 를 별도로 관리해 주어야 합니다. (현재 옵션에 없으므로 해당 서버의 cpu갯수)


4번. -XX:CMSInitiatingOccupancyFraction=75
---

3번 항목에서 CMS를 설정하였을 경우에 보조하기 위해 처리한 것으로 보입니다.  
Full GC가 빈번하게 발생하던 예전 플랫폼 환경에서, CMS로 Full GC를 제어하려고 한 것으로 보이고,  
Old 영역이 너무 꽉 찾을때 CMS가 실행되면서, CMS 중에 CMS가 중단되고 Full GC등이 발생하는 경우를 제어하기 위해 적용한걸로 추정됩니다.





결론
---

이 1,2,3,4번 항목 전부 전부 CMS 로 Full GC나 OOME를 제어하기 위해 만들어진 것으로 파악되었습니다.
서버 증설 및 서버 확장으로 인해 현재 Full GC 가 거의 없는 상황에선 필요하지 않은 옵션으로 보였기 때문에, 서버 1대에 해당 옵션을 제거한 후 테스트 하였으며,
성능이슈는 발생하지 않았습니다.

감사합니다.

적용한 서버와 적용하지 않은 서버와의 차이는 GC 발생율이 1/2로 줄은 것으로 최종 확인이 완료하여 전체 적용이 완료되었습니다.

![이미지](/images/20180510jvmoption_01.png){: width="100%"}
