---
layout: post
title: "자바에서 외부 프로그램/외부 명령어를 실행"
date: 2012-11-07 15:20:00 +0900
comments: true
---

ProcessBuilder : 자바에서 외부 프로그램/외부 명령어를 실행할때 사용하는 Class 입니다.

```aidl
package com.sec.infolink.admin.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.io.Writer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * Class Name : CommandExecuteUtil.java
 * Description : 
 *
 * Modification Information
 * Mod Date		Modifier	Description
 * ----------	------		---------------------------
 * 2012.11.07	젊은광대		최초생성
 *
 * 

 *
 * @author 젊은광대
 * @since 2012.11.07
 * @version 1.0
 */
public class CommandExecuteUtil {

	protected final static Log log = LogFactory.getLog(CommandExecuteUtil.class);
	
	public static String executeArr(String[] command, Log log) throws IOException {

		ProcessBuilder b = new ProcessBuilder(command);
		StringBuffer ret = new StringBuffer();

		  //표준 에러 출력을 머지 해 출력한다
		  b.redirectErrorStream(false);
		  Process p;
		
		  p = b.start();
		
		  
		  BufferedReader reader = new BufferedReader( new InputStreamReader( p.getInputStream() ) );
		  String line = null;
		  
		  //표준 에러 출력이 표준 출력에 머지 해 출력되므로, 표준 출력만 읽어내면 된다
		  while ((line = reader.readLine()) != null) {
			  ret.append(line);
		  }
	      
	      return ret.toString();
	}

	
	public static String execute(String command, String arg1, String arg2) throws IOException {

		// sh 파일이나 기타 FullPathTarget 으로 파일을 실행할 수 있다.
		// 실행파일 이름만으로 실행이 가능하다.
		// 다음과 같은 경우 (실행파일, 옵션, 어규먼트) 형식으로 인식한다.
		// 리눅스를 예를 들자면 rm -rf *.sh 형식이라고 이해하면 된다.
		// ProcessBuilder builder = new ProcessBuilder("rm -rf *.sh");
		// 으로 할 경우 인식을 제대로 못하기 때문에 분리해서 각각 입력한다.
		// ProcessBuilder builder = new ProcessBuilder("rm","-rf","*.sh");
		ProcessBuilder builder = new ProcessBuilder(command, arg1, arg2);
		StringBuffer ret = new StringBuffer();
		Process process = null;
		
		try {
			// 표준 에러 출력을 머지 해 출력한다
			// builder.redirectErrorStream(false);
			process = builder.start();
			
			BufferedReader reader = new BufferedReader( new InputStreamReader( process.getInputStream() ) );
			
			// process.waitFor();
			// 실행한 프로세스가 종료될 때까지 대기한다. 
			// 만약 실행한 프로세스가 동기식으로 처리되어야 한다면 사용해야 한다.
			// 하지만 그렇지 않다면 사용해서는 안된다. 
			// 예를 들어 데몬이나 서비스 형태의 프로세스를 실행하고자 하는 상황에서 
			// 이 명령을 사용하면 해당 프로세스가 종료될 때까지 이 명령을 수행한 프로세스는 진행되지 않는다.
			int i = process.waitFor();
			
			if (0 != i){
				log.info("Command Execute Fail : << " + i + " >>");
				log.debug("builder command : " + builder.command().toString());
			} else {
				log.debug("builder command : " + builder.command().toString());	
			}
			
			log.info(process.exitValue());

			String line = "";
			// 표준 에러 출력이 표준 출력에 머지 해 출력되므로, 표준 출력만 읽어내면 된다
			while ((line = reader.readLine()) != null) {
				ret.append(line);
			}
			
			// process.destroy();
		} catch (IOException e) {
			log.info(command + " " + "arg1 : " + arg1 + "arg2 : " + arg2);
			throw new RuntimeException(e);
		} catch (InterruptedException e) {
			log.info(command + " " + "" + "");
			throw new RuntimeException(e);
		} finally {
			if ( null != process) {
				closeQuietly(process.getInputStream());
				closeQuietly(process.getOutputStream());
				closeQuietly(process.getErrorStream());
				// 해당 프로세스를 종료시킨다. 
				// 역시 데몬이나 서비스 형태의 프로세스 호출시에는 사용해서는 안된다. 
				// 호출하면 해당 프로세스는 종료된다. 
				process.destroy();
			} else {
				log.info(command + " " + "arg1 : " + arg1 + "arg2 : " + arg2);
				log.info("Cannot close Process Streams");
				throw new RuntimeException("Cannot close Process Streams");
			}
		}
		return ret.toString();
	}
	
	public static void closeQuietly(Writer output) {
		 try {
			 if (output != null) {
				 output.close();
			 }
		 } catch (IOException ioe) {
			 //ignore
		 }
	 }
	 
	 public static void closeQuietly(Reader output) {
		 try {
			 if (output != null) {
				 output.close();
			 }
		 } catch (IOException ioe) {
			 //ignore
		 }
	 }
	 
	 public static void closeQuietly(InputStream output) {
		 try {
			 if (output != null) {
				 output.close();
			 }
		 } catch (IOException ioe) {
			 //ignore
		 }
	 }
	 
	 public static void closeQuietly(OutputStream output) {
		 try {
			 if (output != null) {
				 output.close();
			 }
		 } catch (IOException ioe) {
			 //ignore
		 }
	 }
	 
	 /*
	  * 실행 예제 : 리눅스와, 윈도우 환경에 따라서 다르게 동작하도록 작업해둡니다.
	  */
	 public static void main(String[] args) {
		  // OS 구분하여 명령어 처리 - 로컬(window) Dos 작업환경을 위해
         String osType = "unix";
         if(System.getProperty("os.name").toLowerCase().indexOf("win") >= 0 ){
         	osType = "window";
         }
         log.debug("OS check Test : "+System.getProperty("os.name").toLowerCase());
         String retail_size = "";
         // 윈도우와 리눅스 둘다 동작하도록 작업.
         try {
	         if(osType.equals("window")){
	        	 String cmd[] = new String[3];
	        	 cmd[0] = "cmd.exe";
	        	 cmd[1] = "/C";
	        	 cmd[2] = "dir";
	        	 retail_size = CommandExecuteUtil.executeArr(cmd, log);
	         }else{
	        	 retail_size = 
	        		 CommandExecuteUtil.execute(
	        				 "rm", 
	        				 "-rf", 
	        				 "*.*");
	         }
         } catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
         }
         log.info(retail_size);
	}
}
```

티스토리에서 옮기면서 추가적으로 적자면, 네이버에서는 2가지 방법에 대한 가이드가 있어 참조합니다. 

-----
# 참조 
-----

* [Java에서 외부 프로세스를 실행할 때](https://d2.naver.com/helloworld/1113548)