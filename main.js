const digitButtons = document.querySelectorAll(".digit");
const operationButtons = document.querySelectorAll(".operation");
const displayMain = document.querySelector("#main");
const backspaceButton = document.querySelector("#backspace");
const clearButton = document.querySelector("#clear");
const negativeButton = document.querySelector("#negative");
const percentButton = document.querySelector("#percent");
const equalsButton = document.querySelector("#equals");
const maxNums=9;
let mainInput="";
let operation="";
let storedInput="";
let operating=false;

// CLEAR INPUT VALUES
function clearValues() {
    mainInput="";
    storedInput="";
    operation="";
    operationButtons.forEach(button => button.classList.remove("selected"));
    operating=false;
    updateDisplay();
}

// UPDATE DISPLAY TO INPUT
function updateDisplay() {
    if(mainInput=="") displayMain.textContent=0;
    else {
        if(isNaN(mainInput)) clearValues();
        displayMain.textContent=mainInput;
    }
}

// CONVERT TO PERCENTAGE
function convertToPercent() {
    mainInput = (mainInput / 100).toString();
    updateDisplay();
}

// BACKSPACE FUNCTIONALITY
function removeOneDigit() {
    mainInput = mainInput.slice(0,mainInput.length-1);
    updateDisplay();
}

// GET COUNT OF NUMERIC CHARACTERS
function getNumericLength() {
    let count=0;
    for (let i=0;i<mainInput.length;i++){
        if(mainInput[i] >= '0' && mainInput[i] <= '9') count++;
    }
    return count;
}

// ADD DIGIT OR DECIMAL TO MAIN INPUT
function addNumber(value) {
    if(operating) {
        operationButtons.forEach(button => button.classList.remove("selected"));
    }
    if(getNumericLength()==0 && value==0 && !operating) return 0;
    if(getNumericLength()<maxNums){
        if(value==".") {
            if(mainInput.includes(".")) return 0;
            else if(getNumericLength()==0) mainInput+="0"+value;
            else mainInput+=value;
        } else if(mainInput==0 && value!=0)mainInput=value;
        else mainInput+=value;
        updateDisplay();
    }
}

// STORE NUMBER AND BEGIN OPERATION PHASE
function chooseOperation(op) {
    if(operating) {
        compute();
        updateDisplay();
    }
    operation = op;
    storedInput = mainInput;
    mainInput = "";
    operating = true;
}

// ROUND DECIMALS
function roundNum(num) {
    return Math.round(num * 100000) / 100000;
}

// DO THE MATH!!!
function compute() {
    let computation;
    storedInput = parseFloat(storedInput);
    mainInput = parseFloat(mainInput);
    if(isNaN(storedInput)) storedInput = 0;
    switch (operation) {
        case "+":
            computation = storedInput + mainInput;
            break;
        case "/":
            if(mainInput==0) {
                alert("CAN'T DIVIDE BY ZERO BOZO");
                return;
            } else computation = storedInput / mainInput;
            break;
        case "x":
            computation = storedInput * mainInput;
            break;
        case "-":
            computation = storedInput - mainInput;
            break;
        default:
            return;
    }
    storedInput = mainInput;
    mainInput = roundNum(computation);
    operating = false;
    updateDisplay();
}

// KEYBOARD INPUT


// EVENT LISTENERS
percentButton.addEventListener('click', convertToPercent);
clearButton.addEventListener('click', clearValues);
backspaceButton.addEventListener('click', removeOneDigit);
equalsButton.addEventListener('click', compute);
digitButtons.forEach(button => button.addEventListener('click', () => addNumber(button.textContent)));
operationButtons.forEach(button => button.addEventListener('click', () => {
    chooseOperation(button.innerHTML);
    button.classList.add("selected");
}));