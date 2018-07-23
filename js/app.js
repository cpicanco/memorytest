import { sendGMailMessage } from './email.js';
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
      var endsession = function(){
        alert('O teste chegou ao final!');
      };

      if (manager.CurrentBloc <= manager.SessionBlocs -1) {
        bloc.begin();
      } else {
        if (googleUser !== null){
          if (googleUser.El) {
            sendGMailMessage(googleUser, manager.data.asString(), function(data){ console.log(data); endsession(); });
          } else {
            endsession();
          };
        } else {
          endsession();
        };
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

var btn = document.createElement("BUTTON");
btn.id = 'start-button';
btn.appendChild(document.createTextNode("Começar!"));
btn.onclick=function() {
  experiment.canvas.fullscreen();
  experiment.begin();
};

experiment.container.appendChild(btn);
experiment.container.appendChild(manager.data.table);
experiment.container.appendChild(manager.timestamps.table);

// var btn = document.createElement("BUTTON");
// var text = document.createTextNode("Log");
// btn.appendChild(text);
// btn.onclick=function() {manager.timestamps.log("button")};
// experiment.container.appendChild(btn);

// var win = window.open('/tcle');