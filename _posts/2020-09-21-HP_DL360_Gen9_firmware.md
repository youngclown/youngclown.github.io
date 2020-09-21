---
layout: post
title: "HP DL360 Gen9 firmware"
comments: true
---

HP DL360 Gen9 서버군에 컨트롤러 펌웨어 버전 버그
---

해당 버그 증상은 서버 강제 재부팅이 발생될수 있는 버그입니다.

온라인 펌웨어 업데이트 2.60에서 발생.

작업 내역 : 온라인 펌웨어 업데이트 2.60 -> 2.72 후 서버 재부팅하여 적용

```
에러 로그 :
LOG: Option ROM POST Error: 1719-Slot 0 Drive Array - A controller failure event occurred prior to this power-up. (Previous lock up code = 0x12) Action: Install the latest controller firmware. If the problem persists, replace the controller.
```

서버 강제로 재시작된 서버에서 발생한 에러로그입니다.


[참고 URL](https://support.hpe.com/hpesc/public/docDisplay?docId=emr_na-a00060570en_us)

2.64 이상 업데이트 이후에도, 2.74로 업데이트하라는 글이 있는데,
(Update System ROM to version 2.74 if this has not already been done.)

우선 2.72로 업데이트 한 후, 문제가 발생시 추가 업데이트를 진행할 예정입니다.   

```
Scenario 1:
The server experiences an unexpected reboot or shutdown with no Integrated Management Log entries present to indicate that a failure occurred.

Scenario 2:
The server experiences an unexpected reboot or shutdown, and an error similar to the following MAY appear during Power-On Self-Test (POST) on the next system boot, and in the Integrated Management Log:

Option ROM POST Error: 1719-Slot 0 Drive Array - A controller failure event occurred prior to this power-up. (Previous lock up code = 0x12) Action: Install the latest controller firmware. If the problem persists, replace the controller.

The important item to note in the error message above is the lockup code 0x12. Other lockup codes do not apply to this advisory. The slot number in the error message may vary.

Scenario 3:
The server experiences an unexpected reboot or shutdown, and the Integrated Management Log has an entry similar to the one below:

Uncorrectable Machine Check Exception (Board 0, Processor 2, APIC ID 0x00000040, Bank 0x00000004, Status 0xBA000000'73000402, Address 0x00000000'00000000, Misc 0x00000000'00000000)

The following items in the UMCE entry above must be matched:
-Bank 0x00000004
-Status 0xBA000000'73000402'

Other Uncorrectable Machine Check Exception entries that occur at the same time MAY be present in the Integrated Management Log.

The following error MAY or MAY NOT be present during POST or in the Integrated Management Log:

Option ROM POST Error: 1719-Slot 0 Drive Array - A controller failure event occurred prior to this power-up. (Previous lock up code = 0x12) Action: Install the latest controller firmware. If the problem persists, replace the controller.

The important item to note in the error message above is the lockup code 0x12. Other lockup codes do not apply to this advisory. The slot number in the error message may vary.

SCOPE
Any of the ProLiant servers listed in the "Products" section and that are configured with either of the following processor models:

- E5-2600 v4 Series Intel Processor

- E5-4600 v4 Series Intel Processor


RESOLUTION
Important: Although error messages may be present indicating a Smart Array controller error, the Smart Array controller is not defective.

A previous version of this advisory indicated System ROM 2.64 or later has a microcode patch to address this problem. HPE is modifying our guidance to update affected servers to System ROM version 2.74, which includes the Intel microcode to address this issue and should be applied to any servers experiencing this failure. Intel has documented this issue as errata BDF103 in the Intel Xeon E5-2600 v4 Processor Product Family Specification Update Revision 20.0.

The System ROM can be downloaded from the HPE Support Center at https://support.hpe.com/hpesc/public/home In the search field, enter the name of the server platform. In the dropdown list of search results, select "Drivers and Software" for the item in the dropdown list that matches the search term. On the Drivers and Software page, use the filter options on the left to more quickly find the desired System ROM component. Entitlement is required to download System ROM updates.

Should this problem recur even after system ROM version 2.64 and later is applied, follow the steps below.

1. Update System ROM to version 2.74 if this has not already been done.

2. Reboot the server.

3. During POST, press F9 to boot into the System Utilities menu.

4. In the System Utilities menu, navigate to "System Configuration --> BIOS/Platform Configuration (RBSU) --> Advanced Options --> Uncore Frequency Limiting".

5. Select "Enabled" and press "Enter".

6. Press F10 to save the change, then press "Y" when prompted to accept the change.

7.Press the "ESC" key repeatedly to navigate back to the top menu level. There are two options: Exit and Resume System Boot, or "reboot the system." Select "Reboot the System" and exit System Utilities, then press "Enter" when prompted to exit and reboot the server.

8. Allow the server to reboot and boot the OS.
```

영향받는 하드웨어 플랫폼 :
```
HPE Synergy 480 Gen9 Compute Module, HPE Synergy 660 Gen9 Compute Module, HPE ProLiant XL270d Gen9 Server, HPE ProLiant XL260a Gen9 Server, HPE ProLiant XL730f Gen9 Server, HPE ProLiant DL180 Gen9 Server, HPE ProLiant DL360 Gen9 Server, HPE ProLiant BL460c Gen9 Server Blade, HPE ProLiant DL380 Gen9 Server, HPE ProLiant ML350 Gen9 Server, HPE ProLiant XL230a Gen9 Server, HPE ProLiant XL250a Gen9 Server, HPE ConvergedSystem 700x v1.1 VMware Kit, HPE ProLiant XL740f Gen9 Server, HPE ProLiant XL750f Gen9 Server, HPE ProLiant DL120 Gen9 Server, HPE ProLiant ML150 Gen9 Server, HPE ConvergedSystem 700 Virtualization 2.0 VMware Kit, HPE ProLiant ML110 Gen9 Server, HPE ProLiant XL170r Gen9 Server, HPE ProLiant XL190r Gen9 Server, HPE ProLiant WS460c Gen9 Graphics Server Blade, HPE ProLiant BL660c Gen9 Server, HPE Apollo 4200 Gen9 Server, HPE ProLiant XL450 Gen9 Server
Operating Systems Affected: Not Applicable
```
