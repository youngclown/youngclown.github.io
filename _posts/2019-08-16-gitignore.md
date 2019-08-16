---
layout: post
title: "gitignore 와 git commit 제외"
comments: true
---


한 번도 커밋 되지 않은 파일은 .gitignore 를 사용하면 변경 사항을 무시 할 수 있습니다.

하지만 커밋 된 적이 있는 파일은 .gitignore 에 등록 해도 변경 사항을 트래킹하여, gitignore에 등록되더라도 계속 커밋되는 현상이 생기게 됩니다.

이미, datasource.properties 을 gitignore에 등록을 했는데, 트래킹되면서 커밋이 발생할 수 있도록 되어있습니다.

그러나, 타툴을 사용하시는 분들의 경우 (이클립스, 소스트리 등등)에는 해당 기능이 없어 git 순수한 명령어를 통해 커밋을 제외할 수 있습니다.

그렇기 때문에 기본적인 git 명령어를 통해 커밋 된 파일의 수정 사항 무시하는 방법을 설명드리겠습니다.


특정 파일의 수정사항 무시하기
----

```
git update-index --assume-unchanged [file path]
```

보통의 git이 설치된 분들이라면 git이 기본적으로 환경설정되어있을 터이니, 설정되어있을겁니다.

```
{경로}\src\main\resources>git update-index --assume-unchanged ./datasource.properties
```
처럼 특정파일(위의 예제는 datasource.properties) 와같이 위와같은 형태로 등록하시면, 커밋목록에서 삭제됩니다.



특정 파일의 수정사항 무시 취소하기
---

```
git update-index --no-assume-unchanged [file path]
```
추가로 해당 기능을 제외하고자 하면 위와같이 사용하시면됩니다.

이클립스의 경우, 우측버튼을 눌러 메뉴를 사용할 수 있으며,
인텔리J의 경우, Move to Another Changelist 를 통해 특정파일들을 별도의 그룹으로 하여 관리할 수 있습니다.
