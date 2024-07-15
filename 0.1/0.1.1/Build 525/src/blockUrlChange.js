		!(function () {
  	var x = history.pushState;
  	history.pushState = function (data, unused, url) {
   	   if(url.startsWith('/editor/'))return;
   	 x.apply(this, [data, unused, url]);
  	};
 	 var y = history.replaceState;
  	history.replaceState = function (data, unused, url) {
  	    if(url.startsWith('/editor/'))return;
   	 y.apply(this, [data, unused, url]);
 	 };
	})();