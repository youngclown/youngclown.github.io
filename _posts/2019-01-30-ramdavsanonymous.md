---
layout: post
title: "Anonymous"
comments: true
---
람다 vs 익명클래스 성능 확인
----

```java
import java.util.function.DoubleBinaryOperator;
public class Main {
    private final DoubleBinaryOperator op;
    Main( DoubleBinaryOperator op) {
        this.op = op;
    }

    public static void main(String[] args) {

        long start = System.currentTimeMillis();

        for (int i = 0; i < 100000; i++) {
            new Main(new DoubleBinaryOperator() {
                @Override
                public double applyAsDouble(double x, double y) {
                    return x+y;
                }
            });
        }

        long end = System.currentTimeMillis();
        System.out.println(end - start);

        start = System.currentTimeMillis();
        for (int i = 0; i < 100000; i++) {
            new Main((x,y)->x+y);
        }
         end = System.currentTimeMillis();
        System.out.println(end - start);
    }
}
```

람다를 사용할 경우, 소스는 매우 간단하게 바뀝니다.

테스트를 위해, DoubleBinaryOperator 클래스를 import 받아 테스트했을 때,

```java
new Main((x,y)->x+y);
```
람다는 단 한줄안에 처리되지만,
```java
new Main(new DoubleBinaryOperator() {
    @Override
    public double applyAsDouble(double x, double y) {
        return x+y;
    }
});
```
익명클래스(anonymous class)를 사용하여 생성할 경우에는 상당히 복잡해보입니다.
하지만 속도를 확인했을 경우,
anonymous class 로 생성해서 돌리는 경우가 람다식을 썻을 때보다 대략 3~8배 가량 빠른 것을 확인할 수 있습니다.
꼭 최신 기능이 더 나은 기능이란 것은 아니라고 생각합니다.

개발자들은 숨겨진 비용에 대해, 명확하게 알고 사용하는 것이 좋을 것이라고 생각합니다.
응답시간을 100ms 맞춰야하는 짧은 시간에서,
조금이라도 성능을 확인하고 적용하면, 별도의 Util 보다 hardcoding 형태로 바로 적용하는 것이 더 빠를 경우도 있어,
상황에 맡게 자신의 기술력을 적용하는 것이 어렵다는 걸 자주 느낍니다.
