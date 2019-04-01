---
layout: post
title: "Ext JS Grid 를 변경할 때 사용"
date: 2011-08-11 12:32:00 +0900
comments: true
---

EXT JS 4.0

```
var selectModel = grid.getSelectionModel();
var ix = selectModel.getSelection();

for ( var k = 0; k < ix.length; k++) {
	grid.getStore().add(ix[k]);
}
```
삭제할 경우 : 
```
grid.getStore().remove(ix[k]);
```