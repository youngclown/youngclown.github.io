---
layout: post
title: "ApplicationContext.getBean()"
comments: true
---

과제 수행하다가 갑자기 생각났던 내용을 정리합니다.  

Spring IoC 컨테이너가 관리하는 자바 객체를 우리는 빈(Bean)이라고 부릅니다.  

new 객체를 Bean 객체라고 부르지 않습니다.  

회사 레거시 소스 중 서블릿 Api 가 있고, 그곳에 스프링기능을 쓸 때는, ApplicationContext.getBean()을 사용해와서,
별 생각없이 사용해왔습니다.
(applicationContext.xml 에 해당 bean 객체를 생성하여(init 포함), 관리를 하고 있습니다.)

Spring에서의 빈은 ApplicationContext가 알고있는 객체로,  
ApplicationContext가 만들어서 그 안에 담고있는 객체를 의미합니다.   

스프링부트에서 Exception 발생 시, 내부적으로 빈객체를 호출해서 사용해야하는 경우가 생겨, 관련된 내용을 정리해둡니다.  

1. Bean을 가져오기 위해서는 ApplicationContext 를 생성

```java
   import org.springframework.beans.BeansException;
   import org.springframework.context.ApplicationContext;
   import org.springframework.context.ApplicationContextAware;
   import org.springframework.stereotype.Component;
    
   @Component
   public class ApplicationContextProvider implements ApplicationContextAware {
    
       private static ApplicationContext applicationContext;
    
       @Override
       public void setApplicationContext(ApplicationContext ctx) throws BeansException {
           applicationContext = ctx;
       }
    
       public static ApplicationContext getApplicationContext() {
           return applicationContext;
       }
    
   }
```


2. 그 다음 ApplicationContext를 사용하는 BeanUtils를 생성
```java

public class BeanUtils {
 
    public static Object getBean(String beanName) {
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        return applicationContext.getBean(beanName);
    }
 
}
```

3. BeanUtils을 통해 @Autowired 없이 빈객체 호출
```java
        A a = (A) BeanUtils.getBean("xxxxx");
```

