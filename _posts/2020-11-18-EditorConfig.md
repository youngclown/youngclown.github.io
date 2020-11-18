---
layout: post
title: "EditorConfig"
comments: true
---

이번 과제를 3개 정도 동시에 수행하면서,  
회사 프로젝트의 코드컨밴션과 과제 한곳과 다른 부분 때문에 고생했습니다.  

그런데, .editorconfig 라는 파일이 존재하는 것을 알게되어,  
히스토리를 남깁니다.  

#### Spring-boot editorconfig
```
root=true

[*.{groovy,java,kt,xml}]
indent_style = space
indent_size = 4
continuation_indent_size = 4
```

저는 "Tab vs Space, 2글자 vs 4글자" 에서, 현재 저는 2 Space 신봉자입니다.     
(확실히 안이쁘긴 합니다.)  

예전엔 8자리 띄워쓰기를 하는 경우도 있었지만,  
지금은 보통 4자리 띄어쓰기가 기본으로 알고 있습니다.   

2 space 를 선호하게 된 것은 인텔리J를 쓰게 되면서 줄당 평균 글자수를 지키고 싶었기 때문입니다.  

물론, 4글자를 써서, 줄당 평균 글자수를 강제로 줄여주는 효과에 대해서도 고민해보았지만,  
현업이란게, 저만 글자수를 줄인다고 해결되는 것이 아니니까요.  

만약 모든 분들이 글자수를 강제로 줄이는 부분에 대해서 같이 고민하는 회사라면,  
과감히 Tab 과 4 글자도 도전해보고 싶네요! 저도 많은 경험을 하게 되겠지요!   

여하튼,   


```
# top-most EditorConfig file
root = true

[*]
# [encoding-utf8]
charset = utf-8

# [newline-lf]
end_of_line = lf

# [newline-eof]
insert_final_newline = true

[*.bat]
end_of_line = crlf

[*.java]
# [indentation-tab]
indent_style = tab

# [4-spaces-tab]
indent_size = 4
tab_width = 4

# [no-trailing-spaces]
trim_trailing_whitespace = true

[line-length-120]
max_line_length = 120
```

과제중, Tab 과 4글자로 강제하는 과제가 있었습니다.  
기존 프로젝트에 영향을 주는 과제였고,  
또 다른 과제는 인텔리J의 기본 컨벤션을 사용하라는 과제였습니다.  

그리고 회사에서는 2글자와 2space를 사용하고 있고요!!! 

결국, .editorconfig 를 이용해서, 잘 해결했다고 생각합니다.  
무언가 도전(?)한다는 것은 무언가를 얻을 확률이 높다는 걸 다시한번 경험합니다!  