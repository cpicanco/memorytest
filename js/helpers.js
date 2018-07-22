var line = function(){
  var len = line.arguments.length;
  var result = '';
  for (let i = 0; i < len; i++) {
    if (i < len -1) {
      result = result + line.arguments[i] + '\t';
    } else {
      result = result + line.arguments[i] + '\n';
    };    
  }
};

var tabulate = function(){
  var len = line.arguments.length;
  var result = '';
  for (let i = 0; i < len; i++) {
    if (i < len -1) {
      result = result + line.arguments[i] + '\t';
    } else {
      result = result + line.arguments[i];
    };    
  }
};  

export { tabulate };
export { line };