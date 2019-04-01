---
layout: post
title: "JVM heap memory 설정 변경 값"
comments: true
---


jmap -heap 9485
---

실제 서버에서 jmap 을 사용하여 heap 메모리 영역을 분석합니다.  

```
ps -ef|grep tomcat
```
로 현재 프로세스를 확인하여 9485 process ID인 것을 확인했습니다.

```

Attaching to process ID 9485, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 25.112-b15

using parallel threads in the new generation.
using thread-local object allocation.
Concurrent Mark-Sweep GC

Heap Configuration:
   MinHeapFreeRatio         = 40
   MaxHeapFreeRatio         = 70
   MaxHeapSize              = 6438256640 (6140.0MB)
   NewSize                  = 1073020928 (1023.3125MB)
   MaxNewSize               = 1073020928 (1023.3125MB)
   OldSize                  = 5365235712 (5116.6875MB)
   NewRatio                 = 5
   SurvivorRatio            = 1024
   MetaspaceSize            = 21807104 (20.796875MB)
   CompressedClassSpaceSize = 1073741824 (1024.0MB)
   MaxMetaspaceSize         = 17592186044415 MB
   G1HeapRegionSize         = 0 (0.0MB)

Heap Usage:
New Generation (Eden + 1 Survivor Space):
   capacity = 1072037888 (1022.375MB)
   used     = 1071054848 (1021.4375MB)
   free     = 983040 (0.9375MB)
   99.90830174838% used
Eden Space:
   capacity = 1071054848 (1021.4375MB)
   used     = 1071054848 (1021.4375MB)
   free     = 0 (0.0MB)
   100.0% used
From Space:
   capacity = 983040 (0.9375MB)
   used     = 0 (0.0MB)
   free     = 983040 (0.9375MB)
   0.0% used
To Space:
   capacity = 983040 (0.9375MB)
   used     = 0 (0.0MB)
   free     = 983040 (0.9375MB)
   0.0% used
concurrent mark-sweep generation:
   capacity = 5365235712 (5116.6875MB)
   used     = 3631971624 (3463.7180557250977MB)
   free     = 1733264088 (1652.9694442749023MB)
   67.69453979210373% used
46179 interned Strings occupying 5111864 bytes.
```

옵션은 예전 [JVM_OPT 제거 관련](https://youngclown.github.io/2018/05/JVM-OPTION)에서 제외하지 않은,   다른 서버를 기반으로 테스트 했습니다.

제가 관리하는 서버와는 다른 서버로,  
실제 옵션은 다음과 같습니다. [JVM_OPT 제거 관련]글과 동일한 옵션입니다.

```
JAVA_OPTS="-verbosegc -server -Xms6144m -Xmx6144m -XX:NewRatio=5  -XX:+UseParNewGC -XX:+CMSParallelRemarkEnabled -XX:+UseConcMarkSweepGC -XX:MaxTenuringThreshold=0 -XX:CMSInitiatingOccupancyFraction=75 -Djava.security.egd=file:/dev/urandom -Dscouter.config=/usr/local/tomcat7/conf/scouter.conf -Duser.timezone=GMT+09:00 -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/usr/local/tomcat7/logs/memory_err.log"
```

NewRatio=5 이므로, 실제 메시지가 5로 분배되며 그로 인해 1/(5+1)로 나누기 때문에,
```
OldSize = 5365235712 (5116.6875MB)
NewSize = 1073020928 (1023.3125MB)
```

전체 힙 사이즈의 크기 지정만큼 New 영역의 크기 지정 또한 중요하며,  
XX:NewRatio 옵션을 이용해 전체 힙 크기 중 New 크기의 비율을 지정하거나 XX:NewSize 옵션을 사용해 원하는 크기만큼의 New 영역 크기를 지정하는 것이 좋다고 하는데,
New 비율이 그다지 높지 않고, 아직까지 해당 서버는 static 서버의 비율이 조금 높습니다.
(예전 서블릿 api 구조로 만들어진 서버.)

현재 우리 서버는 자바 1.8을 사용하고 있습니다.

에 Java8 부터 Permanent 영역에 대한 설정

```
-XX:PermSize=350m / 기동시 Perm사이즈
-XX:MaxPermSize=400m /최대사이즈
```

두 가지가 사라지고

```
-XX:MaxMetaspaceSize=
-XX:MetaspaceSize=
```

가 등장했다고 하는데요.

```
MetaspaceSize = 21807104 (20.796875MB)
```

Perm 영역에 대한 관리 문제(Out of Memory와 GC 성능)로 Perm+Native 영역을 통합해서,  
Metaspace 영역으로 바뀌었다고 하는데, 결과적으로
PermGen 영역이 삭제되어 heap 영역에서 사용할 수 있는 메모리가 늘어났으며,
PermGen 영역을 삭제하기 위해 존재했던 여러 복잡한 코드들이 삭제 되고 PermGen영역을 스캔 하기 위해 소모되었던 시간이 감소되어 GC 성능이 향상 되었다고 합니다.

물론, 대부분의 솔류션이 Spring 프레임웍으로 변경되면서 무분별한 static 사용이 줄어들었기 때문에, OOM 이 발생하는 거는 요근래 보기 힘들어졌지만, 해당 솔류션은 아직도 서블릿 API 이므로...

여튼, JAVA_OPTS을 적용하여, CMG 라든가 ratio 라든가 이런 부분이 적용이 되었습니다.
그리고 SurvivorRatio 나 MetaspaceSize 는 자동으로 적용이 되고요.


확인을 위해 제쪽에 적용된 셋팅(모든 설정은 지우고 default 처리)로 변경해봤습니다.

jmap -heap 3880
---

```
jmap -heap 3880
Attaching to process ID 3880, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 25.112-b15

using thread-local object allocation.
Parallel GC with 13 thread(s)

Heap Configuration:
   MinHeapFreeRatio         = 0
   MaxHeapFreeRatio         = 100
   MaxHeapSize              = 6438256640 (6140.0MB)
   NewSize                  = 2145910784 (2046.5MB)
   MaxNewSize               = 2145910784 (2046.5MB)
   OldSize                  = 4292345856 (4093.5MB)
   NewRatio                 = 2
   SurvivorRatio            = 8
   MetaspaceSize            = 21807104 (20.796875MB)
   CompressedClassSpaceSize = 1073741824 (1024.0MB)
   MaxMetaspaceSize         = 17592186044415 MB
   G1HeapRegionSize         = 0 (0.0MB)

Heap Usage:
PS Young Generation
Eden Space:
   capacity = 2112356352 (2014.5MB)
   used     = 2112356352 (2014.5MB)
   free     = 0 (0.0MB)
   100.0% used
From Space:
   capacity = 16777216 (16.0MB)
   used     = 9126896 (8.704086303710938MB)
   free     = 7650320 (7.2959136962890625MB)
   54.40053939819336% used
To Space:
   capacity = 16777216 (16.0MB)
   used     = 0 (0.0MB)
   free     = 16777216 (16.0MB)
   0.0% used
PS Old Generation
   capacity = 4292345856 (4093.5MB)
   used     = 3228912792 (3079.331199645996MB)
   free     = 1063433064 (1014.1688003540039MB)
   75.22489800039077% used
43424 interned Strings occupying 4727664 bytes.
```
CMG 설정에 의해 강제로 Old Generation 이 75% 넘으면 강제 GC가 발생하도록 되어있었는데요.    
75%가 넘어도 강제 GC를 발생시키지 않습니다.  
Ratio 도 5 의 비율에서 2의 비율로 변경되었고, 그로인해, MaxNewSize 와 NewSize 비율도 자동으로 갱신되었습니다.  

제가 관리하는 솔류션은, static을 거의 줄이고, new 객체로 전환시켜놓은것이 많다보니,  
ratio option 을 안거는게 더 효율이 있었는데,  
해당 솔류션은 사용한것과 사용하지 않은 것의 차이점이 크지 않았습니다.
제쪽은 작업 후 Full GC 와 GMC 가 사라졌는데, GMC가 사라지긴했지만, 그건 옵션을 제거해서 사라진 것이고 Full GC는 여전히 발생했습니다.


결국 큰 실익이 없다하여 예전 셋팅값으로 돌아갔습니다. 솔류션의 개발자들의 무분별한 static 변수들을 제거한 후에야,  
재도전을 해볼 수 있을 거 같습니다.  
