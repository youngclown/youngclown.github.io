---
layout: post
title: "kcp res_msg"
comments: true
---

KCP 에서 본인인증 성공 시, 보내는 메시지가 EUC-KR 로 인코딩되서 오는데, 

서버의 스프링부트가 자동으로 UTF-8 로 인코딩되면서 발생하는 오류.

```
res_msg=%C1%A4%BB%F3%C3%B3%B8%AE
```

해당값을, 그대로 복사해서 인코딩 작업을 하게 되면,

```
String message = "%C1%A4%BB%F3%C3%B3%B8%AE";
String encodeData = URLDecoder.decode(message,"EUC-KR");
System.out.println("URL 인코딩 : "+encodeData);

```

'정상처리'라는 글을 볼 수 있으나, 실제 넘어오면 이상한 인코딩 (흡사 UTF-8로 인코딩했을 때 발생하는 오류처럼 보이는 메시지가 보입니다. 

```
URL 인코딩 : ����ó��
```

원인은, 스프링부트에서 form POST 방식(application/x-www-form-urlencoded)으로 데이터를 보낸 경우 
RequestBody는 자동으로 UTF-8로 urlEncoding 되기 때문입니다.


```
spring.http.encoding.force=false
```

```
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;
 
@Configuration
public class filterConfig {
    
    @Bean
    public FilterRegistrationBean encodingFilterBean() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
        filter.setForceEncoding(true);
        filter.setEncoding("UTF-8");
        registrationBean.setFilter(filter);
        registrationBean.addUrlPatterns("/xxxxx/*");
        return registrationBean;
    }
}
 
```

참고 주소 : https://m.blog.naver.com/PostView.nhn?blogId=duco777&logNo=220605479481&proxyReferer=https:%2F%2Fwww.google.com%2F



