import { canvas } from './canvas.js';
import { data, timestamps } from './reports.js';

var TManager = {
  TimeStart : 0,
  CurrentTrial : 0,
  CurrentBloc : 0,
  SessionTrial: 0,

  CurrentBlocTrials : 0,
  SessionBlocs : 0,
  NextTrial : function(){
    this.CurrentTrial++;
    this.SessionTrial++;
  },

  NextBloc : function() {
    this.CurrentTrial = 0;
    this.CurrentBloc++;
    this.SessionTrial++;
  },

  start : function(){
    this.TimeStart = window.performance.now();      
  },

  now : function(){
    return Math.trunc(window.performance.now() - this.TimeStart);
  }
};

if (manager == null) {
  var manager = Object.create(TManager);
  manager.data = data;
  manager.timestamps = timestamps;
  manager.canvas = canvas;

} else {
  // do nothing
};

export { manager }; 