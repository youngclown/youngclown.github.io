---
layout: post
title: "Ext js tab 처리"
date: 2011-09-07 11:21:00 +0900
comments: true
---

```
tab = Ext.createWidget('tabpanel', { ... });

    function switchTabs(next) {
    	var items = tab.items.items;
	//var active_tab = tabs.getActiveTab();
	tab.setActiveTab(items[next].id);
    }
```

-----
# 참조 
-----

* [So the switchTabs function](http://extperience.wordpress.com/tag/tutorial/)
