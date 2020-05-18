---
layout: post
title: "레디스 설치 및 실행"
comments: true
---

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
