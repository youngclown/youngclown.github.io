---
layout: post
title: "레디스 설치 및 실행"
comments: true
---

centos 6.9에 레디스를 설치해보고자합니다.

레디스를 설치합니다. wget 이 없으므로 먼저 yum install wget으로 wget을 설치합니다.
```
[root@localhost ~]# yum install wget
Loaded plugins: fastestmirror
Setting up Install Process
Loading mirror speeds from cached hostfile
 * base: ftp.riken.jp
 * extras: ftp.tsukuba.wide.ad.jp
 * updates: ftp.tsukuba.wide.ad.jp
Resolving Dependencies
--> Running transaction check
---> Package wget.x86_64 0:1.12-10.el6 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

==============================================================================================================================================================================================================================================================================
 Package                                                        Arch                                                             Version                                                                 Repository                                                      Size
==============================================================================================================================================================================================================================================================================
Installing:
 wget                                                           x86_64                                                           1.12-10.el6                                                             base                                                           484 k

Transaction Summary
==============================================================================================================================================================================================================================================================================
Install       1 Package(s)

Total download size: 484 k
Installed size: 1.8 M
Is this ok [y/N]: y
Downloading Packages:
wget-1.12-10.el6.x86_64.rpm                                                                                                                                                                                                                            | 484 kB     00:00
Running rpm_check_debug
Running Transaction Test
Transaction Test Succeeded
Running Transaction
  Installing : wget-1.12-10.el6.x86_64                                                                                                                                                                                                                                    1/1
  Verifying  : wget-1.12-10.el6.x86_64                                                                                                                                                                                                                                    1/1

Installed:
  wget.x86_64 0:1.12-10.el6

Complete!
```

wget http://download.redis.io/redis-stable.tar.gz
으로 레디스를 다운받습니다.
```
[root@localhost home]# mkdir redis
[root@localhost home]# cd redis/
[root@localhost redis]# wget http://download.redis.io/redis-stable.tar.gz
--2020-05-18 15:44:48--  http://download.redis.io/redis-stable.tar.gz
Resolving download.redis.io... 109.74.203.151
Connecting to download.redis.io|109.74.203.151|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 2253771 (2.1M) [application/x-gzip]
Saving to: `redis-stable.tar.gz'

100%[====================================================================================================================================================================================================================================>] 2,253,771    318K/s   in 7.7s    

2020-05-18 15:44:57 (287 KB/s) - `redis-stable.tar.gz' saved [2253771/2253771]
```


```
tar xvzf redis-stable.tar.gz
cd redis-stable
make
```

make라는 명령어를 쳤는데, 에러가 납니다.
```
make[3]: Entering directory `/home/redis/redis-stable/deps/hiredis'
cc -std=c99 -pedantic -c -O3 -fPIC   -Wall -W -Wstrict-prototypes -Wwrite-strings -Wno-missing-field-initializers -g -ggdb net.c
make[3]: cc: 명령을 찾지 못했음
make[3]: *** [net.o] 오류 127
make[3]: Leaving directory `/home/redis/redis-stable/deps/hiredis'
make[2]: *** [hiredis] 오류 2
make[2]: Leaving directory `/home/redis/redis-stable/deps'
make[1]: [persist-settings] 오류 2 (무시됨)
    CC adlist.o
/bin/sh: cc: command not found
make[1]: *** [adlist.o] 오류 127
make[1]: Leaving directory `/home/redis/redis-stable/src'
make: *** [all] 오류 2
```

yum install gcc 로 gcc를 설치해줍니다.

```
[root@localhost redis-stable]# make clean
cd src && make clean
make[1]: Entering directory `/home/redis/redis-stable/src'
rm -rf redis-server redis-sentinel redis-cli redis-benchmark redis-check-rdb redis-check-aof *.o *.gcda *.gcno *.gcov redis.info lcov-html Makefile.dep dict-benchmark
rm -f adlist.d quicklist.d ae.d anet.d dict.d server.d sds.d zmalloc.d lzf_c.d lzf_d.d pqsort.d zipmap.d sha1.d ziplist.d release.d networking.d util.d object.d db.d replication.d rdb.d t_string.d t_list.d t_set.d t_zset.d t_hash.d config.d aof.d pubsub.d multi.d debug.d sort.d intset.d syncio.d cluster.d crc16.d endianconv.d slowlog.d scripting.d bio.d rio.d rand.d memtest.d crcspeed.d crc64.d bitops.d sentinel.d notify.d setproctitle.d blocked.d hyperloglog.d latency.d sparkline.d redis-check-rdb.d redis-check-aof.d geo.d lazyfree.d module.d evict.d expire.d geohash.d geohash_helper.d childinfo.d defrag.d siphash.d rax.d t_stream.d listpack.d localtime.d lolwut.d lolwut5.d lolwut6.d acl.d gopher.d tracking.d connection.d tls.d sha256.d timeout.d setcpuaffinity.d anet.d adlist.d dict.d redis-cli.d zmalloc.d release.d ae.d crcspeed.d crc64.d siphash.d crc16.d ae.d anet.d redis-benchmark.d adlist.d dict.d zmalloc.d siphash.d
make[1]: Leaving directory `/home/redis/redis-stable/src'
[root@localhost redis-stable]# MAKE
-bash: MAKE: command not found
[root@localhost redis-stable]# make
cd src && make all
make[1]: Entering directory `/home/redis/redis-stable/src'
    CC Makefile.dep
make[1]: Leaving directory `/home/redis/redis-stable/src'
make[1]: Entering directory `/home/redis/redis-stable/src'
    CC adlist.o
cc1: error: unrecognized command line option "-std=c11"
make[1]: *** [adlist.o] 오류 1
make[1]: Leaving directory `/home/redis/redis-stable/src'
make: *** [all] 오류 2
[root@localhost redis-stable]# make distclean
cd src && make distclean
make[1]: Entering directory `/home/redis/redis-stable/src'
rm -rf redis-server redis-sentinel redis-cli redis-benchmark redis-check-rdb redis-check-aof *.o *.gcda *.gcno *.gcov redis.info lcov-html Makefile.dep dict-benchmark
rm -f adlist.d quicklist.d ae.d anet.d dict.d server.d sds.d zmalloc.d lzf_c.d lzf_d.d pqsort.d zipmap.d sha1.d ziplist.d release.d networking.d util.d object.d db.d replication.d rdb.d t_string.d t_list.d t_set.d t_zset.d t_hash.d config.d aof.d pubsub.d multi.d debug.d sort.d intset.d syncio.d cluster.d crc16.d endianconv.d slowlog.d scripting.d bio.d rio.d rand.d memtest.d crcspeed.d crc64.d bitops.d sentinel.d notify.d setproctitle.d blocked.d hyperloglog.d latency.d sparkline.d redis-check-rdb.d redis-check-aof.d geo.d lazyfree.d module.d evict.d expire.d geohash.d geohash_helper.d childinfo.d defrag.d siphash.d rax.d t_stream.d listpack.d localtime.d lolwut.d lolwut5.d lolwut6.d acl.d gopher.d tracking.d connection.d tls.d sha256.d timeout.d setcpuaffinity.d anet.d adlist.d dict.d redis-cli.d zmalloc.d release.d ae.d crcspeed.d crc64.d siphash.d crc16.d ae.d anet.d redis-benchmark.d adlist.d dict.d zmalloc.d siphash.d
(cd ../deps && make distclean)
make[2]: Entering directory `/home/redis/redis-stable/deps'
(cd hiredis && make clean) > /dev/null || true
(cd linenoise && make clean) > /dev/null || true
(cd lua && make clean) > /dev/null || true
(cd jemalloc && [ -f Makefile ] && make distclean) > /dev/null || true
(rm -f .make-*)
make[2]: Leaving directory `/home/redis/redis-stable/deps'
(rm -f .make-*)
make[1]: Leaving directory `/home/redis/redis-stable/src'
```

make clean 을 했을 때, 잘 안될 경우, make distclean 를 처리합니다.

```
x_pool.o src/nstime.o src/pages.o src/prng.o src/prof.o src/rtree.o src/stats.o src/sz.o src/tcache.o src/ticker.o src/tsd.o src/witness.o
make[3]: Leaving directory `/home/redis/redis-stable/deps/jemalloc'
make[2]: Leaving directory `/home/redis/redis-stable/deps'
    CC adlist.o
cc1: error: unrecognized command line option "-std=c11"
make[1]: *** [adlist.o] 오류 1
make[1]: Leaving directory `/home/redis/redis-stable/src'
make: *** [all] 오류 2
```
다시 make를 했는데,
cc1: error: unrecognized command line option "-std=c11" 에러가 납니다.

```
[root@localhost redis-stable]# gcc -std=c11 --version
gcc (GCC) 4.4.7 20120313 (Red Hat 4.4.7-23)
Copyright (C) 2010 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

yum install gcc-c++
로 c++ 까지 설치합니다.

make distclean 처리한 후 다시 make 처리를 합니다.

그래도 안됩니다.

...centos 6.9 의 경우 yum install 로 설치히 4.4.7 ... 버전으로 밖에 설치가 안됩니다.

gcc update를 업데이트 해야합니다.

.... 업데이트를 해보았으나 결국 실패했습니다.

그렇다면 이제 남은 방법은 ....
레디스를 그냥 6.9에 맞춰서 깔아보겠습니다.

```
[root@localhost redis_1]# wget http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
--2020-05-19 10:21:44--  http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
Resolving dl.fedoraproject.org... 209.132.181.23, 209.132.181.25, 209.132.181.24
Connecting to dl.fedoraproject.org|209.132.181.23|:80... connected.
HTTP request sent, awaiting response... 404 Not Found
2020-05-19 10:21:45 ERROR 404: Not Found.
```

음... 404 Not Found가 떨어져버립니다....

```
[root@localhost redis_1]# rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm(을)를 복구합니다
경고: /var/tmp/rpm-tmp.RqmtU4: Header V3 RSA/SHA256 Signature, key ID 0608b895: NOKEY
준비 중...               ########################################### [100%]
   1:epel-release           ########################################### [100%]
```

우선 레디스를 다시 설치해보도록 하겠습니다!!!

```
[root@localhost redis_1]# yum --enablerepo=epel,remi install redis
Loaded plugins: fastestmirror
Setting up Install Process
Loading mirror speeds from cached hostfile
epel/metalink                                                                                                                                                                                                                                          | 6.8 kB     00:00     
 * base: ftp.riken.jp
 * centos-sclo-rh: ftp.riken.jp
 * centos-sclo-sclo: ftp.riken.jp
 * epel: mirror.telkomuniversity.ac.id
 * extras: ftp.tsukuba.wide.ad.jp
 * remi: merlin.fit.vutbr.cz
 * remi-safe: merlin.fit.vutbr.cz
 * updates: ftp.tsukuba.wide.ad.jp
https://mirror.telkomuniversity.ac.id/epel/6/x86_64/repodata/repomd.xml: [Errno 14] Peer cert cannot be verified or peer cert invalid
Trying other mirror.
It was impossible to connect to the CentOS servers.
This could mean a connectivity issue in your environment, such as the requirement to configure a proxy,
or a transparent proxy that tampers with TLS security, or an incorrect system clock.
You can try to solve this issue by using the instructions on https://wiki.centos.org/yum-errors

```

레디스를 직접 설치하겠습니다... ㅠㅜ
```
chkconfig redis on
```

```
[root@localhost redis_1]# netstat -nap | grep LISTEN
tcp        0      0 0.0.0.0:22                  0.0.0.0:*                   LISTEN      1141/sshd           
tcp        0      0 127.0.0.1:25                0.0.0.0:*                   LISTEN      1220/master         
tcp        0      0 127.0.0.1:6379              0.0.0.0:*                   LISTEN      5831/redis-server 1
tcp        0      0 :::22                       :::*                        LISTEN      1141/sshd           
tcp        0      0 ::1:25                      :::*                        LISTEN      1220/master     
```
드디어 레디스가 실행이 되었습니다.
자동으로 6379 포트로 켜졌습니다....


근데.......... 외부에서 접속이 안됩니다. ㅠ-ㅜ

```
vim /etc/redis.conf
```

레디스를 엽니다. 암호 설정과 외부에서 접속가능하게 처리하겠습니다.
암호를 설정하려면 requirepass를 찾아 foobared라고 되어 있는부분을 지우고 설정하려는 암호를 넣습니다.
외부에서 접속을 허용하기 위해서는 bind를 찾아 127.0.0.1로 되어있는 부분을 지우고 0.0.0.0으로 수정합니다.
redis.conf 파일을 저장하고 redis를 재시작해 줍니다.
```
requirepass 암호
bind 0.0.0.0
```

netstat 명령으로 redis-server가 외부에서 접속하능 하도록 되어 있는지 확인해 봅니다. redis의 포느는 6379입니다.

잘 접속되는거 확인 완료!!!
