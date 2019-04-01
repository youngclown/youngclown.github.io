---
layout: post
title: "removeFirstPrenpend"
comments: true
---

<dynamic> 요소 속성
---

dynamic 태크는 다른 동적 sql요소를 포장하고 결과적인 내용물을 위해 prepend, open, close를 수행하기 위해 제공되는 간단한 태그입니다.

prepend
```
속성값을 요소 내용의 가장 앞에 붙이기 위해 사용한다. prepend의 값은 요소 내용이 공백일 때는 앞에 붙이지 않는 다.
```

open
```
open 값은 요소 내용에 접두사로 붙이기 위해 사용한다. open 값은 요소 내용이 공백일 때는 출력되지 않는다. open 값은 prepend 속성 값보다는 뒤에 붙는다.
예를 들면 prepend="WHEN" 이고 open="(" 라면 조합된 결과는 "WHEN (" 가 될 것이다.  
```

close
```
close 값은 요소 내용의 뒤에 덧붙이기 위해 사용한다. 이 값은 요소 내용이 공백이라면 출력되지 않는다.
```

```
<statement id="dynamicGetAccountList" resultMap="account-result">
  select * from account
  <dynamic prepend="WHERE">
    <isNotNull prepend="AND" property="firstName">
       acc_first_name = #firstName#
    <isNotNull prepend="OR" property="lastName">
       acc_last_name = #lastName#
    </isNotNull>
    </dynamic>
order by acc_last_name
</statement>
```

위와같은 dynamic 쿼리를 사용할 경우, firstName 와 lastName. 이 두가지 값이 있다면,  
당연하게도 where 다음에는 and가 바로 붙을 경우,

```
select * from account where and acc_first_name = #firstName# or acc_last_name = #lastName#
```
이런 이상한 구문이 완성될 것이라고 생각했습니다.  
분명 prepend 로 인해 구문 오류가 발생할 것이라고 생각한 것입니다.  

하지만,

이 태그를 사용할 때 removeFirstPrepend속성이 강제로  적용된다고 합니다.
즉 맨 처음 나오는 prepend속성놈은 강제로 생략된다는 이야기로,
dynamic 태그안에 removeFirstPrepend = true가 적용은 되지만 생략된 채로 있다고 보면 됩니다.



-----
# 참조
-----

* [iBATIS 동적 WHERE 절 다루기 위한 요소 설명](http://syaku.tistory.com/51)

* [iBatis 동적 쿼리문 생성](http://narrowway.tistory.com/79)

* [dynamic 태그, isParameterPresent, removeFirstPrepend 설명](http://javafactory.tistory.com/354)

* [Dynamic SQL](http://ibatis.apache.org/docs/dotnet/datamapper/ch03s09.html)
