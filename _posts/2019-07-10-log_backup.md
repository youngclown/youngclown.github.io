---
layout: post
title: "Log 압축 및 관리하기"
comments: true
---


```sh
#!/bin/bash
cd /home/logs/
case $? in
0)
        [ ! -d backup ] && mkdir backup
        find * -mtime +0 | xargs -t -i mv {} backup/{}.bak
        cd backup
        find *.bak | xargs -t -i tar cfz {}.tar {}
        rm -rf *.bak
        find * -mtime +60 | xargs -t -i rm -rf {}
;;
*)
    echo 'directory not found.'
;;
esac

```

log 자체가 하루에 21G 씩 쌓이다보니, 그대로 유지하기는 무리가 있습니다.  
그렇기 때문에,
시간이 지난 파일은 압축을 하여, backup 폴더로 옮기는 작업을 진행하는 것이 좋습니다.  
backup 폴더에 쌓이 파일을 30일을 기다렸다가, 지웁니다.  

단순 로그성 파일이므로, 해당 파일을 압축하게 되면 100~200M 까지 줄어들게 되어, 서버 관리에 매우 유용합니다.  

find * -mtime +0
오늘보다 과거를 의미합니다.

```
find -mtime -3      3일(72시간)보다 새로움
find -mtime 3       4일(96시간) 전에서 3일(72시간)전까지
find -mtime +3     4일(96시간)전보다 과거
```

find * -mtime +0 | xargs -t -i mv {} backup/{}.bak
오늘이 아닌 파일(어제 파일) bak 라는 파일명을 붙여서 backup 폴더로 이동시켜라라는 의미가 됩니다.

그리고 backup 폴더로 이동하여,
bak 라는 파일명을 가진 파일을 tar 로 압축합니다. (용량 줄이기..)
압축한 후 bak 파일을 지웁니다.   
60일 이전 파일을 지웁니다. (2달 파일 이력관리)  
