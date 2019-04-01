---
layout: post
title: "ProxyApi 처리 방안 및 고민"
date: 2018-06-20 09:07:00 +0900
comments: true
---

강의 준비를 하느라 일일 커밋을 못하고 있는 상황이라,
작년 여름에 있었던 재미난 일을 적습니다.

전 연동 관련하여, 이미지 캐싱 기능을 사용하기 위해,
CDN 회사 중 한곳에게 이미지 캐싱을 위한 프록시 서버를 오청했습니다.

```
https://img.xxx.com/?src=이미지주소
```

형태로 요청하면, 해당 CDN 회사는 하루동안의 해당 이미지를 캐싱하는 것인데,
자체 개발하는 공수 및 서버 증설 비용보다, 프록시 서버를 두어 이용하는 것이 가격대비 높기 때문에 결정되었습니다.

```
http://zzzzz.com/images/upload/./repo/targetDir/p/AM/460x640/AMMP3WA9775A_118_01.png
```

특정 광고주 서버에서 위와같이 /./ 형태로 이미지를 수집하여, 노출시킬때,
이미지를 그냥 호출하면 자동으로 /./ 를 없애주면서 이미지가 정상적으로 떠야하는데,

```
https://img.xxx.com/?src=http://zzzzz.com/images/upload/./repo/targetDir/p/AM/460x640/AMMP3WA9775A_118_01.png
```

프록시 서버를 통해 요청했을 경우에는 엑박이 발생하여 담당자에게 문의해보았습니다.
담당자의 대답은,

```
URI 에 "./" 이 포함되어 요청되는 경우. 해당 client application (Web browser, web query, etc) 에서 "./" 을 제거하여 요청합니다.

즉, 서버측에서 제거해주는게 아닙니다. 그리고 param 에 포함된 값 "./"은 browser 에서 제거해주지 않습니다.

가능하다면 request 시 ./ 이 없는 param value 로 사용 해 주시길 바랍니다.
param value 에서 "./" 을 무조건 제거 해야 하는지도 확인 바랍니다.
```


클라이언트의 어플리케이션 문제랍니다. 이런걸 사용자 이슈라고 하지요.
우선 전화로 이야기를 드렸습니다.

해당 이미지를 보내주는 광고주가 상대경로로 이미지를 잡아서 제공해주는 것으로 보이니,
정상적인 상황이며, 이것은 브라우져의 어플리케이션 문제가 아니므로,

CDN 프록시 서버에서 대응해주셔야한다는 이야기를 반복했지만,

이야기가 안통했습니다.
테스트한 사람의 브라우져 문제고, 사용자 이슈이므로, 프록시 서버에서 대응 해줄 수 없으므로,
프록시 서버에 이미지를 보낼때 './' 를 제거해서 보내달라고 합니다.

---

개발자는 개발적인 이야기 말고는 언변에서 약하다는 것을 다시 한번 느끼며,
코딩을 시작했습니다.


```
public class ProxyApi extends HttpServlet {
	private static final long serialVersionUID = -1501736936092164738L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String imgUrl = request.getParameter("imgUrl");

		response.setContentType("image/jpeg");
		double len = 0;
		byte[] buffer = new byte[1024];
		BufferedOutputStream outs = null;
		InputStream inputStream = null;
		URL url = null;
		// out.flush(); // 미리 에러나 여러가지 상황 때문에 flush 시킨다.
		try {
			url = new URL(imgUrl); // 요청 url
			inputStream = url.openStream();
			outs = new BufferedOutputStream(response.getOutputStream());
			while ((len = inputStream.read(buffer)) != -1) {
				outs.write(buffer, 0, (int) len);
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outs != null)
				outs.close();
			if (inputStream != null)
				inputStream.close();
		}
	}
}
```

개발자는 말로 싸우면 안되는 것을 느낍니다.
쉽고 빠르게 서블릿 API를 만들어 개인서버에 뛰웠습니다.

그리고 문의글을 남겼습니다.

````
안녕하세요.
개발팀의 XXXX입니다.

제 개인서버에 단순히 이미지를 프록시하는 기능을 만들어 테스트 해보았습니다.

http://ttttt/test/ProxyApi?imgUrl=http://zzzzz.com/images/upload/./repo/targetDir/p/AF/460x640/AFMP3EB9882A_001_05.png

잘 뜹니다.

client application (Web browser, web query, etc) 에서 "./" 을 제거하는 것과 별개로,

단순히 ./ 는 상대경로로 해당 광고주의 같은 경로의 이미지를 가져오기 위해 사용된 것이므로,

/ : 루트
./ : 현재 위치
../ : 현재 위치의 상단 폴더

를 의미하여 해당 경로의 이미지를 가져오는 것으로 보입니다.

그러므로, 브라우져와는 상관없는 이슈로, 다시 한번 확인해주시기 바랍니다.

````
만약, 전화로 니가 맞네, 내가 맞네 서로 핑퐁하다가 하루를 보내기에 그때 당시 너무나 바쁘고 멘탈이 나갔기 때문에 오히려 빨리 처리해야겠다 싶어 개발을 하여 증명했던 것인데,
다른 이슈보다 더 빨리 클리어했던 걸로 기억이 납니다.

```
안녕하세요.

해당건은 "./" 에 대한 문제로 보였으나 실제 zzzzz.com 에서 Request 에 포함되는 일부 Header 에 대하여 필터링 하고 있습니다.

CDN 에서 External Origin 으로 보내는 일부 Request custom header 가 해당 hfashionmall 에서 필터링 되고 있었습니다.

필터되는 Header 모두 Origin 요청시 제거되도록 하였으며, 모두 정상 응답 되고 있습니다.

혼선을 드려 죄송합니다.

감사합니다.
```

지금도, 가끔가다가 나는 모르겠고, 어찌되었건 니네 문제니까 해결해라는 식의 담당자를 만나게 되어 그대로 이슈가 허공에 증발하는 경우가 있기 때문에, 어찌되었건 도메인 주도에 의한 개발일이라는 것은 참 힘든 것을 느낍니다.
