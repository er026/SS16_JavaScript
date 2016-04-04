fs = require('fs')                                                              
fs.readFile('Liste_PPN-ExNr_HSHN-libre.csv', 'utf8', function (err, data) {  //readfile aus fs Modul readfile sehe Doku 3. Parameter von readfile ist Funktion, wird aufgerufen sobald Datei eingelesen wird 1. Parameter (err) null oder undefinded, als erstes Fehlerbehandlung in Funktion 
    if (err) {
         return console.log(err);
    } else { 
    
        //Medien in Objekte in Array speichern
        var subMedium;
        var lines = data.split("\n");
        var medien = [];
         for (var i=1; i < 118122; i++) {           //i=1 weil erste Zeile Spaltenüberschriften
              subMedium = lines[i].replace(/\r/g, ",").split(",",5);

              medien[i-1] = {
                  PPN:subMedium[0], 
                  ExemplarDatensatznr:subMedium[1], 
                  Signatur:subMedium[2], 
                  Barcode:subMedium[3], 
                  Siegel:subMedium[4]  };          
            }
        // console.log(medien);



        // 000 an PPN dranhängen
        for (var i=0; i < 118121; i++) {         
            while(medien[i].PPN.length <9) {
                medien[i].PPN = "0" + medien[i].PPN;
            } 
        }    
        //console.log(medien[3].PPN) ist Ausgabe;

//

        //Fehlende Nummern rausfiltern
        var medienExemplar = [];    
        var medienSignatur = [];
        var medienBarcode = [];
        var medienSiegel = [];

        for (var i=0; i < 118121; i++) { 
            if (medien[i].ExemplarDatensatznr === "" ) {
               // console.log(i);
                medienExemplar.push(medien[i]);
            }
        }

        for (var i=0; i < 118121; i++) { 
            if (medien[i].Signatur === "" ) {
               // console.log(i);
                medienSignatur.push(medien[i]);
            }
        }

        for (var i=0; i < 118121; i++) { 
            if (medien[i].Barcode === "" ) {
                //console.log(i);
                medienBarcode.push(medien[i]);
            }
        }

        for (var i=0; i < 118121; i++) { 
            if (medien[i].Siegel === "" ) {
               // console.log(i);
                medienSiegel.push(medien[i]);
            }
        }

        for (var i=0; i < medienExemplar.length; i++) {
            console.log("Bei folgendem Medium fehlt die Exemplar-Datensatznummer: " + medienExemplar[i].PPN);
         }
        console.log("Insgesamt fehlt bei " +  medienExemplar.length + " Medien die Exemplar-Datensatznummer.")

        for (var i=0; i < medienSignatur.length; i++) {
            console.log("Bei folgendem Medium fehlt die Signatur: " + medienSignatur[i].PPN);
         }
        console.log("Insgesamt fehlt bei " +  medienSignatur.length + " Medien die Signatur.")

        for (var i=0; i < medienBarcode.length; i++) {
            console.log("Bei folgendem Medium fehlt der Barcode: " + medienBarcode[i].PPN);
         }
        console.log("Insgesamt fehlt bei " +  medienBarcode.length + " Medien der Barcode.")

        for (var i=0; i < medienSiegel.length; i++) {
            console.log("Bei folgendem Medium fehlt das Siegel: " + medienSiegel[i].PPN);
         }
        console.log("Insgesamt fehlt bei " +  medienSiegel.length + " Medien das Siegel.")

        //console.log("Anzahl Zeilen" + lines.length);
    }
});
 






















//    var i = { 118122
//        PPN: subPPN,
//        ExemplarDatensatznr : subEx,
//        Signatue:  subSign,
//        Barcode: subBar,
//        Sigel: subSig,
//    };
////      {
//     myColumnDefs[i] = ({key:oFullResponse.results[i].label, sortable:true, resizeable:true});
//  }

//vehicle[] car = new vehicle[N];

     


