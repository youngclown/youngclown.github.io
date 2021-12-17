---
layout: post
title: "iOS netrwork library 인 alamofire 에서 내는 에러"
comments: true
---


```
responseSerializationFailed(reason: 
Alamofire.AFError.ResponseSerializationFailureReason.jsonSerializationFailed(error: 
Error Domain=NSCocoaErrorDomain Code=3840 "Unexpected end of file during string parse 
(expected low-surrogate code point but did not find one). around line 1, column 340." 
UserInfo={NSDebugDescription=Unexpected end of file during string parse 
(expected low-surrogate code point but did not find one). around line 1, column 340., 
NSJSONSerializationErrorIndex=340}))
() $R0 = {}
```

# 아이폰에서 이모지

뒷글자 3자리를 자르는 작업시, 이모지가 정상적으로 완성되지 않음.
웹, 안드로이드는 깨진글자가 그대로 동작하나, 아이폰은 json 자체가 파싱이 안되는 현상이 있음.

자바 1.8부터 제공하는 

```java

new StringBuilder().appendCodePoint(
  emostring.codePointAt(emostring.offsetByCodePoints(0, 1))).toString()

```

copePointAt을 이용하고자했는데, 그냥
BreakIterator.getCharacterInstance() 를 이용하여 처리했습니다. 
(회사의 테크리더 팀장님이 공유해주심. )

```

public class GraphemeStringProxy {
    private final String originString;
    private final List<String> parsedString;

    public GraphemeStringProxy(String originString) {
        this.originString = originString;
        this.parsedString = splitChars(originString);
    }

    private List<String> splitChars(String str) {
        List<String> parsed = new ArrayList<>();

        BreakIterator it = BreakIterator.getCharacterInstance();
        it.setText(str);
        int index1 = 0;
        int index2 = it.next();
        while (index2 != BreakIterator.DONE) {
            parsed.add(str.substring(index1, index2));
            index1 = index2;
            index2 = it.next();
        }

        return parsed;
    }

    public int length() {
        return parsedString.size();
    }

    public boolean isEmpty() {
        return parsedString.isEmpty();
    }

    public String substring(int startIndex, int endIndex) {
        StringBuffer sb = new StringBuffer();
        parsedString.stream().skip(startIndex).limit(endIndex - startIndex).forEach(sb::append);
        return sb.toString();
    }
}

```
위와 같이 최종적으로 처리함. 


