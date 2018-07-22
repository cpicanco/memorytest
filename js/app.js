import { manager } from './manager.js';
import { bloc } from './blocs.js';

var TExperiment = {
  name : 'experiment-container',
  stimuli : [],
  begin : function(){
    bloc.begin();
  },
  
  create : function(){
    var container = function (){
      return document.getElementById(this.name);
    };
    Object.defineProperty(this, 'container', { get: container});
    var instance = this;
    this.bloc = bloc;
    this.manager = manager;
    this.canvas = manager.canvas;
    this.container.appendChild(this.canvas);
    window.experiment = this;    
  }
};

var experiment = Object.create(TExperiment);

function initExperiment() {
  // document.body=document.createElement("BODY");
  var firstclick = true;
  experiment.create();
  experiment.container.appendChild(manager.data.table);
  experiment.container.appendChild(manager.timestamps.table);
  

  var btn = document.createElement("BUTTON");
  var text = document.createTextNode("Try it");
  btn.appendChild(text);
  btn.onclick=function() {
    experiment.canvas.fullscreen();
    if (firstclick) {
      experiment.begin();
      firstclick = false;
    };
  };
  experiment.container.appendChild(btn);
  
  var btn = document.createElement("BUTTON");
  var text = document.createTextNode("Log");
  btn.appendChild(text);
  btn.onclick=function() {manager.timestamps.log("button")};
  experiment.container.appendChild(btn);
};

initExperiment();