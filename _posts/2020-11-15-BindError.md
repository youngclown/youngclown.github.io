---
layout: post
title: "Data conversion error converting"
comments: true
---
   
   
과제 수행 중, 알 수 없는 오류가 발생했습니다.   

```
; Data conversion error converting "black" [22018-200]; nested exception is org.h2.jdbc.JdbcSQLDataException: Data conversion error converting "black" [22018-200]] with root cause

java.lang.NumberFormatException: For input string: "black"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:68) ~[na:na]
	at java.base/java.lang.Integer.parseInt(Integer.java:652) ~[na:na]
	at java.base/java.lang.Integer.parseInt(Integer.java:770) ~[na:na]
	at org.h2.value.Value.convertToInt(Value.java:982) ~[h2-1.4.200.jar:1.4.200]
	at org.h2.value.Value.convertTo(Value.java:806) ~[h2-1.4.200.jar:1.4.200]
	at org.h2.value.Value.convertTo(Value.java:737) ~[h2-1.4.200.jar:1.4.200]
	at org.h2.value.Value.getInt(Value.java:623) ~[h2-1.4.200.jar:1.4.200]
	at org.h2.jdbc.JdbcResultSet.getInt(JdbcResultSet.java:352) ~[h2-1.4.200.jar:1.4.200]
```

알 수 없는 에러 발생, color 라는 컬럼은 생성시 varchar로 생성하였는데 int 형 변수로 convert 하다가 실패하는 오류였습니다.    
h2 의 버전 문제인가 했는데 그것도 아니고,      
어떻게 보면 단순한 NumberFormatException 이슈였습니다.      
 
데이터를 넣을 때,  
color 를 'black'에서 number형인 '2'로 변경 시, 정상 동작되는 것을 보면,  
insert 이슈도 아니고 실제 데이터베이스에서는 정상적으로 'black'이라는 단어가 들어있는 것을 확인했습니다.  
    
혹시 순서나 변수선언에서 잘못된 것이 있을지도 몰라,     
color 를 productColor 로 변경 시 여전히, 에러 발생.   

정확한 원인 발생 전 전체 로직 테스트를 위해 '2'로 변경 후 테스트 진행을 하였습니다.  

원인은 바로 @Builder의 문제였습니다.  

![image](/images/20201115B_M.PNG){: width="100%"}

테스트가 끝나고, 원인 분석에 들어갔습니다.  
에러난 위치에서 디버그 모드로 확인해보니, 해당 컬럼을 int로 치환하다가 발생하는 문제....!?!


```java
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class UserConversion {
    private int userId;
    private int productId;
    private int couponId;
    private int point;
    private int productCount;
    private int productPrice;
    private String productColor;
    private String size;
    private int discountAmount;
}
```

lombok 에서 제공하는 @Builder 와 Mabatis 의 resultType과의 변수들끼리 매핑해야하는 순서 문제로,   
동일하게 맞추어 문제를 해결했습니다.     

Mapper에서 builder로 자동 맵핑하는 게 적용된 지 벌써 2년이 지났는데, 관련 오류가 그다지 많이 올라오진 않았네요.      
급하게 과제 수행하고자 인터넷을 뒤졌는데, 답이 안나와서 결국 디버그 모드로 해결했는데,    

정답은 인터넷에 있는게 아니라 소스에 있다고 다시한번 깨닫는 하루였습니다.      



 