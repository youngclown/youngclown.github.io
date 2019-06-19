---
layout: post
title: "윈도우 10 우분투에 레디스 설치"
comments: true
---


원하는 경로에 redis를 설치합니다.
```
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
```

make 명령어를 치니, make가 설치가 안되었다고 뜹니다.
```
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable# make

Command 'make' not found, but can be installed with:

apt install make
apt install make-guile
```

apt install make 명령어를 사용하여 설치하게 됩니다.

```
make[3]: Entering directory '/usr/local/redis/redis-stable/deps/hiredis'
gcc -std=c99 -pedantic -c -O3 -fPIC  -Wall -W -Wstrict-prototypes -Wwrite-strings -g -ggdb  net.c
make[3]: gcc: Command not found
Makefile:156: recipe for target 'net.o' failed
make[3]: *** [net.o] Error 127
make[3]: Leaving directory '/usr/local/redis/redis-stable/deps/hiredis'
Makefile:45: recipe for target 'hiredis' failed
make[2]: *** [hiredis] Error 2
make[2]: Leaving directory '/usr/local/redis/redis-stable/deps'
Makefile:190: recipe for target 'persist-settings' failed
make[1]: [persist-settings] Error 2 (ignored)
    CC adlist.o
/bin/sh: 1: cc: not found
Makefile:248: recipe for target 'adlist.o' failed
make[1]: *** [adlist.o] Error 127
make[1]: Leaving directory '/usr/local/redis/redis-stable/src'
Makefile:6: recipe for target 'all' failed
make: *** [all] Error 2
```

make[3]: gcc: Command not found 라는 에러가 뜹니다.
gcc를 설치해야합니다.

```
apt install gcc
```

gcc 를 설치합니다.
gcc 설치 중,

```
E: Failed to fetch http://security.ubuntu.com/ubuntu/pool/main/l/linux/linux-libc-dev_4.15.0-39.42_amd64.deb 404 Not Found [IP: 91.189.88.31 80]
```
이런 에러가 발생합니다.

```
apt-get update
```
apt-get 을 update 합니다.

```
apt install gcc
```
업데이트 후 gcc를 설치하면 404 Not Found 가 발생하지 않고 정상적으로 잘 설치가 됩니다.




gcc 설치 후, 다시 make를 치면 다음과 같은 에러가 납니다.

```
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable# make
cd src && make all
make[1]: Entering directory '/usr/local/redis/redis-stable/src'
    CC adlist.o
In file included from adlist.c:34:0:
zmalloc.h:50:10: fatal error: jemalloc/jemalloc.h: No such file or directory
 #include <jemalloc/jemalloc.h>
          ^~~~~~~~~~~~~~~~~~~~~
compilation terminated.
Makefile:248: recipe for target 'adlist.o' failed
make[1]: *** [adlist.o] Error 1
make[1]: Leaving directory '/usr/local/redis/redis-stable/src'
Makefile:6: recipe for target 'all' failed
make: *** [all] Error 2
```

최초 설치시 gcc가 없어 실패하면서, 무언가 제대로 설치가 안된거 같습니다.

단순하게 distclean 후 다시 설치하도록 하겠습니다.
```
make distclean
```

```
sudo make install
```

그럼 이제 정상적으로 redis 가 compile 되기 시작합니다.  

설치가 완료되면, src 폴더로 이동합니다.
```
cd src

-rwxr-xr-x 1 root    root    5216008 Jun 19 11:14 redis-cli
-rwxr-xr-x 1 root    root    8770008 Jun 19 11:14 redis-server
```

redis-server 실행을 합니다.
근데 실행이 안됩니다. ㅠ-ㅜ

deps 폴더에 가서, 별도의 명령어를 치는 방법.
```
cd deps
make hiredis jemalloc linenoise lua geohash-int
```
deps 로 가서 jemalloc 가 기타 등등을 실행시킵니다.

그리고 다시 make 로 설치를 진행합니다.


```
sudo make install
```

그리고 다시 ./src 폴더로 가면, redis-server를 실행시킬 수 있습니다.


```
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable/src# redis-server
3963:C 19 Jun 2019 11:57:22.660 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
3963:C 19 Jun 2019 11:57:22.661 # Redis version=5.0.5, bits=64, commit=00000000, modified=0, pid=3963, just started
3963:C 19 Jun 2019 11:57:22.662 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
3963:M 19 Jun 2019 11:57:22.663 * Increased maximum number of open files to 10032 (it was originally set to 1024).
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 5.0.5 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 3963
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

3963:M 19 Jun 2019 11:57:22.701 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
3963:M 19 Jun 2019 11:57:22.704 # Server initialized
3963:M 19 Jun 2019 11:57:22.706 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
3963:M 19 Jun 2019 11:57:22.713 * Ready to accept connections
```


```
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable/src# nohup ./redis-server &
[1] 3982
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable/src# nohup: ignoring input and appending output to 'nohup.out'

root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable/src#
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable/src#
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable/src# ps -ef|grep redis
root      3982    16  0 12:00 tty1     00:00:00 ./redis-server
root      3987    16  0 12:00 tty1     00:00:00 grep --color=auto redis
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable/src# redis-cli
127.0.0.1:6379> set key 'melong'
OK
127.0.0.1:6379> get key
"melong"
127.0.0.1:6379>
```

nohup 을 이용해, redis-server 를 실행시킵니다.  
redis-cli 를 이용해 간단한 테스트를 진행해봅니다.  

정상적으로 key와 value 가 찍히는 것을 확인할 수 있었습니다.
