import { manager } from './manager.js';
import { tabulate } from './helpers.js';

class TTrial {
  constructor(canvas){
    var stimuli = [];
    this.limitedhold = null;
    this.show = function(){
      for (let i = 0; i < stimuli.length; i++) {
          stimuli[i].show();
      };
    };

    this.hide = function(){
      for (let i = 0; i < stimuli.length; i++) {
          stimuli[i].hide();
      };
    };

    this.clear = function(){
      for (let i = 0; i < stimuli.length; i++) {
          canvas.removeChild(stimuli[i]);      
      };
    };

    var logger = function(event){
      var now = manager.now();
      manager.timestamps.appendRow(now, manager.CurrentBloc, manager.CurrentTrial, this.name, event);
      return now;
    };

    this.log = logger;

    this.createStimulus = function(URL){
      var stimulus = document.createElement("IMG");
      stimulus.src = URL
      // stimulus.style.border="1px solid #d3d3d3";
      stimulus.width = 200;
      stimulus.height = 200;
      stimulus.onclick = function(){ logger(stimulus.id+".click") };
      stimulus.style.left = "200px";
      stimulus.style.top = "200px";
      stimulus.style.position = "absolute";  
      stimulus.style.display = "none";
      return stimulus;
    };

    this.appendStimulus = function(stimulus){
      var sn = stimuli.length+1;
      stimulus.id = "stimulus-${sn}";
      stimulus.show = function(){
        this.style.display = "block"
      };

      stimulus.hide = function(){
        this.style.display = "none"
      };
      stimulus.hide();
      stimuli.push(stimulus);
      canvas.appendChild(stimulus);
    };

    if (manager.CurrentTrial == 0) {
      manager.timestamps.appendRow('Tempo', 'Bloco.Id', 'Tentativa.Id', 'Tentativa.Nome', 'Evento');  
    };
  };

  static end(){
    this.hide();
    this.log('tentativa.fim');
    if (this.OnTrialEnd !== null) { this.OnTrialEnd(this) };  
  };

  static begin(){
    if (this.limitedhold !== null) {
      setTimeout(this.end, this.limitedhold);
    };
    this.show();
    this.log('tentativa.inicio');
    if (this.OnTrialBegin !== null) { this.OnTrialBegin(this) };  
  };

  static header(){
    return 'Tentativa.Resultado';
  };
};

class TMessage extends TTrial {
  constructor(canvas){
    super(canvas);
    var latency = null;

    var EndTrial = function(){
      // do stuff before end trial here
      TTrial.end.call(this);  
    };

    this.createStimulus = function(message){
      var stimulus = document.createElement("P");
      stimulus.innerText = message;
      stimulus.width = "75%";
      stimulus.height = "75%";
      stimulus.style.position = "absolute";
      stimulus.style.top = "50%";
      stimulus.style.left = "50%";
      stimulus.style.transform = "translate(-50%, -50%)";

      stimulus.onclick = function(){
        var now = this.log(stimulus.id+".click");
        latency = now;
        EndTrial();
      };
      this.appendStimulus(stimulus);
      // return stimulus;
    };

    this.begin = function(){
      // do stuff before begin trial here
      TTrial.begin.call(this);  
    };

    this.end = EndTrial; // only possible when limited hold > 0

    this.data = function(){
      return tabulate('NA', latency);
    };

    this.header = function(){
      return tabulate(TTrial.header.call(this), 'Tentativa.Latência');
    };
  };
};

export { TMessage };