---
layout: post
title: "jpa loop 문제 해결"
comments: true
---

JPA 에러 java.lang.StackOverflowError: null @ManyToOne, @OneToMany
---

```
@ToString
```

어노테이션을 ToString 했는데, OneToMany 같은걸 쓰다보니,
ToString 에서, ManyToOne 을 호출하고, 해당 클래스를 호출하고,
해당 클래스에서 다시 호출하면서,

무한 루플에 빠진 경우입니다.


@Data 를 적용했으면 @Getter 나 @Setter 로 바꾸고,
@ToString 에는 exlcude를 추가합니다.

@ToString(exclude = "변수명")
으로 작업을 합니다.
