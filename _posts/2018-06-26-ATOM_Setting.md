---
layout: post
title: "ATOM 의 Github 설정 및 Git commit"
date: 2018-06-26 14:02:00 +0900
comments: true
---

Github blog를 만들 때, 지금 [ATOM Editor](https://atom.io/)을 사용 중이다.

기본적으로 Markdown preview 기능을 제공해주기 때문에 (ctrl + shift + m : 단축키) 미리보기 기능이 좋아, 사용 중이다.

github 연동이라든가, 브런치 및 여러가지 기능을 쓰려면 IntelliJ가 편하나, Github blog만 관리할 경우에는 Atom이 매우 편했다.

물론 사람마다 다 다르겠지만, 나의 경우는 IntellJ 나 비쥬얼 스튜디오 2017의 경우 프리뷰 기능을 제공은 해주나, Atom 처럼 거의 html 을 완벽하게 구현해주지는 못하는 느낌이 들어서 그렇다.
(아마 Atom 자체가 html, js, javascript 가 지원되는 에디터이기 때문일 거 같다.)

인터넷에서 처음 Atom 사용시 git-clone 을 패키지 설치하면 편하다는 글을 보았다.

패키지에서 git-clone, git-plus 를 다운받았는데,
어떤 글에는 markdown preview 로 다운받으라는 글도 있었다.

Atom 이 계속 업글되면서 default pakage 에 포함되어있는 것들도,
예전 글에서는 install pakage 로 등록해야하는 것 같다.

git-clone 또한, 그냥 ctrl + shift + p 를 눌러,  
커맨드 창을 호출하여 Git clone 을 치면, 나오는 Github 에서 제공하는 clone 을 쓰는 것이 더 편한 느낌이 든다.

git-plus 기능 또한, 우측 버튼을 눌러 메뉴를 띄어 처리할 때 말고는 슈퍼검색(command line)을 눌러(ctrl+shift+p)서 git tab 을 검색해 띄우는 git 관련 툴이 조금씩 손에 익으니 더 편하게 되는거 같다.


markdown preview
---
```
ctrl + shift + m
```

git commit, push, pull 등등
---
```
ctrl+shift+p > git tab
```

git clone
---
```
ctrl+shift+p > git clone
```
