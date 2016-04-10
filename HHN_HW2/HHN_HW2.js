fs = require ('fs');
function writeToFile(filename, data) {
   var err =  fs.appendFileSync(filename, data);
      if(err) {
          console.log("Error writing to file " + filename + "!");
          throw err;             
             
    }  //Asynchron  anders wäre append file sync
}

function resetFiles() {
   fs.writeFileSync("output.csv");
   fs.writeFileSync("error.csv");
    fs.writeFileSync("end.txt");
    
}

function output(data){
    writeToFile("output.csv", data);
}

function error(data) {
    writeToFile("error.csv", data);   
}

function end(data) {
    writeToFile("end.txt", data);   
}

resetFiles();

fs.readFile('Liste_PPN-ExNr_HSHN-libre.csv', 'utf8', function (err, inhalt) {
    if(err) {
        return console.log(err);
    }
    var lines = inhalt.split (/\r?\n/);
    var result = [];
    for (var i = 0; i< lines.length; i++) {
        if (i == 0) continue;
        if (i == lines.length-1) continue;
        var line = lines[i];
        var tokens = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (tokens.length != 5) {
            error("Komische Zeile: " + i);            
        } else {
            var ppn = tokens[0];
            while (ppn.length<9){
                ppn = "0" + ppn;
            }   
            // "0".repeat(9-ppn.length) + ppn
            var exemplar  = {
                ppn: ppn,
                exemplar: tokens[1],
                signatur: tokens[2],
                barcode: tokens[3],
                siegel: tokens [4]
            };
            result.push(exemplar);
        }      
    }
    output(JSON.stringify(result, null, 2));
    
    
    //Barcode eindeutig?
    var duplicatesBarcode = [];
    
    for (var i = 0; i< 1000; i++) { 
        var test = result[i].barcode;
        for (var j = 0; j< 5000; j++) { 
            if (i == j) continue;
            if (test == "") continue;
            if (test == result[j].barcode) {
                duplicatesBarcode.push(test);
            }
        }
    }
    end(JSON.stringify(duplicatesBarcode, null, 2));
    console.log("Es gibt " + duplicatesBarcode.length + " uneindeutige Barcodes");
    
    
    //Exemplar eindeutig?
    var duplicatesExemplar = [];
    
    for (var i = 0; i< 1000; i++) { 
        var test = result[i].exemplar;
        for (var j = 0; j< 5000; j++) { 
            if (i == j) continue;
            if (test == "") continue;
            if (test == result[j].exemplar) {
                duplicatesExemplar.push(test);
            }
        }
    }
    end(JSON.stringify(duplicatesExemplar, null, 2));
    console.log("Es gibt " + duplicatesExemplar.length + " uneindeutige Exemplarnummern");
    
    
    //anzahl Exemplare pro Siegel
    var HN = 0;
    var KU = 0;
    var SH = 0;
    var C2 = 0;
    for (var i = 0; i< result.length; i++) { 
        var standEx = result[i].siegel;
        if(standEx.replace(/\s/g, '') == "HN") {HN++;}
        if(standEx.replace(/\s/g, '') == "KU") {KU++;}
        if(standEx.replace(/\s/g, '') == "SH") {SH++;}
        if(standEx.replace(/\s/g, '') == "C2") {C2++;}
    }
    console.log("HN: " + HN + " Exemplare   KU: " + KU + " Exemplare    SH: " + SH + " Exemplare     C2:" + C2 + " Exemplare");
   
});




