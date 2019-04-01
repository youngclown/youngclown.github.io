---
layout: post
title: "Connect Error: Can't connect to local MySQL server through socket '/var/lib/mysql'"
date: 2018-04-28 14:08:00 +0900
comments: true
---

```
Connect Error: Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (111)
```

mysql 오류
---

mysql로 localhost에 접속하려고 할 때, 다음과 같은 오류가 발생했습니다.

```
$ mysql -uroot
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (111)
```

인터넷을 통해 해결방법을 찾아보았는데, root 계정으로 symbolic link 설정하라는 글을 봤습니다.
```
$ ln -s /tmp/mysql.sock /var/lib/mysql/mysql.sock
```

그렇게 했는데도 처리가 안됩니다.
여러가지 방법을 사용해봤는데, 데이터베이스가 전체적으로 깨진것으로 파악되며,
아예 전부 리셋하지 않으면 방법이 없어보입니다.

개인서버이며, mysql 에서 mariadb로 변환하면서 생긴 오류로 파악되어, 인터넷의 여러방법을 찾아봤지만, 해결책을 찾을 수 없었습니다.

어쩔 수없이, crontab -e 에 1분간 shell script 를 등록했습니다.
```
* * * * * sh /home/mysql_start.sh
```
별도의 쉘스크립트를 생성하였고, 해당 스크립트는,

```
/usr/sbin/service mysql start >> /home/mysql.log 2>&1
```

1분마다 계속 mysql 을 start 시킵니다.
라이브 운영되는 서버라면 mariadb를 dump 하여 다시 마이그레이션처리를 해야할 이슈로 보입니다.
