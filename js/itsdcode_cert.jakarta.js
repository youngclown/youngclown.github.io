var _base_server_t = "https://dev-jakarta-backend-api.letsdcode.com/users/cert",
    _base_server = "https://v2-api.letsdcode.com/users/cert", conf_site_cd = "A9PF1",
    conf_web_siteid = "J20120306171";

function itsdcode_request_cert(e, t) {
    cleanUp(), makeFormData(e).then(function (e) {
        var a = "Mobile" === isMobileOrDesktop();
        a && (document.getElementsByTagName("body")[0].appendChild(e), self.name = "auth_popup");
        if (!a) {
            var r = ",left=" + (screen.width / 2 - 205) + ", top=" + (screen.height / 2 - 250),
                o = window.open("", "auth_popup", "width=410, height=500, toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no" + r);
            window.auth_pop_ref = o, o.document.getElementsByTagName("body")[0].appendChild(e);
            const a = window.onmessage;
            window.onmessage = function (e) {
                window.onmessage = a, this.setTimeout(() => {
                    t(JSON.parse(e.data)), cleanUp()
                }, 50)
            }
        }
        e.submit()
    })
}

function cleanUp() {
    function e(e) {
        var t = document.getElementById(e);
        t && t.remove()
    }

    window.auth_pop_ref && (window.auth_pop_ref.close(), window.auth_pop_ref = null), document.getElementsByTagName("body")[0].style.display = "", e("kcp_cert"), e("form_auth")
}

function makeFormData(e) {
    var t = "t" === e.mid.charAt(0), a = t ? "TEST" + (new Date).getTime() : "NCODE" + (new Date).getTime(),
        r = t ? _base_server_t : _base_server, o = document.createElement("form");
    return o.name = "form_auth", o.method = "post", o.style = "display:none;", o.action = "https://cert.kcp.co.kr/kcp_cert/cert_view.jsp", createPostData = function (e, t, a) {
        var r = document.createElement("input");
        r.type = "hidden", r.name = e, r.value = t, r.id = a || e, o.appendChild(r)
    }, createPostData("site_cd", conf_site_cd), createPostData("req_tx", "cert"), createPostData("ordr_idxx", a), createPostData("user_name", ""), createPostData("year", ""), createPostData("month", ""), createPostData("day", ""), createPostData("sex_code", ""), createPostData("local_code", ""), createPostData("web_siteid_hashYN", ""), createPostData("web_siteid", conf_web_siteid), createPostData("cert_able_yn", ""), createPostData("cert_enc_use_ext", "Y"), createPostData("up_hash", ""), createPostData("kcp_cert_lib_ver", ""), createPostData("veri_up_hash", ""), createPostData("param_opt_1", e.user_id), createPostData("param_opt_3", e.m_redirect_url), "Mobile" === isMobileOrDesktop() ? (createPostData("kcp_cert_pass_use", "Y"), createPostData("kcp_cert_intent_use", "Y"), createPostData("Ret_URL", `${r}/resultCertByMobile`)) : createPostData("Ret_URL", `${r}/resultCertByWeb`), requestUpHash(a, e).then(function (e) {
        var t = e.split(":")[0], a = e.split(":")[1];
        return createPostData("up_hash", t), createPostData("veri_up_hash", t), createPostData("kcp_cert_lib_ver", a), o
    })
}

function requestUpHash(e, t) {
    var a = "t" === t.mid.charAt(0) ? _base_server_t : _base_server, r = {
        mid: t.mid,
        site_cd: conf_site_cd,
        ordr_idxx: e,
        web_siteid_hashYN: "",
        web_siteid: conf_web_siteid,
        cert_able_yn: "",
        user_id: t.user_id
    };
    return new Promise(function (e, t) {
        $.ajax({
            type: "post",
            url: `${a}/hash`,
            contentType: "application/json",
            data: JSON.stringify(r),
            error: function (e) {
                t(e)
            },
            success: function (t) {
                e(t)
            }
        })
    })
}

function isMobileOrDesktop() {
    var e = getMobileOperatingSystem();
    return "Windows Phone" !== e && "Android" !== e && "iOS" !== e ? "Desktop" : "Mobile"
}

function getMobileOperatingSystem() {
    var e = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(e)) return "Windows Phone";
    if (/android/i.test(e)) return "Android";
    if (/iPad|iPhone|iPod/.test(e) && !window.MSStream) return "iOS";
    let t = "Windows";
    return -1 !== navigator.appVersion.indexOf("Win") && (t = "Windows"), -1 !== navigator.appVersion.indexOf("Mac") && (t = "MacOS"), -1 !== navigator.appVersion.indexOf("X11") && (t = "UNIX"), -1 !== navigator.appVersion.indexOf("Linux") && (t = "Linux"), /Chrome/.test(e) ? t + " Chrome" : /Firefox/.test(e) ? t + " Firefox" : /Safari/.test(e) ? t + " Safari" : t + " IE"
}