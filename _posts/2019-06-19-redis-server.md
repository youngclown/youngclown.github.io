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

gcc 설치 후, 다시 make를 치면 다음과 같은 에러가 납니다.

```
root@DESKTOP-RNJILIO:/usr/local/redis/redis-stable# make
cd src && make all
make[1]: Entering directory '/usr/local/redis/redis-stable/src'
    CC Makefile.dep
    CC adlist.o
/bin/sh: 1: cc: not found
Makefile:248: recipe for target 'adlist.o' failed
make[1]: *** [adlist.o] Error 127
make[1]: Leaving directory '/usr/local/redis/redis-stable/src'
Makefile:6: recipe for target 'all' failed
make: *** [all] Error 2

```

/bin/sh: 1: cc: not found 가 없다고 합니다.
gcc를 다시 설치합니다.

```
apt install gcc++
```



```
make distclean
```



```
   cd redis-stable/
   make
   cd deps
   make hiredis jemalloc linenoise lua geohash-int
```

```


make
```



최신커널소스 업데이트
```
git clone https://kernel.googlesource.com/pub/scm/linux/kernel/git/torvalds/linux.git
```
그냥 해보고싶어서 해봤습니다.
