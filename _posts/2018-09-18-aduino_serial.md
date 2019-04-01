---
layout: post
title: "시리얼통신으로 자바와 아두이노 연동하기"
comments: true
---

개인적인 취미로 숫자 키보드를 만들고 싶은데,  
가지고 있는 아두이노는 UNO R3 와 UNO CH430 이 두기종.  

아두이노 키보드를 만들기위한 미니 아두이노도 구매했는데 분실해버리는 바람에,  
현재 2개의 기종으로 숫자 키보드를 만들려고 합니다.  

[참고주소](http://mitchtech.net/arduino-usb-hid-keyboard/)  
위의 참고주소를 가면, 친절하게 배선도와, 아두이노 소스코딩을 제공해줍니다.  

다만 문제는 제가 가지고 있는 기종이 키보드와 같은 하드웨어 인식이 안되는 R3와 CH430 인게 문제였네요.  

방법은,  
[참고주소1](https://www.slideshare.net/dkserver/presentation1-40234926)  
[참고주소2](https://splatspace.org/2015/04/using-an-arduino-as-an-hid/)  
DFU (Device Firmware Update)을 처리해야합니다.  

CH430은 모르겠지만 R3는 저렇게 해서 가능하다고 하여  
jumper 로 앞단자를 가리고,  
순정 아두이노 펌웨어와, 아두이노 키보드 펌웨어 이렇게 2개를 처리해야한다고 하네요.  

```
Arduino-keyboard-0.3.hex  
Arduino-usbserial-uno.hex  
```
펌웨어하는 방법도, 쉽지 않은데, 벽돌이 되면....  
게다가 Arduino-keyboard-0.3.hex 적용하면,  
아두이노 코딩 업로드가 안된다는 글까지 보게 되었습니다.  

그래서, 꼭 내가 하드웨어로 키보드 인식을 해서 쓸 것인지에 대한 고찰과 함께,  
결론이 그냥 나는 텐키리스 키보드를 사면,  

숫자키가 허전해서, 3D 프린터로 숫자 키보드를 하나 만들고 싶고,  
이미 가지고 있는 우노들을 이용하고 싶은 것뿐이더군요.  

그래서 인숙한 자바 Serial 통신방법을 찾게 되었습니다.
[참고주소](https://kocoafab.cc/tutorial/view/596)  

참고 주소에서는  
TxRx라이브러리를 받고난 뒤 압축을 풀고   
RXTXcomm.jar는 %JAVAHOME%lib에 넣어주시고   
rxtxSerial.dll는 %JAVAHOME%bin에 넣으라고 가이드를 주었는데,

저는 귀찮아서 java는 바로 프로젝트에서 import 받아서 처리했고,
rxtxSerial.dll 파일을 windows에 system32 폴더에 넣었습니다.

아두이노는 핀을 총 5개 사용했고 (연습삼아서... 나중에 매트릭스 구조로 다시 짜야함..)
```
#include <Boards.h>
#include <FirmataConstants.h>
#include <FirmataDefines.h>
#include <FirmataMarshaller.h>
#include <FirmataParser.h>

#define PIN_NUM3 3
#define PIN_NUM4 4
#define PIN_NUM5 5
#define PIN_NUM6 6
#define PIN_NUM7 7

int state = 1;

void setup()
{
  Serial.begin(9600);
  pinMode(PIN_NUM3, INPUT);
  pinMode(PIN_NUM4, INPUT);
  pinMode(PIN_NUM5, INPUT);
  pinMode(PIN_NUM6, INPUT);
  pinMode(PIN_NUM7, INPUT);

  Serial.write(INPUT); // Send keypress
  // enable internal pull-ups
  digitalWrite(PIN_NUM3, 1);
  digitalWrite(PIN_NUM4, 1);
  digitalWrite(PIN_NUM5, 1);
  digitalWrite(PIN_NUM6, 1);
  digitalWrite(PIN_NUM7, 1);

  delay(200);
}

void loop()
{
  state = digitalRead(PIN_NUM3);
  if (state != 1) {
    Serial.write('a'); // Send keypress
    delay(200);
  }

  state = digitalRead(PIN_NUM4);
  if (state != 1) {
    Serial.write('b'); // Send keypress
    delay(200);
  }

  state = digitalRead(PIN_NUM5);
  if (state != 1) {
    Serial.write('c'); // Send keypress
    delay(200);
  }

  state = digitalRead(PIN_NUM6);
  if (state != 1) {
    Serial.write('d'); // Send keypress
    delay(200);
  }

  state = digitalRead(PIN_NUM7);
  if (state != 1) {
    Serial.write('e'); // Send keypress
    delay(200);
  }
}
```

해당 값을 받아 처리하는 자바 클래스도 간단하게 구현하였습니다.

```
package aduino;

import gnu.io.CommPort;
import gnu.io.CommPortIdentifier;
import gnu.io.SerialPort;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class Serial
{
    public Serial()
    {
        super();
    }

    void connect ( String portName ) throws Exception
    {
        CommPortIdentifier portIdentifier = CommPortIdentifier.getPortIdentifier(portName);
        if ( portIdentifier.isCurrentlyOwned() )
        {
            System.out.println("Error: Port is currently in use");
        }
        else
        {
            //클래스 이름을 식별자로 사용하여 포트 오픈
            CommPort commPort = portIdentifier.open(this.getClass().getName(),2000);

            if ( commPort instanceof SerialPort )
            {
                //포트 설정(통신속도 설정. 기본 9600으로 사용)
                SerialPort serialPort = (SerialPort) commPort;
                serialPort.setSerialPortParams(9600,SerialPort.DATABITS_8,SerialPort.STOPBITS_1,SerialPort.PARITY_NONE);

                //Input,OutputStream 버퍼 생성 후 오픈
                InputStream in = serialPort.getInputStream();
                OutputStream out = serialPort.getOutputStream();

                 //읽기, 쓰기 쓰레드 작동
                (new Thread(new SerialReader(in))).start();
                (new Thread(new SerialWriter(out))).start();

            }
            else
            {
                System.out.println("Error: Only serial ports are handled by this example.");
            }
        }     
    }

    /** */
    //데이터 수신
    public static class SerialReader implements Runnable
    {
        InputStream in;

        public SerialReader ( InputStream in )
        {
            this.in = in;
        }

        public void run ()
        {
            byte[] buffer = new byte[1024];
            int len = -1;
            try
            {
                while ( ( len = this.in.read(buffer)) > -1 )
                {
                	String temp = new String(buffer,0,len);
                    if ("a".equals(temp)) {
                    	Process oProcess = new ProcessBuilder("notepad.exe").start();
                    } else if ("b".equals(temp)) {
                    	Process oProcess = new ProcessBuilder("calc.exe").start();
                    } else if ("c".equals(temp)) {
                    	Process oProcess = new ProcessBuilder("control").start();
                    } else if ("d".equals(temp)) {
                    	Process oProcess = new ProcessBuilder("D:\\workset\\eclipse-jee-photon-R-win32-x86_64\\eclipse\\eclipse.exe").start();
                    } else if ("e".equals(temp)) {
                    	Process oProcess = new ProcessBuilder("C:\\Program Files\\JetBrains\\IntelliJ IDEA 2018.2.3\\bin\\idea64.exe").start();
                    }
                }
            }
            catch ( IOException e )
            {
                e.printStackTrace();
            }            
        }
    }

    /** */
    //데이터 송신
    public static class SerialWriter implements Runnable
    {
        OutputStream out;

        public SerialWriter ( OutputStream out )
        {
            this.out = out;
        }

        public void run ()
        {
            try
            {
                int c = 0;
                while ( ( c = System.in.read()) > -1 )
                {
                    this.out.write(c);
                }                
            }
            catch ( IOException e )
            {
                e.printStackTrace();
            }            
        }
    }

    public static void main ( String[] args )
    {
        try
        {
            (new Serial()).connect("COM4"); //입력한 포트로 연결
        }
        catch ( Exception e )
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
```

변경되는 port 에 대한 변경값 입력하는 방법을 args로 받아 처리하면서,  
별도의 jar로 실행하는 방법만 고민하면,
텐키리스 사용하면서 숫자 키보드를 만들 수 있을 거 같습니다.
