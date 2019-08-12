---
layout: post
title: "백업파일 만들기"
comments: true
---

매일 백업을 해야하는데, 까먹고 배포해서 히스토리를 유실하는 경우가 많습니다.

CI(Continuous Integration)를 하루빨리 도입해야하나,
업무에 치여 항상 치일 피일 미루다가,
어마무지한 실수를 하게 됩니다.

```
DATE=`date +%Y%m%d-%H%M`

cd /home/data/public_html

# Java source backup
tar cfpz /data/source_backup/WEB-INF_${DATE}.tar.gz ./WEB-INF/*
```

특정 폴더에 있는 파일을 백업하는 shellscript 를 만들어 대응합니다. 
