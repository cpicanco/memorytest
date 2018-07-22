import { manager } from './manager.js';
import { configuration } from './configurations.js';

class TBloc {
  constructor(){
    var itiBegin = 0;
    var itiEnd = 0;
    var lastTrialHeader = [];
    var trial = null;
    var self = this;

    var isdifferent = function(a, b){
      if (a.length !== b.length) return true;
      for (let i = a.length-1; i >= 0; i--) {
        if (a[i] !== b[i]) return true;
      };
      return false;
    };

    var WriteTrialData = function(){
      if (isdifferent(trial.header, lastTrialHeader)) {
        manager.data.appendRow('Bloco.Id','Tentativa.Id', 'Tentativa.Nome', 'IET.Inicio', 'IET.Fim');
        manager.data.appendToCurrentRow(trial.header);
      };
      lastTrialHeader = trial.header;

      if (manager.SessionTrials == 0) {
        itiBegin = 'NA';
        itiEnd = 'NA';
      };

      // write data
      manager.data.appendRow(manager.CurrentBloc, manager.CurrentTrial, trial.name, itiBegin, itiEnd);
      manager.data.appendToCurrentRow(trial.data());
    };

    var InterTrialIntervalStop = function(){
      if (self.OnInterTrialStop !== null) { self.OnInterTrialStop(self) };  
      itiEnd = manager.now();
      WriteTrialData();
      manager.NextTrial();
      self.begin(); 
    };

    var InterTrialStart = function(){
      setTimeout(InterTrialIntervalStop, trial.interval);
      itiBegin = manager.now()  
    };

    var TrialBegin = function(trial){
      console.log(trial.id);
      console.log(trial.name);
    };

    var PlayTrial = function(){
      if (trial !== null) {
        trial.clear();
        trial == null;
      };
      trial = configuration.CurrentTrial();
      trial.OnTrialEnd = InterTrialStart;
      trial.OnTrialBegin = TrialBegin;
      trial.begin();
    };

    this.OnEndBloc = null;
    this.OnInterTrialStop = null;
    this.begin = function () {
      manager.CurrentBlocTrials = configuration.CurrentBlocTrials();
      if (manager.CurrentTrial <= manager.CurrentBlocTrials -1) {
        PlayTrial();
      } else {
        manager.NextBloc();
        if (this.OnEndBloc !== null) { this.OnEndBloc(this) };
      };
    };
  };
};

if (bloc == null) {
  var bloc = new TBloc();
} else {
  // do nothing
};

export { bloc };