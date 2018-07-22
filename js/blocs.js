import { manager } from './manager.js';
import { configuration } from './configurations.js';
import { line } from './helpers.js';

class TBloc {
  constructor(){
    var itiBegin = 0;
    var itiEnd = 0;
    var lastTrialHeader = '';
    var trial = null;

    var  WriteTrialData = function(){
      var ITIData = '';
      var data = '';
      
      if (trial.header !== lastTrialHeader) {
        data = line('tentativa.id', 'tentativa.nome', 'iet.inicio', 'iet.fim', trial.header);
      };

      lastTrialHeader = trial.header;

      if (manager.SessionTrials == 0) {
        ITIData = 'NA\t0'
      } else {
        ITIData = FITIBegin.toString() + '\t' + FITIEnd.toString();
      };

      // write data
      manager.data(data+line(trial.id, trial.name, ITIData, LTrial.Data));
    };

    var InterTrialIntervalStop = function(){
      if (this.OnInterTrialStop !== null) { this.OnInterTrialStop(this) };  
      itiEnd = manager.now();
      WriteTrialData();
      manager.NextTrial();
      this.begin(); 
    };

    var InterTrialStart = function(){
      setTimeout(this.InterTrialIntervalStop, trial.interval);
      itiBegin = manager.now()  
    };

    var PlayTrial = function(){
      if (trial !== null) {
        trial.clear();
        trial == null;
      };
      trial = configuration.CurrentTrial();
      trial.OnTrialEnd = InterTrialStart;
      trial.begin();
    };

    this.OnEndBloc = null;
    this.OnInterTrialStop = null;
    this.begin = function () {
      if (manager.CurrentTrial <= manager.CurrentBlocTrials -1) {
        PlayTrial();
      }  else {
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