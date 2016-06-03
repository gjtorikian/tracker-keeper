export function initialize() {
  if(navigator.doNotTrack != 1) {
    return;
  }

  const BANNED_LIST = [/youtube.com/]
  let loaded = {}

  let iFrames = document.getElementsByTagName("iFrame");
  for (let i = 0; i < iFrames.length; i++) {
    iFrames[i].onload = function(event) {
      let iFrame = event.srcElement;
      BANNED_LIST.forEach(function(domain) {
        if (domain.test(iFrame.getAttribute("src"))) {
          // var newDiv = document.createElement('div');
          // newDiv.setAttribute("class", "iframe-dnt-container");
          iFrame.parentNode.setAttribute("class", "iframe-dnt-container");
          // newDiv.appendChild(iFrame);

          // let iFrameContents = iFrame.innerHTML;
          // let wrappediFrame = `<div class="iFrame-dnt-container">${iFrame}</div>`;
          // iFrame.innerHTML = wrappediFrame;
        }
      });
    }
  }
};

initialize();
