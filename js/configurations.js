import { manager } from './manager.js';
import { TMessage } from './trials.js';

class TConfiguration {
  constructor(configs){
    var configurations;

    if (configs instanceof String) {
      try {
        configurations = (JSON.parse(configs) && !!configs);
      } catch (e) {
        throw new Error("Invalid JSON.");
      }
    } else {
      configurations = configs;
    };

    manager.CurrentTrial = configurations.CurrentTrial;
    manager.CurrentBloc = configurations.CurrentBloc;
    manager.CurrentBlocTrials = configurations.CurrentBlocTrials;
    manager.SessionBlocs = configurations.blocs.length;

    this.Participant = configs.Participant;
    this.CurrentTrial = function(){
      var trialconfig = configurations.blocs[manager.CurrentBloc].trials[manager.CurrentTrial];
      var trial = null;
      switch (trialconfig.type) {
          case 'TMessage':
            trial = new TMessage(manager.canvas);
            trial.createStimulus(trialconfig.message);
            break;
          case 'TMatching':
            // todo
            break;
          case 'TLikert':
            // todo
            break;
      };

      trial.id = 'T'+manager.CurrentTrial.toString();


      if (trialconfig.interval == null){
        trial.interval = 1000;
      } else {
        trial.interval = trialconfig.interval;
      };

      if (trialconfig.name == null){
        trial.name = 'Tentativa '+(manager.CurrentTrial+1).toString();
      } else {
        trial.name = trialconfig.name;
      };
      return trial;
    };

    this.CurrentBlocTrials = function(){
      return configurations.blocs[manager.CurrentBloc].trials.length;
    };
  };
};

var demo = {
  Participant : 'Guest',
  CurrentTrial : 0,
  CurrentBloc : 0,
  blocs :
  [
    {
      trials:
      [
        { type : 'TMessage', message: 'Olá, mundo!' },
        { type : 'TMessage', message: 'Teste de memória.' }
      ]
    },

    {
      trials:
      [
        { type : 'TMessage', message: 'Olá, mundo! (2)' },
        { type : 'TMessage', message: 'Teste de memória. (2)' }
      ]
    },
  ],
};

var configuration = new TConfiguration(demo);

export { configuration };