---
layout: post
title: "clean package -P"
comments: true
---

maven package clean 하게 처리하면서 pom.xml 에 기술한 resource 를 사용하는 법입니다.

```
clean package -P
```

-P는 정의된 profies중 하나를 처리함을 의미합니다.

```
<!-- profile definition -->
   <profiles>
       <profile>
           <id>local</id>
           <activation>
               <activeByDefault>true</activeByDefault>
           </activation>
           <properties>
               <environment></environment>
           </properties>
       </profile>
       <profile>
           <id>dev</id>
           <properties>
               <profile-id>dev</profile-id>
               <environment>-dev</environment>
               <maven.test.skip>true</maven.test.skip>
           </properties>
       </profile>
       <profile>
           <id>server</id>
           <properties>
               <profile-id>server</profile-id>
               <environment>-server</environment>
               <maven.test.skip>true</maven.test.skip>
           </properties>
       </profile>
   </profiles>
```

위와같이 server, dev, local 등을 설정할 수 있으며 그냥 처리할 경우, activeByDefault에 의해 local 이 default 처리됩니다.
resources-batch 와 같이 resource뒤에 접미사를 '-dev' , '-batch'등으로 두어 프로파일을 선택할 수 있도록 합니다.
