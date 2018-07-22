class TReport {
  constructor(name){
    var owner = this;
    var tsvFileFromTable = function(){
      var tsv = '';
      var rows = owner.table.rows;
      for (let i = 0; i < rows.length; i++) {
        var cols = rows[i];
        for (let j = 0; j < cols.childElementCount; j++) {
          if (j < cols.childElementCount -1) {
            tsv = tsv + cols.children[j].innerText + '\t';
          } else {
            tsv = tsv + cols.children[j].innerText + '\n';
          }; 
        };  
      };
      return new Blob([tsv], {type: 'text/plain', endings:'native'});
    };

    var downloadButton = document.createElement("BUTTON");
    downloadButton.style.width = "100%"
    downloadButton.appendChild(document.createTextNode("Baixar relatório"));
    downloadButton.onclick = function(){
      var downloadLink = document.createElement("A");
      downloadLink.download = name;
      downloadLink.display = 'none';
      downloadLink.href = window.URL.createObjectURL(tsvFileFromTable());
      downloadLink.click();
    };
    
    this.table = document.createElement('TABLE');
    this.table.display = 'none';
    this.table.id = name+'_table';
    this.table.align = "center";
    this.table.style.width  = '100px';
    this.table.style.border = '1px solid black';
    this.table.appendChild(downloadButton);

    this.appendRow = function() {
      var newRow = this.table.insertRow();
      for (let i = 0; i < arguments.length; i++) {
        let cell = newRow.insertCell();
        cell.appendChild(document.createTextNode(arguments[i]));
        cell.style.borderBottom = '1px solid black'; 
      };
    }; 
    this.log = null;

    this.show = function(){
      this.table.display = 'block';
    }; 
  };     
};

if (data == null) {
  var data = new TReport('data');
} else {
  // do nothing
};

if (timestamps == null) {
  var timestamps = new TReport('timestamps');
} else {
  // do nothing
};

export { data, timestamps };