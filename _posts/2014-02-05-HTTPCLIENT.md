---
layout: post
title: "HTTP Client (서버 to 서버)"
date: 2014-02-05 14:41:00 +0900
comments: true
---

관련주소 : http://javacan.tistory.com/60 를 보고 따라한
관련주소 : http://hyunisjolly.blogspot.kr/2012/04/http-client.html
를 따라함.


회사에서 사용한다고 해서 만들었는데,
안쓰게 되서 우선 블로그에 킵해둡니다. 서버에서 받아서 다른 서버로 파일을 보내는,
서버to서버 파일 전송 Class 입니다.
기존 소스에서 MultipartFile 을 받아서 처리할 수 있도록 작업하였습니다.

```
/**
 *
 * HTTP 요청을 전송한 후, 응답을 받아오는 유틸리티 클래스
 *
 * GET 방식과 POST 방식으로 데이터를 전송해주며
 * POST 방식의 경우 multipart/form-date 인코딩 방식도 지원해준다.
 * </pre>
 * @history :
 * ------------------------------------------------------------------
 * 변경일  작성자   변경내용
 * ------------------------------------------------------------------
 * 2013. 11. 25. 젊은광대 최초작성
 *
 * ------------------------------------------------------------------
 */

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.io.BufferedReader;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
//import java.net.URLConnection;
import java.net.URLEncoder;

import java.util.ArrayList;

import org.springframework.web.multipart.MultipartFile;


public class HttpRequest {

    public static final String CRLF = "\r\n";

    protected URL targetURL; // 연결할 URL
    protected String encoding = "UTF-8";   // String encoding

    /** HTTP HEADER **/
    private ArrayList<Object> requestHeader;
//    private ArrayList<Object> responseHeader;

    /**
     * 파라미터 목록을 저장하고 있다.
     * 파라미터 이름과 값이 차례대로 저장된다.
     */
    private ArrayList<Object> params;    
    private int responseCode;  // 응답코드
    private String responseMessage; // 응답메시지


    public HttpRequest(){
     reset();
    }

    /**
     * CONSTRUCTOR
     */
    public HttpRequest(URL target){
     reset();
     this.targetURL  = target;
    }

    public void setTargetUrl(String targetURL) {
     try {
   this.targetURL = new URL(targetURL);
  } catch (MalformedURLException e) {
   e.printStackTrace();
  }
    }

    /**
     * CONSTRUCTOR
     *
     * @param target HTTP 메시지를 전송할 대상 URL
     */
    public HttpRequest(URL target, String encoding) {
     reset();
     this.targetURL  = target;
     if ( encoding != null && encoding.equals("") == false ) { this.encoding  = encoding; }

    }

    /**
     * CONSTRUCTOR
     *
     * @param target HTTP 메시지를 전송할 대상 URL
     */
    public HttpRequest(URL target, String encoding, int initialCapicity) {
     reset();
     this.targetURL  = target;
     if ( encoding != null && encoding.equals("") == false ) { this.encoding  = encoding; }
    }

    public void reset()
    {
     this.targetURL    = null;
     this.requestHeader   = new ArrayList<Object>();
     // this.responseHeader  = new ArrayList<Object>();
     this.params    = new ArrayList<Object>();
     this.responseCode  = -1;
     this.responseMessage = "";
    }

    /**
     * INITIALIZE
     * @param target
     */
    public void init(URL target) {
     reset();
     this.targetURL  = target;
    }

    /**
     * INITIALIZE
     * @param target
     * @param encoding
     */
    public void init(URL target, String encoding) {
     reset();
     this.targetURL  = target;
     if ( encoding != null && encoding.equals("") == false ) { this.encoding  = encoding; }
    }

    /*****************************************************/

    public void addHeader(String parameterName, String parameterValue)
    {
        if (parameterValue == null)
            throw new IllegalArgumentException("Parameter Value can't be null(parameterName:"+parameterName+")!");

        requestHeader.add(parameterName);
        requestHeader.add(parameterValue);     
    }

    /**
     * 파라미터를 추가한다.
     * @param parameterName 파라미터 이름
     * @param parameterValue 파라미터 값
     * @exception IllegalArgumentException parameterValue가 null일 경우
     */
    public void addParameter(String parameterName, Object parameterValue) {
        if (parameterValue == null)
        throw new IllegalArgumentException("Parameter Value can't be null(parameterName:"+parameterName+")!");

        params.add(parameterName);
        params.add(parameterValue);
    }

    /**
     * 파일 파라미터를 추가한다.
     * 만약 parameterValue가 null이면(즉, 전송할 파일을 지정하지 않는다면
     * 서버에 전송되는 filename 은 "" 이 된다.
     *
     * @param parameterName 파라미터 이름
     * @param parameterValue 전송할 파일
     * @exception IllegalArgumentException parameterValue가 null일 경우
     */
    public void addFile(String parameterName, File parameterValue) {
        // paramterValue가 null일 경우 NullFile을 삽입한다.
        if (parameterValue == null) {
         params.add(parameterName);
         params.add(new NullFile());
        } else {
         params.add(parameterName);
         params.add(parameterValue);
        }
    }

    /**
     * 파일 파라미터를 추가한다.
     * 만약 parameterValue가 null이면(즉, 전송할 파일을 지정하지 않는다면
     * 서버에 전송되는 filename 은 "" 이 된다.
     *
     * @param parameterName 파라미터 이름
     * @param parameterValue 전송할 파일
     * @exception IllegalArgumentException parameterValue가 null일 경우
     */
    public void addMultiFile(String parameterName, MultipartFile parameterValue) {
        // paramterValue가 null일 경우 NullFile을 삽입한다.
        if (parameterValue == null) {
         params.add(parameterName);
         params.add(new NullFile());
        } else {
         params.add(parameterName);
         params.add(parameterValue);
        }
    }

    /**
     * 지금까지 지정한 파라미터를 모두 삭제한다.
     */
    public void clearParameters() {
     params.clear();
    }

    /*****************************************************/

    /**
     * GET 방식으로 대상 URL에 파라미터를 전송한 후
     * 응답을 InputStream으로 리턴한다.
     * @return InputStream
     */
    public InputStream sendGet() throws Exception {

        String paramString = null;
        if (params.size() > 0)
            paramString = "?" + encodeString(params);
        else
            paramString = "";

        URL url = new URL(targetURL.toExternalForm() + paramString);

        HttpURLConnection conn = (HttpURLConnection)url.openConnection();     
        conn.setRequestMethod("GET");

        // conn.setDoInput(true);
        conn.setDoOutput(true);
        // conn.setUseCaches(true);

        if (requestHeader != null && requestHeader.size() > 0) {
         for(int i=0, j=requestHeader.size(); i<j; i++) {
          String name = (String)requestHeader.get(i);
          i++;
          String value = (String)requestHeader.get(i);
          conn.setRequestProperty(name, value);
         }
        }
        conn.connect();

        this.responseCode   = conn.getResponseCode();
        this.responseMessage  = conn.getResponseMessage();

        for (int i=0; ; i++) {
            String headerName  = conn.getHeaderFieldKey(i);
            String headerValue  = conn.getHeaderField(i);

            if (headerName == null && headerValue == null) {
                // No more headers
                break;
            }
            if (headerName == null) {
                // The header value contains the server's HTTP version
             break;
            }
        }

        return conn.getInputStream();
    }

    /**
     * POST 방식으로 대상 URL에 파라미터를 전송한 후
     * 응답을 InputStream으로 리턴한다.
     * @return InputStream
     */
    public InputStream sendPost() throws Exception {
        String paramString = null;
        if (params.size() > 0)
            paramString = encodeString(params);
        else
            paramString = "";

        HttpURLConnection conn = (HttpURLConnection)targetURL.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

        if (requestHeader != null && requestHeader.size() > 0) {
         for(int i=0, j=requestHeader.size(); i<j; i++) {
          String name = (String)requestHeader.get(i);
          i++;
          String value = (String)requestHeader.get(i);
          conn.setRequestProperty(name, value);
         }
        }

        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setUseCaches(false);

        DataOutputStream out = null;

        try {
            out = new DataOutputStream(conn.getOutputStream());
            out.writeBytes(paramString);
            out.flush();
        } finally {
            if (out != null) out.close();
        }


        this.responseCode   = conn.getResponseCode();
        this.responseMessage  = conn.getResponseMessage();

        for (int i=0; ; i++) {
            String headerName  = conn.getHeaderFieldKey(i);
            String headerValue  = conn.getHeaderField(i);

            if (headerName == null && headerValue == null) {
                // No more headers
                break;
            }
            if (headerName == null) {
                // The header value contains the server's HTTP version
             break;
            }
        }

        //conn.getResponseCode();
        //conn.getResponseMessage();
        //conn.getErrorStream();

        return conn.getInputStream();
    }

    /**
     * multipart/form-data 인코딩을 사용하여
     * 대상 URL에 데이터를 전송한 후에
     * 응답을 InputStream으로 리턴한다.
     * @return InputStream
     */
    public InputStream sendMultipartPost() throws IOException {

        HttpURLConnection conn = (HttpURLConnection)targetURL.openConnection();

        // Delimeter 생성
        String delimeter = makeDelimeter();

        byte[] newLineBytes = CRLF.getBytes();
        byte[] delimeterBytes = delimeter.getBytes();
        byte[] dispositionBytes = "Content-Disposition: form-data; name=".getBytes();
        byte[] quotationBytes = "\"".getBytes();
        byte[] contentTypeBytes = "Content-Type: application/octet-stream".getBytes();
        byte[] fileNameBytes = "; filename=".getBytes();
        byte[] twoDashBytes = "--".getBytes();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "multipart/form-data; boundary="+delimeter);

        if (requestHeader != null && requestHeader.size() > 0) {
         for(int i=0, j=requestHeader.size(); i<j; i++) {
          String name = (String)requestHeader.get(i);
          i++;
          String value = (String)requestHeader.get(i);
          conn.setRequestProperty(name, value);
         }
        }

        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setUseCaches(false);

        BufferedOutputStream out = null;
        try {
            out = new BufferedOutputStream(conn.getOutputStream());

            Object[] obj = new Object[params.size()];
            params.toArray(obj);

            for (int i = 0 ; i < obj.length ; i += 2) {
                // Delimeter 전송
                out.write(twoDashBytes);
                out.write(delimeterBytes);
                out.write(newLineBytes);
                // 파라미터 이름 출력
                out.write(dispositionBytes);
                out.write(quotationBytes);
                out.write( ((String)obj[i]).getBytes() );
                out.write(quotationBytes);
                if ( obj[i+1] instanceof String) {
                    // String 이라면
                    out.write(newLineBytes);
                    out.write(newLineBytes);
                    // 값 출력
                    out.write( ((String)obj[i+1]).getBytes() );
                    out.write(newLineBytes);
                } else {
                    // 파라미터의 값이 File 이나 NullFile인 경우
                    if ( obj[i+1] instanceof File) {
                        File file = (File)obj[i+1];
                        // File이 존재하는 지 검사한다.
                        out.write(fileNameBytes);
                        out.write(quotationBytes);
                        out.write(file.getAbsolutePath().getBytes() );
                        out.write(quotationBytes);
                    } else if ( obj[i+1] instanceof MultipartFile) {
                     MultipartFile file = (MultipartFile)obj[i+1];
                        // File이 존재하는 지 검사한다.
                        out.write(fileNameBytes);
                        out.write(quotationBytes);
                        out.write(file.getOriginalFilename().getBytes() );
                        out.write(quotationBytes);
                    } else {
                        // NullFile 인 경우
                        out.write(fileNameBytes);
                        out.write(quotationBytes);
                        out.write(quotationBytes);
                    }
                    out.write(newLineBytes);
                    out.write(contentTypeBytes);
                    out.write(newLineBytes);
                    out.write(newLineBytes);
                    // File 데이터를 전송한다.
                    if (obj[i+1] instanceof File) {
                        File file = (File)obj[i+1];
                        // file에 있는 내용을 전송한다.
                        BufferedInputStream is = null;
                        try {
                            is = new BufferedInputStream(new FileInputStream(file));
                            byte[] fileBuffer = new byte[1024 * 8]; // 8k
                            int len = -1;
                            while ( (len = is.read(fileBuffer)) != -1) {
                                out.write(fileBuffer, 0, len);
                            }
                        } finally {
                            if (is != null) try { is.close(); } catch(IOException ex) {}
                        }
                    } else if ( obj[i+1] instanceof MultipartFile) {
                     MultipartFile file = (MultipartFile)obj[i+1];
                        // MultipartFile 있는 내용을 전송한다.
                        BufferedInputStream is = null;
                        try {
                            is = new BufferedInputStream(file.getInputStream());
                            byte[] fileBuffer = new byte[1024 * 8]; // 8k
                            int len = -1;
                            while ( (len = is.read(fileBuffer)) != -1) {
                                out.write(fileBuffer, 0, len);
                            }
                        } finally {
                            if (is != null) try { is.close(); } catch(IOException ex) {}
                        }
                    }
                    out.write(newLineBytes);
                } // 파일 데이터의 전송 블럭 끝
                if ( i + 2 == obj.length ) {
                    // 마지막 Delimeter 전송
                    out.write(twoDashBytes);
                    out.write(delimeterBytes);
                    out.write(twoDashBytes);
                    out.write(newLineBytes);
                }
            } // for 루프의 끝

            out.flush();
        } finally {
            if (out != null) out.close();
        }

        this.responseCode   = conn.getResponseCode();
        this.responseMessage  = conn.getResponseMessage();

        for (int i=0; ; i++) {
            String headerName  = conn.getHeaderFieldKey(i);
            String headerValue  = conn.getHeaderField(i);

            if (headerName == null && headerValue == null) {
                // No more headers
                break;
            }
            if (headerName == null) {
                // The header value contains the server's HTTP version
             break;
            }
        }

        return conn.getInputStream();
    }

    /**
     * 응답 코드를 얻는다.
     * @return
     */
    public int getResponseCode()
    {
     return this.responseCode;
    }
    /**
     * 응답 메시지를 얻는다.
     * @return
     */
    public String getResponseMessage()
    {
     return this.responseMessage;
    }


    /**
     * Response Stream을 읽어 String으로 리턴한다.
     * @param is
     * @return
     */
    public static String readResponseToString(InputStream is, String encoding)
    {  
     if ( encoding == null || encoding.equals("") ) {
      encoding = "UTF-8";
     }

     StringWriter  out  = null;
  BufferedReader  br   = null;
  String response = "";
  try {  

   br = new BufferedReader(new InputStreamReader(is, encoding));
   out = new StringWriter();

   String temp;
   while ((temp = br.readLine()) != null) {
    out.write(temp+CRLF);
   }
   br.close();
   response = out.toString().trim();
   out.close();
   is.close();
  } catch (Exception e) {
   e.printStackTrace();
  }
     finally {
   try{
    if (out != null ) { out.close(); }
    if (br != null ) { br.close(); }
    if (is != null ) { is.close(); }
   } catch (Exception e){}
     }

  return response;
    }

    /**
     * 지정한 ArrayList에 저장되어 있는 파라미터&값 목록을
     * application/x-www-form-urlencoded MIME에 맞춰서 인코딩한다.
     * 파라미터의 값의 타입이 File일 경우에는 그 파라미터를 무시하고
     * 다음 파라미터를 처리한다.
     *
     * @param parameters 파라미터 이름과 파라미터 값을 저장하고 있는 객체
     * @return 인코딩된 String
     */
    protected static String encodeString(ArrayList<Object> parameters) throws Exception {
        StringBuffer sb = new StringBuffer(256);

        Object[] obj = new Object[parameters.size()];
        parameters.toArray(obj);

        for (int i = 0 ; i < obj.length ; i += 2) {
            if ( obj[i+1] instanceof File || obj[i+1] instanceof NullFile ) continue;

            sb.append(URLEncoder.encode(((String)obj[i]), "UTF-8"));
            sb.append('=');
            sb.append(URLEncoder.encode(((String)obj[i+1]), "UTF-8"));

            if (i + 2 < obj.length) sb.append('&');
        }

        return sb.toString();
    }

    /**
     * multipart/form-data 로 데이터를 전송할 때 사용되는
     * 딜리미터를 생성한다.
     * <p>
     * 임의로 생성하지 않고 매번 같은 딜리미터를 생성한다.
     */
    protected static String makeDelimeter()
    {
        return "---------------------------7d115d2a20060c";
    }

    /**
     * 전송할 파일을 지정하지 않은 경우에 사용되는 클래스
     */
    protected class NullFile {
        NullFile() {
        }
        public String toString() {
            return "";
        }
    }

}


```



사용방법은 다음과 같습니다.
```aidl

 public static Map postForFile(String url, Map param, File file) {
  HttpRequest httpRequest = new HttpRequest();
  Iterator iterator = param.entrySet().iterator();
  while (iterator.hasNext()) {
   Entry entry = (Entry) iterator.next();
   httpRequest.addParameter((String)entry.getKey(), entry.getValue());
  }
  httpRequest.addFile(FILE_ID, file);

  InputStream is = null;
  BufferedReader br = null;
  Map<String, Object> result = new HashMap<String, Object>();
  StringBuffer json = new StringBuffer();

  try {
   is = httpRequest.sendMultipartPost();
   br = new BufferedReader(new InputStreamReader(is));
      String jsonString = "";

      while ((jsonString = br.readLine()) != null) {
       json.append(jsonString);
   }
  } catch (IOException e) {
   e.printStackTrace();
  }
//     JSONObject paramJson = (JSONObject) JSONSerializer.toJSON( json.toString() );
     JSONObject paramJson = (JSONObject) JSONObject.fromObject( json.toString() );

     String errorMessage = (String) paramJson.get(ERROR_MESSAGE);
     String errorCode = (String) paramJson.get(ERROR_CODE);


     if (!SUCCESS_CODE.equals(errorCode)) {
      logger.debug("ErrorCode :::::: " + errorCode);
      logger.debug("ErrorMessage :::::: " + errorMessage);

      result.put("errorMessage", errorMessage);
      result.put("errorCode", errorCode);
     }

  return result;
 }

```
