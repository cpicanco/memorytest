import { manager } from './manager.js';
import { bloc } from './blocs.js';

class TExperiment {
  constructor(){
    this.name = 'experiment-container';
    this.running = false;
    this.begin = function(){
      if (this.running == false) {
        this.running = true;
        bloc.begin();
      };
    };

    var container = function (){
      return document.getElementById(this.name);
    };
    Object.defineProperty(this, 'container', { get: container});


    bloc.OnEndBloc = function(){
      if (manager.CurrentBloc <= manager.SessionBlocs -1) {
        bloc.begin();
      } else {
        alert('A sessão acabou!');
      };
    };
    
    this.bloc = bloc;
    this.manager = manager;
    this.canvas = manager.canvas;
    this.container.appendChild(this.canvas);
    window.experiment = this;     
  };
};

var experiment = new TExperiment();
// document.body=document.createElement("BODY");
experiment.container.appendChild(manager.data.table);
experiment.container.appendChild(manager.timestamps.table);


var btn = document.createElement("BUTTON");
var text = document.createTextNode("Try it");
btn.appendChild(text);
btn.onclick=function() {
  experiment.canvas.fullscreen();
  experiment.begin();
};
experiment.container.appendChild(btn);

var btn = document.createElement("BUTTON");
var text = document.createTextNode("Log");
btn.appendChild(text);
btn.onclick=function() {manager.timestamps.log("button")};
experiment.container.appendChild(btn);
