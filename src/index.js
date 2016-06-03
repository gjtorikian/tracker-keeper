function iframeRef(frameRef) {
  return frameRef.contentWindow
      ? frameRef.contentWindow.document
      : frameRef.contentDocument;
}

function pleaseDoTrack() {
  return navigator.doNotTrack != 1
}

export function initialize() {
  if (pleaseDoTrack()) {
    return;
  }
  const BANNED_LIST = [/youtube.com/];

  let iFrames = window.frames;
  for (let i = 0; i < iFrames.length; i++) {
    let iFrame = iFrames[i].frameElement;
    BANNED_LIST.forEach(function(domain) {
      if (domain.test(iFrame.src)) {
        iFrames[i].stop();

        let head = iframeRef(iFrame).getElementsByTagName("head")[0];
        let body = iframeRef(iFrame).getElementsByTagName("body")[0];

        let styleTag = document.createElement("style");
        styleTag.innerText = ".dnt-back{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(70,70,70,.7)}.dnt-warning{width:80%;position:absolute;left:50%;top:35%;margin:-10% 0 0 -40%;text-align:center}.dnt-warning:after{content:\"Sorry! Looks like this video does not respect DNT!\"}";
        head.appendChild(styleTag);

        // replace contents of iframe
        let contentWrapper = document.createElement("div");
        contentWrapper.setAttribute("class", "dnt-back");
        let warningDiv = document.createElement("div");
        warningDiv.setAttribute("class", "dnt-warning");

        contentWrapper.appendChild(warningDiv);
        body.appendChild(contentWrapper);
      }
    });
  }
};

initialize();
