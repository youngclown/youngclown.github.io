---
layout: post
title: "Ext Js 에서 text 는 중앙정렬, 컬럼내용은 좌우정렬하는 방법"
date: 2012-05-31 17:14:00 +0900
comments: true
---
 
```aidl
text : '<span style="padding: 0px 0px 0px 60px">Country Name</span>',
width : 200, 
align : 'left',
sortable : true,
dataIndex: 'SHORT_COUNTRY_NM'
```

기존에는 이런식으로 중앙 좌측 정렬인데 중앙 정렬을 하기 위해서는 text 안에 <span> 옵션을 주었다.
이게 엄청나게 짜증이 난다.
1px 단위로 수정하고나서 실제로 변경되었는지 확인해야하기 때문이다.

그런데 이 방법이 말고,
text는 중앙정렬이 되면서, 컬럼안에 들어있는 값은 좌측, 우측으로 정렬이 가능한 방법이 있었다.

바로
```aidl
style: 'text-align:center'
```
을 주는 방법이었다.
 
```aidl
text : 'Country Name',
style : 'text-align:center',
width : 200, 
align : 'left',
sortable : true,
dataIndex: 'SHORT_COUNTRY_NM'

```

그렇게 되면 정상적으로 "Country Name"이라는 헤더값이 중앙정렬이 되면서,
출력되는 컬럼값들은 전부 좌측정렬이 된다.

 

 