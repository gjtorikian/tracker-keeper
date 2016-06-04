(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function iframeRef(frameRef) {
    return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument;
  }

  function pleaseDoTrack() {
    return navigator.doNotTrack != 1;
  }

  function initialize() {
    if (pleaseDoTrack()) {
      return;
    }
    var BANNED_LIST = [/youtube.com/];

    var iFrames = window.frames;

    var _loop = function _loop(i) {
      var iFrame = iFrames[i].frameElement;
      BANNED_LIST.forEach(function (domain) {
        if (domain.test(iFrame.src)) {
          iFrames[i].stop();

          var head = iframeRef(iFrame).getElementsByTagName("head")[0];
          var body = iframeRef(iFrame).getElementsByTagName("body")[0];

          var styleTag = document.createElement("style");
          styleTag.innerText = ".dnt-back{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(70,70,70,.7)}.dnt-warning{width:80%;position:absolute;left:50%;top:35%;margin:-10% 0 0 -40%;text-align:center}.dnt-warning:after{content:\"Sorry! Looks like this video does not respect DNT!\"}";
          head.appendChild(styleTag);

          // replace contents of iframe
          var contentWrapper = document.createElement("div");
          contentWrapper.setAttribute("class", "dnt-back");
          var warningDiv = document.createElement("div");
          warningDiv.setAttribute("class", "dnt-warning");

          contentWrapper.appendChild(warningDiv);
          body.appendChild(contentWrapper);
        }
      });
    };

    for (var i = 0; i < iFrames.length; i++) {
      _loop(i);
    }
  };

  initialize();
});