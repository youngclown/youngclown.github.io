---
layout: post
title: "java 특정폴더의 이상한 확장자를 변경"
date: 2017-05-08 15:57:00 +0900
comments: true
---

```
import java.io.File;

public class phpAndJpg {
  public static void main(String[] args) {
    String filePath = "d:\\work";
    fileDirectory(filePath);
  }

  
  public static void fileDirectory(String filePath) {
    File f1 = new File(filePath);
    String[] list = f1.list();
    for (int i = 0; i < list.length; i++) {
      File f2 = new File(filePath, list[i]);
      File f3 = new File(filePath, list[i]+".jpg");
      if (f2.isDirectory()) {
//        System.out.printf("디렉토리 : %s %n", list[i]);
        fileDirectory(filePath+"/"+list[i]);
      } else {
        if ((filePath+"/"+list[i]).endsWith("php")){
        System.out.printf("파일 : %s %s %n", filePath+"/"+list[i], f2);
          if (!f2.renameTo(f3)) {
            System.err.println("이름 변경 에러 : " + f2);
          }
        }
//        System.out.printf("파일 : %s %, dbyte %n", filePath+"/"+list[i], f2.length());

      }
    }
  }
}
```

php 로 되어있는 문서 파일을 jpg로 바꾸는 로직
java 에서 특정 파일 확장자명을 가진 확장자를 다른 확장자명으로 바꾸는 로직