---
layout: post
title: "gitignore 와 git commit 제외"
comments: true
---


한 번도 커밋 되지 않은 파일은 .gitignore 를 사용하면 변경 사항을 무시 할 수 있습니다.

하지만 커밋 된 적이 있는 파일은 .gitignore 에 등록 해도 변경 사항을 트래킹하여, gitignore에 등록되더라도 계속 커밋되는 현상이 생기게 됩니다.
git status 사용시에 변경되는 파일 목록을 볼수있습니다.

임의의 파일 datasource.properties 라는 파일을 gitignore에 등록을 했는데, 트래킹되면서 커밋이 발생할 수 있습니다.

인텔리J의 경우는 커밋하지 않을 파일들을, Move Files to Another Changelist... 를 이용해서 별도의 파일을 관리할 수 있습니다.
그러나, 타툴을 사용하시는 분들의 경우 (이클립스, 소스트리 등등)에는 해당 기능이 없어 git 순수한 명령어를 통해 커밋을 제외할 수 있습니다.
그렇기 때문에 기본적인 git 명령어를 통해 커밋 된 파일의 수정 사항 무시하는 방법은 다음과 같습니다.

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

임시로 사용할 때는 좋지만 현재 unchanged로 지정된 파일의 내역을 보는 명령어는 없으므로 너무 장기간 사용해서 --assume-unchanged로 지정된 것을 잊어먹으로 오히려 혼란을 초래할 수도 있어 보입니다.
이럴 경우에는 git update-index --really-refresh 를 사용하면 앞에서 --assume-unchanged로 지정한 내용을 무시하고 워킹트리에 대한 인덱스를 새로 갱신합니다.

위 방법을 사용하는 것은 로컬의 계정이 다 틀리기 때문에 발생하는 이슈입니다.

로컬 설정값이 실수로 올라가게 되는 경우를 방지하기 위한 목적이므로, 해당 방법이 좋아보입니다. 
