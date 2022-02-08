---
layout: post
title: "JDBCTemplate 와 ORM 을 혼영할때, ORM을 못찾을 경우!"
comments: true
---

# JDBCTemplate 와 ORM 을 혼영할때, ORM을 못찾을 경우!


@EnableJdbcRepositories
으로 해당 인터페이스 클래스를 직접 정의해야함.
(ORM 으로 자동 Class 주입을 하기 위해 찾지 못하는 듯) 

```
@EnableJdbcRepositories(basePackageClasses = {BrandJdbcRepository.class, OrderListJdbcRepository.class, OrderJdbcRepository.class})

```


# 특정 Repositories 위치를 못찾을 경우

@ComponentScan
으로 해당 레포지토리 위치를 찾아줘야함.
```
@ComponentScan(basePackages={"ncode.domain.repository.boutique","ncode.domain.repository.brand", "ncode.domain.repository.order"})
```

ps. 해당 내용은 좀더 자세히 설명하려고 변경할 듯, 우선 해당 소스 삭제 전에 관련 내용 잊지 않기 위해 github upload