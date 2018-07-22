function requestFullScreen(element){
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {
    let wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    };
  };
};

// create canvas
var canvas = document.createElement("DIV");
canvas.id = "global-canvas";
canvas.style.display = "none";
canvas.style.backgroundColor = "#FFF"
canvas.style.borderStyle = "none";
canvas.style.width = "100px";
canvas.style.height = "100px";
canvas.OnShow = null;
canvas.OnHide = null;
canvas.fullscreen = function(){
  requestFullScreen(canvas);
};

function onFullscreenChange(){
  var fullscreen = document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement
  if (fullscreen !== null) {
    if (fullscreen) {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        if (canvas.OnShow !== null)(canvas.OnShow(canvas));
    } else {
        canvas.style.display = "none";
        canvas.style.width = "100px";
        canvas.style.height = "100px";
        if (canvas.OnHide !== null)(canvas.OnHide(canvas));
    };
  };
};

if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', onFullscreenChange, true);
    document.addEventListener('mozfullscreenchange', onFullscreenChange, true);
    document.addEventListener('fullscreenchange', onFullscreenChange, true);
    document.addEventListener('MSFullscreenChange', onFullscreenChange, true);
} else {
  throw new Error("Sorry, this app does not support this browser.");
};

export { canvas };