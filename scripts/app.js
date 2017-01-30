var filepath = 'views.csv';
var titles;
var allValues = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if(this.readyState === this.DONE && this.status === 200) {
        processData(this.responseText);
        document.getElementById('filename').innerText = filepath;
        // populateTable();
    }
}
xhttp.open("GET", filepath, true);
xhttp.send();

function processData(resp) {
    var rows = resp.split(/\r\n|\n/);
    var rowsLength = rows.length;
    var lastRow = rows[rowsLength - 1];
    var lastRowPosition = lastRow.length?(rowsLength):(rowsLength - 1);
    titles = getArrayFromString(rows[0], ",");
    populateTableHeader();
    for(var i=1;i<lastRowPosition;i++) {
        var rowData = new dataClass(rows[i])
        allValues.push(rowData);
        appendBodyRow(rowData);
    }
}

function dataClass(rowDataAsString) {
    var rowAsArray = getArrayFromString(rowDataAsString, ",");
    for(var i=0;i<titles.length;i++) {
        this[titles[i]] = rowAsArray[i];
    }
}

function getArrayFromString(str, separator) {
    return str.split(separator);
}

// function populateTable(titles) {
//     populateTableHeader();
//     populateTableBody();
// };

function populateTableHeader() {
    var thElem, textNode;
    var theadElem = document.getElementsByTagName('thead')[0];
    var headerRowElem = document.createElement('tr');
    for(var i=0; i<titles.length;i++) {
        thElem  = document.createElement('th');
        textNode = document.createTextNode(titles[i]);
        thElem.appendChild(textNode);
        headerRowElem.appendChild(thElem);
    }
    theadElem.appendChild(headerRowElem);
}

// function populateTableBody() {
//     var tdElem, textNode, trElem;
//     var tbodyElem = document.getElementsByTagName('tbody')[0];
    
//     for(var i=0;i<allValues.length;i++) {
//         trElem = document.createElement('tr');
//         for(var j=0; j<titles.length;j++) {
//             tdElem  = document.createElement('td');
//             textNode = document.createTextNode(allValues[i][titles[j]]);
//             tdElem.appendChild(textNode);
//             trElem.appendChild(tdElem);
//         }
//         tbodyElem.appendChild(trElem);
//     }
// }

var tbodyElem = document.getElementsByTagName('tbody')[0];

function appendBodyRow(rowValue) {
    var tdElem, textNode, trElem;
    
    // for(var i=0;i<allValues.length;i++) {
        trElem = document.createElement('tr');
        for(var j=0; j<titles.length;j++) {
            tdElem  = document.createElement('td');
            textNode = document.createTextNode(rowValue[titles[j]]);
            tdElem.appendChild(textNode);
            trElem.appendChild(tdElem);
        }
        tbodyElem.appendChild(trElem);
    // }
}

function getJSON() {
    var taElem = document.getElementById('json');
    taElem.innerText = JSON.stringify(allValues);
    taElem.style.display = 'block';
}
