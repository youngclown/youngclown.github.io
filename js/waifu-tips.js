/*
 * https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02
 * https://www.fghrsh.net/post/123.html
 */

function loadWidget(waifuPath, apiPath) {
	localStorage.removeItem("waifu-display");
	sessionStorage.removeItem("waifu-text");
	$("body").append(`<div id="waifu">
			<div id="waifu-tips"></div>
			<canvas id="live2d" width="300" height="300"></canvas>
			<div id="waifu-tool">
				<span class="fa fa-lg fa-comment"></span>
				<span class="fa fa-lg fa-paper-plane"></span>
				<span class="fa fa-lg fa-user-circle"></span>
				<span class="fa fa-lg fa-street-view"></span>
				<span class="fa fa-lg fa-camera-retro"></span>
				<span class="fa fa-lg fa-info-circle"></span>
				<span class="fa fa-lg fa-times"></span>
			</div>
		</div>`);
	$("#waifu").show().animate({ bottom: 0 }, 3000);

	function registerEventListener() {
		$("#waifu-tool .fa-comment").click(showHitokoto);
		$("#waifu-tool .fa-paper-plane").click(() => {
			if (window.Asteroids) {
				if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
				window.ASTEROIDSPLAYERS.push(new Asteroids());
			} else {
				$.ajax({
					url: "https://cdn.jsdelivr.net/gh/GalaxyMimi/CDN/asteroids.js",
					dataType: "script",
					cache: true
				});
			}
		});
		$("#waifu-tool .fa-user-circle").click(loadOtherModel);
		$("#waifu-tool .fa-street-view").click(loadRandModel);
		$("#waifu-tool .fa-camera-retro").click(() => {
			showMessage("너무 귀여워요?", 6000, 9);
			Live2D.captureName = "photo.png";
			Live2D.captureFrame = true;
		});
		$("#waifu-tool .fa-info-circle").click(() => {
			open("https://github.com/stevenjoezhang/live2d-widget");
		});
		$("#waifu-tool .fa-times").click(() => {
			localStorage.setItem("waifu-display", new Date().getTime());
			showMessage("중요한 사람들과 언젠가 다시 만나길 바랍니다.", 2000, 11);
			$("#waifu").animate({ bottom: -500 }, 3000, () => {
				$("#waifu").hide();
				$("#waifu-toggle").show().animate({ "margin-left": -50 }, 1000);
			});
		});
		var re = /x/;
		console.log(re);
		re.toString = () => {
			showMessage("하하, 당신은 콘솔을 열었습니다. 내 작은 비밀을보고 싶습니까?", 6000, 9);
			return "";
		};
		$(document).on("copy", () => {
			showMessage("당신은 무엇을 복사 했습니까?", 6000, 9);
		});
		$(document).on("visibilitychange", () => {
			if (!document.hidden) showMessage("와, 마침내 돌아 왔어 ~", 6000, 9);
		});
	}
	registerEventListener();

	function welcomeMessage() {
		var SiteIndexUrl = location.port ? `${location.protocol}//${location.hostname}:${location.port}/` : `${location.protocol}//${location.hostname}/`, text; //自动获取主页
		if (location.href == SiteIndexUrl) { //如果是主页
			var now = new Date().getHours();
			if (now > 5 && now <= 7) text = "좋은 아침입니다! 낮이 아침입니다. 좋은 날이 시작됩니다.";
			else if (now > 7 && now <= 11) text = "좋은 아침입니다! 잘 지내십시오, 오랫동안 앉아 있지 말고 걸어 다니십시오!";
			else if (now > 11 && now <= 14) text = "오늘, 아침 식사, 점심 시간입니다!";
			else if (now > 14 && now <= 17) text = "오후에 지루하기 쉽기 때문에 오늘날 스포츠의 목표가 달성 되었습니까?";
			else if (now > 17 && now <= 19) text = "늦었습니다! 창문 밖의 일몰 풍경은 아름답지만 가장 아름답지만 일몰은 빨간색입니다 ~";
			else if (now > 19 && now <= 21) text = "좋은 저녁입니다, 오늘 어떻게 지내세요?";
			else if (now > 21 && now <= 23) text = ["너무 늦었어요, 빨리 쉬세요, 안녕히 주무세요 ~", "심야에 눈을 사랑하세요!"];
			else text = "밤 올빼미입니다. 너무 늦게 자지 마십시오. 내일 올까요?";
		} else {
			text = `<span style="color:#0099cc;">『${document.title.split(" - ")[0]}』</span> 에 방문해주셔서 감사합니다.`;
		}
		showMessage(text, 7000, 8);
	}
	welcomeMessage();
	//检测用户活动状态，并在空闲时定时显示一言
	var userAction = false,
		hitokotoTimer = null,
		messageTimer = null,
		messageArray = ["나는 당신을 오랫동안 보지 못했고, 나의 시대는 너무 빨리 지나갔습니다 ... ","큰 나쁜 놈들! 얼마나 오랫동안 사람들을 만지지 않았습니까? ", "오, 저와 놀리세요!" ,"작은 주먹으로 가슴을 망치세요!"];
	if ($(".fa-share-alt").is(":hidden")) messageArray.push("소규모 가족을 Adblock 허용 목록에 추가하십시오!");
	$(document).mousemove(() => {
		userAction = true;
	}).keydown(() => {
		userAction = true;
	});
	setInterval(() => {
		if (!userAction) {
			if (!hitokotoTimer) hitokotoTimer = setInterval(showHitokoto, 25000);
		} else {
			userAction = false;
			clearInterval(hitokotoTimer);
			hitokotoTimer = null;
		}
	}, 1000);

	function showHitokoto() {
		//增加 hitokoto.cn 的 API
		if (Math.random() < 0.6 && messageArray.length > 0) showMessage(messageArray[Math.floor(Math.random() * messageArray.length)], 6000, 9);
		else $.getJSON("https://v1.hitokoto.cn", function(result) {
				var text = `이 문장은 <span style="color:#0099cc;">『${result.from}』</span>，에서 왔으며 <span style="color:#0099cc;">${result.creator}</span> `;
			showMessage(result.hitokoto, 6000, 9);
			setTimeout(() => {
				showMessage(text, 4000, 9);
			}, 6000);
		});
	}

	function showMessage(text, timeout, priority) {
		if (!text) return;
		if (!sessionStorage.getItem("waifu-text") || sessionStorage.getItem("waifu-text") <= priority) {
			if (messageTimer) {
				clearTimeout(messageTimer);
				messageTimer = null;
			}
			if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length)];
			sessionStorage.setItem("waifu-text", priority);
			$("#waifu-tips").stop().html(text).fadeTo(200, 1);
			messageTimer = setTimeout(() => {
				sessionStorage.removeItem("waifu-text");
				$("#waifu-tips").fadeTo(1000, 0);
			}, timeout);
		}
	}

	function initModel() {
		var modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (modelId == null) {
			//首次访问加载 指定模型 的 指定材质
			var modelId = 1, //模型 ID
				modelTexturesId = 53; //材质 ID
		}
		loadModel(modelId, modelTexturesId);
		$.getJSON(waifuPath, function(result) {
			$.each(result.mouseover, function(index, tips) {
				$(document).on("mouseover", tips.selector, function() {
					var text = Array.isArray(tips.text) ? tips.text[Math.floor(Math.random() * tips.text.length)] : tips.text;
					text = text.replace("{text}", $(this).text());
					showMessage(text, 4000, 8);
				});
			});
			$.each(result.click, function(index, tips) {
				$(document).on("click", tips.selector, function() {
					var text = Array.isArray(tips.text) ? tips.text[Math.floor(Math.random() * tips.text.length)] : tips.text;
					text = text.replace("{text}", $(this).text());
					showMessage(text, 4000, 8);
				});
			});
			$.each(result.seasons, function(index, tips) {
				var now = new Date(),
					after = tips.date.split("-")[0],
					before = tips.date.split("-")[1] || after;
				if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
					var text = Array.isArray(tips.text) ? tips.text[Math.floor(Math.random() * tips.text.length)] : tips.text;
					text = text.replace("{year}", now.getFullYear());
					//showMessage(text, 7000, true);
					messageArray.push(text);
				}
			});
		});
	}
	initModel();

	function loadModel(modelId, modelTexturesId) {
		localStorage.setItem("modelId", modelId);
		if (modelTexturesId === undefined) modelTexturesId = 0;
		localStorage.setItem("modelTexturesId", modelTexturesId);
		loadlive2d("live2d", `${apiPath}/get/?id=${modelId}-${modelTexturesId}`, console.log(`Live2D ${modelId}-${modelTexturesId} 로드 완료`));
	}

	function loadRandModel() {
		var modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
			//可选 "rand"(随机), "switch"(顺序)
		$.ajax({
			cache: false,
			url: `${apiPath}/rand_textures/?id=${modelId}-${modelTexturesId}`,
			dataType: "json",
			success: function(result) {
				if (result.textures["id"] == 1 && (modelTexturesId == 1 || modelTexturesId == 0)) showMessage("아직 다른 옷이 없습니다!", 4000, 10);
				else showMessage("내 새 옷이 좋아 보여?", 4000, 10);
				loadModel(modelId, result.textures["id"]);
			}
		});
	}

	function loadOtherModel() {
		var modelId = localStorage.getItem("modelId");
		$.ajax({
			cache: false,
			url: `${apiPath}/switch/?id=${modelId}`,
			dataType: "json",
			success: function(result) {
				loadModel(result.model["id"]);
				showMessage(result.model["message"], 4000, 10);
			}
		});
	}
}

function initWidget(waifuPath = "/waifu-tips.json", apiPath = "") {
	if (screen.width <= 768) return;
	$("body").append(`<div id="waifu-toggle" style="margin-left: -100px;">
			<span>-_-</span>
		</div>`);
	$("#waifu-toggle").hover(() => {
		$("#waifu-toggle").animate({ "margin-left": -30 }, 500);
	}, () => {
		$("#waifu-toggle").animate({ "margin-left": -50 }, 500);
	}).click(() => {
		$("#waifu-toggle").animate({ "margin-left": -100 }, 1000, () => {
			$("#waifu-toggle").hide();
		});
		if ($("#waifu-toggle").attr("first-time")) {
			loadWidget(waifuPath, apiPath);
			$("#waifu-toggle").attr("first-time", false);
		} else {
			localStorage.removeItem("waifu-display");
			$("#waifu").show().animate({ bottom: 0 }, 3000);
		}
	});
	if (localStorage.getItem("waifu-display") && new Date().getTime() - localStorage.getItem("waifu-display") <= 86400000) {
		$("#waifu-toggle").attr("first-time", true).css({ "margin-left": -50 });
	} else {
		loadWidget(waifuPath, apiPath);
	}
}
