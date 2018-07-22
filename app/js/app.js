var session = {trial: 0};

var table  = document.createElement('table');
table.style.width  = '100px';
table.style.border = '1px solid black';
var firtRow = table.insertRow();
appendCell(firtRow, 'Time');
appendCell(firtRow, 'Trial');
appendCell(firtRow, 'Event');

function appendCell(row, value){
  var cell = row.insertCell();
  cell.appendChild(document.createTextNode(value));
  cell.style.borderBottom= '1px solid black';
}

function createButton() {
  var btn = document.createElement("BUTTON");
  var t = document.createTextNode("CLICK ME");
  btn.appendChild(t);
  document.body.appendChild(btn);
};

function createParagraph(){
  var para = document.createElement("P");                       
  var t = document.createTextNode("Click the button to make a BUTTON element with text.");       
  para.appendChild(t);                                          
  document.body.appendChild(para); 
};

//function caUntitled projectnvasClick(){
//function getCursorPosition(canvas, event) {
//    var rect = canvas.getBoundingClientRect();
//    var x = event.clientX - rect.left;
//    var y = event.clientY - rect.top;
//    console.log("x: " + x + " y: " + y);
//}
//};

function createStimulus() {
  var canvas=document.createElement("CANVAS");
  canvas.id="Canvas";
  canvas.style.border="1px solid #d3d3d3";
  canvas.width=screen.width;
  canvas.height=screen.height;
  document.body.appendChild(canvas);

  var stimulus=document.createElement("IMG");
  stimulus.id="stimulus-1";
  stimulus.src="compman.gif"
  // stimulus.style.border="1px solid #d3d3d3";
  stimulus.width=107;
  stimulus.height=98;
  stimulus.onclick = function(){logEvent("click")};
  //context=canvas.getContext("2d");
  stimulus.style.left = "200px";
  stimulus.style.top = "200px";
  stimulus.style.position = "absolute";  
  document.body.appendChild(stimulus);
  
  //var context=canvas.getContext("2d");
  //var rect = context.rect(20,20,100,100);
  //context.stroke();
};

function requestFullScreen(element) {
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        };
    };
};

function logEvent(StringEvent){
  var time = window.performance.now();
  var trial = session.trial;
  var tableRow = table.insertRow();
  appendCell(tableRow, time);
  appendCell(tableRow, trial);
  appendCell(tableRow, StringEvent);
};

function init() {
  document.body=document.createElement("BODY");
  createParagraph();
  createStimulus();
  var btn = document.createElement("BUTTON");
  var t = document.createTextNode("Try it");
  var elem = document.getElementById('Canvas');
  btn.appendChild(t);
  btn.onclick=function() {requestFullScreen(document.body)};
  document.body.appendChild(btn);
  
  var btn = document.createElement("BUTTON");
  var t = document.createTextNode("Log");
  btn.appendChild(t);
  btn.onclick=function() {logEvent("button")};
  document.body.appendChild(btn);
  document.body.appendChild(table);
  debugger;
};