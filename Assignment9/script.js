const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

let memory = 0;
let lastResult = '';

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function toggleSign() {
    if (display.value) {
        if (display.value.startsWith('-')) {
            display.value = display.value.slice(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}

function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    display.value += memory;
}

function memoryAdd() {
    try {
        memory += parseFloat(display.value) || 0;
    } catch (e) {
        memory = 0;
    }
}

function memorySubtract() {
    try {
        memory -= parseFloat(display.value) || 0;
    } catch (e) {
        memory = 0;
    }
}

function addToHistory(expr, result) {
    if (!historyList) return;
    const li = document.createElement('li');
    li.textContent = `${expr} = ${result}`;
    historyList.insertBefore(li, historyList.firstChild);
    if (historyList.childNodes.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

function calculate() {
    let expr = display.value;
    try {
        // Replace percent: "50%" -> "(50/100)"
        expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
        // Replace xʸ (**) with Math.pow if needed
        expr = expr.replace(/(\d+(?:\.\d+)?)(\*\*)(\d+(?:\.\d+)?)/g, 'Math.pow($1,$3)');
        // Evaluate
        let result = eval(expr);
        if (typeof result === 'number' && !isNaN(result)) {
            display.value = result;
            addToHistory(expr, result);
            lastResult = result;
        } else {
            display.value = 'Error';
        }
    } catch (e) {
        display.value = 'Error';
    }
}
