let gradeFractions = {}
let weights = {}
let rowtotal = 4;

// Displaying percentages for all rows
for (let rowcount = 1; rowcount <= rowtotal; rowcount++) {
    initialize(rowcount);
}

function initialize(rowcount) {
    let p = document.getElementById("p" + rowcount);
    let n = document.getElementById("n" + rowcount);
    let d = document.getElementById("d" + rowcount);
    let w = document.getElementById("w" + rowcount);
    w.oninput = weightUpdate(w, rowcount);
    n.oninput = percentUpdate(n, d, p, rowcount);
    d.oninput = percentUpdate(n, d, p, rowcount);
}

function weightUpdate(w, rowcount) {
    return function () {
        weights[rowcount] = Number(w.value);
    }
}

function percentUpdate(n, d, p, rowcount) {
    return function () {
        gradeFraction = n.value / d.value;
        gradeFractions[rowcount] = gradeFraction;
        p.innerHTML = Math.round(gradeFraction * 100) + "%";
    };
}

weightedButton = document.getElementById("wb");
meanButton = document.getElementById("mb");
rowButton = document.getElementById("rb");
result = document.getElementById("result");

weightedButton.onclick = function () {
    console.log("weightedButton clicked");
    result.innerHTML = calculateWeighted(weights, gradeFractions);
}

meanButton.onclick = function () {
    console.log("meanButton clicked");
    let scalar = 1 / rowtotal;
    let evenDistribution = {}
    for (let rowcount = 1; rowcount <= rowtotal; rowcount++) {
        evenDistribution[rowcount] = scalar;
    }
    result.innerHTML = calculateWeighted(evenDistribution, gradeFractions);
}

function calculateWeighted(weights, gradeFractions) {
    let weightedFraction = 0;
    for (let rowcount = 1; rowcount <= rowtotal; rowcount++) {
        weightedFraction += weights[rowcount] * gradeFractions[rowcount];
    }
    let weighted = Math.round(weightedFraction * 100) + "%";
    return weighted;
}

rowButton.onclick = function () {
    console.log("addrowButton clicked");
    rowtotal++;

    // find the parent element
    let table = document.getElementsByTagName("table")[0];

    // create a new row
    let tr = document.createElement("tr");
    table.appendChild(tr);

    // create the row elements in HTML
    // LONG NAME
    let tdName = document.createElement("td");
    tdName.innerHTML = "Activity " + rowtotal;
    // add to row
    tr.appendChild(tdName);

    // SHORT NAME
    let tdShortName = document.createElement("td");
    tdShortName.innerHTML = "A" + rowtotal;
    // add to row
    tr.appendChild(tdShortName);

    // WEIGHT 
    let tdWeight = document.createElement("td");
    tdWeight.innerHTML = `<input id=w${rowtotal}>`
    tr.appendChild(tdWeight);

    // GRADE (2 inputs)
    let tdGrade = document.createElement("td");
    tdGrade.innerHTML = `<input id=n${rowtotal}> <b> / </b><br><input id=d${rowtotal}>`
    tr.appendChild(tdGrade);

    // PERCENT
    let tdPercent = document.createElement("td");
    tdPercent.id = `p${rowtotal}`
    // add to row
    tr.appendChild(tdPercent);

    // initialize JavaScript functionality
    // for those elements
    initialize(rowtotal)
}
