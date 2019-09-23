---
layout: post
title: "함수형 자바스크립트와 동시성 프로그래밍"
comments: true
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/fWRMM6AaMMc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>





```javascript
// javascript 에서 리스트를 순회하는 법
const log = console.log;
function f(list, length) {
  for (const a of list)  {
    log(list);
  }
}

function main() {
  f([1,2,3,4,5],2)
}

main();
```



일반적으로 개발자가 작성하는 코드는 다음과 같습니다.

```javascript
// 리스트에서 홀수를 length 만큼 뽑아서 제곱한 후 모두 더하기
const log = console.log;
function f(list, length) {
  let i = 0;
  let acc = 0;
  for (const a of list)  {
    if(a % 2) {
      acc = acc + a * a;
      if (++i == length) break;
    }
  }
  log(acc);
}

function main() {
  f([1,2,3,4,5],1);
  f([1,2,3,4,5],2);
  f([1,2,3,4,5],3);
}
```

거의 전부를 표현했다고 볼 수 있습니다. 프로그램을 작성하는 모든 추상화되어있는 로직(기능)이 여기서 나올 수 있습니다.
if 를 사용해서 제어를 한다든지, 연산을 한다든지,
for문을 최적화 하기 위해, 시간복잡도를 좋게 하기 위해 break 를 사용한다던가,
외부에 영향을 주는 등의 log를 찍거나 하는 행위를 할 수 있습니다.



if 를 함수형 프로그래밍으로 변환
---

일단, 함수형 프로그래밍에서 if 같은 경우는 if를 한번만 사용할 경우 filter 라고 합니다.
```javascript
function *filter(f,list) { // 제네러이터 함수
for (const a of list)  {
  if(f(a)) yield a;
}
```

위의 함수는 위의 if(a % 2) 를 특정조건일 경우 yield 를 할 수 있도록 하고, 일급함수로 받은 함수를 사용하여, 어떤 조건일 때 필터링을 할 것인지 위임하는 형태로 구성하게 됩니다.

```javascript
// 리스트에서 홀수를 length 만큼 뽑아서 제곱한 후 모두 더하기
const log = console.log;

function *filter(f,list) { // 제네러이터 함수
  for (const a of list)  {
    if(f(a)) yield a;
  }
}

function f(list, length) {
  let i = 0;
  let acc = 0;
  for (const a of filter(a => a % 2, list))  {
    acc = acc + a * a;
    if (++i == length) break;
  }
  log(acc);
}
function main() {
  f([1,2,3,4,5],1);
  f([1,2,3,4,5],2);
  f([1,2,3,4,5],3);
}
main();
```

if문을 없애고, list 를 넣는 곳에 filter 연산에 대한 다양성을 대체할 수 있게 됩니다.


a * a 를 함수형 프로그래밍으로 변환
---
어떤 특정한 값이 다른 값으로 바꾸는 작업을 함수형 프로그래밍에서 map 이라는 함수를 통해 추상화되어있습니다.

```
function *map(f,list) {
  for (const a of list) {
    yield f(a);
  }
}
```
으로 변환할 시에, 다음과 같이 변경할 수 있게 됩니다.

```javascript
// 리스트에서 홀수를 length 만큼 뽑아서 제곱한 후 모두 더하기
const log = console.log;

function *filter(f,list) { // 제네러이터 함수
  for (const a of list)  {
    if(f(a)) yield a;
  }
}

function *map(f,list) {
  for (const a of list) {
    yield f(a);
  }
}

function f(list, length) {
  let i = 0;
  let acc = 0;
  for (const a of map(a => a * a, filter(a => a % 2, list)))  {
    acc = acc + a;
    if (++i == length) break;
  }
  log(acc);
}

function main() {
  f([1,2,3,4,5],1);
  f([1,2,3,4,5],2);
  f([1,2,3,4,5],3);
}
main();
```



++i 를 함수형 프로그래밍으로 변환
---
++i 는 1씩 증가하는 명령어 함수인데요. 명령어 코드는 실제 구체적으로 어떻게 할 것인지를 구술하는 명령어인데요.
실제 서술하는 서술형 함수입니다.


여담으로 순회가 가능한 값을 list 나 배열로 부르지않고  이터러블이라고 부릅니다. 좀더 추상화레벨에 높은 순회가 가능한 객체를 말합니다.
```
function take (length, iter) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == length) return res;
  }
  return res;
}

```
break 문을 걸 수도 있지만, 함수형 프로그래밍은 계속 return 하는 형태가 좋습니다.


```javascript
// 리스트에서 홀수를 length 만큼 뽑아서 제곱한 후 모두 더하기
const log = console.log;

function *filter(f,list) { // 제네러이터 함수
  for (const a of list)  {
    if(f(a)) yield a;
  }
}

function *map(f,list) {
  for (const a of list) {
    yield f(a);
  }
}

function take (length, iter) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == length) return res;
  }
  return res;
}

function f(list, length) {
  let i = 0;
  let acc = 0;
  for (const a of take(length, map(a => a * a, filter(a => a % 2, list))))  {
    acc = acc + a;
  }
  log(acc);
}

function main() {
  f([1,2,3,4,5],1);
  f([1,2,3,4,5],2);
  f([1,2,3,4,5],3);
}
main();
```

외부세상 일은 외부세상에서
---

함수형 프로그래밍에서 굉장히 중요한 것이 있습니다.

```
  f([1,2,3,4,5],1);
```
외부에서 어떤 함수에게 메시지를 전달하여, 그 함수가 어떤 외부 세상에 영향을 끼치는 것보다, 최대한 인자와 리턴값으로 소통하고 외부세상에 영향을 끼치는 것은 외부세상에서 하도록 하는 식으로 권장합니다.


```
function f(list, length) {
  let i = 0;
  let acc = 0;
  for (const a of take(length, map(a => a * a, filter(a => a % 2, list))))  {
    acc = acc + a;
  }
  return acc;
}

function main() {
  log(f([1,2,3,4,5],1));
  log(f([1,2,3,4,5],2));
  log(f([1,2,3,4,5],3));
}

```


이터레이터 or 이터러블 에 대한 함수형 프로그래밍
---

```javascript
function reduce(f, acc, iter) {
  for (const a of iter)  {
    acc = f(acc,a);
  }
  return acc;
}
```
acc 를 a 를 더하여 계속 acc를 축약한 후에 해당 값을 return 할 것인데, 그 축약하는 것을 외부로 위임하는 것입니다.

```javascript
function f(list, length) {
  return reduce (
    acc => acc + a,
    0,
    take(length, map(a => a * a, filter(a => a % 2, list))));
  }
}
```




```javascript
const log = console.log;

function *filter(f,list) { // 제네러이터 함수
  for (const a of list)  {
    if(f(a)) yield a;
  }
}

function *map(f,list) {
  for (const a of list) {
    yield f(a);
  }
}

function take (length, iter) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == length) return res;
  }
  return res;
}

function reduce(f, acc, iter) {
  for (const a of iter)  {
    acc = f(acc,a);
  }
  return acc;
}

function f(list, length) {
  return reduce (
    (acc, a) => acc + a,
    0,
    take(length, map(a => a * a, filter(a => a % 2, list))));
}

function main() {
  log(f([1,2,3,4,5],1));
  log(f([1,2,3,4,5],2));
  log(f([1,2,3,4,5],3));
}
main();
```

이렇게 되면, 단순한 함수하게 표현가능합니다.

```javascript
const log = console.log;

function *filter(f,list) { // 제네러이터 함수
  for (const a of list)  {
    if(f(a)) yield a;
  }
}

function *map(f,list) {
  for (const a of list) {
    yield f(a);
  }
}

function take (length, iter) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == length) return res;
  }
  return res;
}

function reduce(f, acc, iter) {
  for (const a of iter)  {
    acc = f(acc,a);
  }
  return acc;
}

const add = (a,b) => a + b;

const f = (list, length) =>
  reduce (
    (acc, a) => acc + a,
    0,
    take(length, map(a => a * a, filter(a => a % 2, list))));

function main() {
  log(f([1,2,3,4,5],1));
  log(f([1,2,3,4,5],2));
  log(f([1,2,3,4,5],3));
}
main();
```

함수형 프로그래밍 언어의 가장 기초적인 추상화 단계가 끝이 났습니다.

```javascript
const add = (a,b) => a + b;
const f = (list, length) =>
  reduce (
    add,
    0,
    take(length, map(a => a * a, filter(a => a % 2, list))));
```
함수형 프로그래밍 언어로 바꾸면 매우 읽기가 쉬워졌는데요.
오른쪽에서 왼쪽으로 가면서 읽으면됩니다.

```
list 를 가지고, (a % 2) 라는 조건으로 필터링을 한다음에,
a * a 라고 map(ping)하여, 하나씩 값을 대입하여 바꾸고,
그중에 length 만큼만 take (꺼내서)
0 부터,
모두다 add (더해서) reduce (결과를) 내어라.
```

라는 뜻을 가지게 됩니다.
그리고 조금더 편하게 만들면,

```javascript
  reduce (add, 0,
    take(length,
      map(a => a * a,
        filter(a => a % 2, list))));
```
필터하고, 맵핑하고 가져와서 reduce하면된다. 가 됩니다.

여기까지가 17분 40초 분량입니다.




함수형 프로그래밍은 함수도 값이니까 함수도 축약할 수 있습니다.


go는 리스트 프로세싱으로
```javascript
go(10, a=> a +1, a=> a+10, log);
```
10을 1을 더하고 10을 더한후 log에 출력해라는 list 를 값으로 다루면서 적절하게 평가가 가능한 구조로 진행됩니다.

```javascript
const go = (a, ...fs) => reduce((a, f) => f(a), a, fs);
go(10, a=> a+10, a=>a+1, log)
```
reduce 같은 경우에 acc 를 생삭하고 f 와 iter 만 넘길 경우, 념겨진 파라미터(arguments)가 2개가 되므로,


```javascript
function reduce(f, acc, iter) {
  if(arguments.length == 2) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; // 첫번째에 있는 값을 꺼내서 넣겠다.
  }
  for (const a of iter)  {
    acc = f(acc,a);
  }
  return acc;
}
```
이렇게 만들면, reduce가 재귀함수처럼 사용할 수 있게 됩니다.

```javascript
const go = (a, ...fs) => reduce((a, f) => f(a), a, fs);
function reduce(f, acc, iter) {
  if(arguments.length == 2) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; // 첫번째에 있는 값을 꺼내서 넣겠다.
  }
  for (const a of iter)  {
    acc = f(acc,a);
  }
  return acc;
}
```

처럼 사용가능합니다. 조금더 읽기 편하게 좌측부터 읽을 수 있도록 다음과같이 처리가 가능합니다.
``` java
const f2 = (list, length) => go(
  list,
  list => filter(a=>a%2,list),
  list => map(a=>a*a,list),
  list => take(length, list),
  list => reduce(add,list)
)
```
filter 를 먼저 처리한 후 mapping 후, take 한 후에 reduce 를 처리해라 라고 말입니다.
해당 스크립트는 main 과 main2 로 분리하여 최종 처리하였습니다.

```javascript
const log = console.log;

function *filter(f,list) { // 제네러이터 함수
  for (const a of list)  {
    if(f(a)) yield a;
  }
}

function *map(f,list) {
  for (const a of list) {
    yield f(a);
  }
}

function take (length, iter) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == length) return res;
  }
  return res;
}

const go_old = (a, ...fs) => reduce((a, f) => f(a), a, fs); // arguments 값을 변경할 수 있으면 다같이 무떵그려저 값을 전달할 수 있음.
const go = (...fs) => reduce((a, f) => f(a), fs);

function reduce(f, acc, iter) {
  if(arguments.length == 2) {
    iter = acc[Symbol.iterator](); // acc 가 iter 임 (2번째값)
    acc = iter.next().value; // 첫번째에 있는 값을 꺼내서 넣겠다.
  }
  for (const a of iter)  {
    acc = f(acc,a);
  }
  return acc;
}


const add = (a,b) => a + b;

const f = (list, length) =>
  reduce (
    (acc, a) => acc + a,
    0,
    take(length, map(a => a * a, filter(a => a % 2, list))));

function main() {
  log(f([1,2,3,4,5],1));
  log(f([1,2,3,4,5],2));
  log(f([1,2,3,4,5],3));
}
main();

const f2 = (list, length) => go(
  list,
  list => filter(a=>a%2,list),
  list => map(a=>a*a,list),
  list => take(length, list),
  list => reduce(add,list)
)

function main2() {
  log(f2([1,2,3,4,5],1));
  log(f2([1,2,3,4,5],2));
  log(f2([1,2,3,4,5],3));
}

main2();
```

여기까지가 23분 까지의 내용입니다.


커링(curry)
---
```
const curry = f => (a, ...bs) => bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);
```
curry은 함수를 받아서, 일다 인자를 받아본 후에, 인자가 두개 이상 들어왔을 경우,
그 인자를 모두 받아서 처리하도록 하고,
인자가 하나일 경우, 그 다음에 인자를 받는 함수를 호출 할 수 있도록 합니다.


```
const curry = f => (a, ...bs) => bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);
const add = curry((a,b) => a+b);
```
이렇게 처리할 수 있게 됩니다. 그럴 경우 기존의 로직들도 curry를 감싸준다면,

```javascript
const f2 = (list, length) => go(
  list,
  list => filter(a=>a%2)(list),
  list => map(a=>a*a)(list),
  list => take(length)(list),
  list => reduce(add)(list)
)
```
한번에 보내던것을 두번에 끊어서 보낼 수 있게 됩니다.
list를 받아서, filter 를 그대로 list 로 전달한다는 말이 되므로,
list 를 받는 부분과 전달하는 부분을 지워도 된다는 말이 됩니다.



```javascript
const f2 = (list, length) =>
go(
  list,
  filter(a=>a%2),
  map(a=>a*a),
  take(length),
  reduce(add)
);
```
이처럼 조금더 간략하게 됩니다.

지연평가
---
만들어진 위의 go 함수는 지연적으로 평가가 됩니다.
filter 와 map 은 *(제너레이터)로 구현이 되어있습니다.
제너레이터는 return 이 아니라 yield를 하도록 되어있는데,
yield 를 사용한다는 것은 지연적으로 평가하라는 말입니다.

```
var it = map(a => a+1, [1,2,3]);
it.next();
```
it.next 를 호출해야지만 처리가 되지 var it 으로는 아무런 실행이 되지 않습니다.
그렇기 때문에 처음 만들어진 시간복잡도가 동일하다는 것을 의미합니다.


```
const L = {};
```

filter 와 map 은 지연적으로 동작하니까, L 이라는 prefix를 달아줘서, 레이지한 함수라고 선언합닏나.

```
  L.filter = curry(function *(f,list) { // 제네러이터 함수
    for (const a of list)  {
      if(f(a)) yield a;
    }
  });

  L.map = curry(function *(f,list) {
    for (const a of list) {
      yield f(a);
    }
  });

  L.range = function *(stop) {
    let i = -1;
    while(++i < stop) yield i;
  };
```

range 를 만들어서 range(Infinity) 로 무한대를 선언한 후에, 200개만 빼올 수 있도록 구현할 수 있습니다.
```
log(f2([L.ragne(Infinity)],3));
```
라고 선언하여도 3번의 결과값을 찾은 후 종료됩니다.
35분 부터는 실전 학습....
