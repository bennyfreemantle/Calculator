// Buttons
const numberBtns = document.querySelectorAll(".didgit-button");
const operateBtns = document.querySelectorAll(".operate-button");
const equalsBtn = document.querySelector(".equals-button");
const clearBtn = document.querySelector(".clear-button");

// Text UI
const lastOperationScreen = document.querySelector("#lastOperationScreen");
const currentOperationScreen = document.querySelector(
  "#currentOperationScreen"
);

// Default settings
lastOperationScreen.textContent = "";
currentOperationScreen.textContent = "0";
let firstOperand = "";
let secondOperand = "";
let resetScreen = false;
let currentOperator = null;
let finalValue = false;

clearBtn.addEventListener("click", clear);
equalsBtn.addEventListener("click", () => {
  calculate();
  finalValue = true;
});

numberBtns.forEach((num) => {
  num.addEventListener("click", () => {
    if (currentOperationScreen.textContent === "0" || resetScreen) {
      resettingScreen();
    }

    if (finalValue) {
      finalValue = false;
      resettingScreen();
    }

    // dont allow double decimal point
    if (
      currentOperationScreen.textContent.charAt(
        currentOperationScreen.textContent.length - 1
      ) === "."
    ) {
      if (num.textContent === ".") {
        return;
      }
    }

    // dont allow anymore decimal points if it already contains one
    if (currentOperationScreen.textContent.includes(".")) {
      if (num.textContent === ".") {
        return;
      }
    }

    // if first character is decimal point, pad with zero
    if (currentOperationScreen.textContent.length - 1 == -1) {
      if (num.textContent === ".") {
        console.log("gotcha");
        currentOperationScreen.textContent = "0";
      }
    }

    currentOperationScreen.textContent += num.textContent;
  });
});

// Sets operator when operator buttons are clicked
operateBtns.forEach((operator) => {
  operator.addEventListener("click", () => setOperation(operator.textContent));
});

// // append the new number to the previous
// function appendNumber(num) {
//   if (currentOperationScreen.textContent === "0" || resetScreen) {
//     resettingScreen();
//   }

//   if (finalValue) {
//     finalValue = false;
//     resettingScreen();
//   }

//   if (
//     currentOperationScreen.textContent.charAt(
//       currentOperationScreen.textContent.length - 1
//     ) === "."
//   ) {
//     if (num.textContent === ".") {
//       console.log("booya");
//     }
//   }

//   currentOperationScreen.textContent += num;
// }

// clears the current operation screen
function resettingScreen() {
  currentOperationScreen.textContent = "";
  resetScreen = false;
}

// Clears all saved values back to default
function clear() {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
}

function setOperation(operator) {
  if (currentOperator !== null) calculate();
  firstOperand = currentOperationScreen.textContent;
  currentOperator = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperator}`;
  resetScreen = true;
  console.log("opperator set " + currentOperator);
}

function calculate() {
  console.log(currentOperator);
  if (currentOperator === null || resetScreen) return;
  if (currentOperator === "÷" && currentOperationScreen.textContent === "0") {
    alert("You can't divide by 0!");
    clear();
    return;
  }
  console.log(`${Number(firstOperand)} ${currentOperator} ${+secondOperand} =`);
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundNum(
    operate(currentOperator, firstOperand, secondOperand)
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
  currentOperator = null;
}

function roundNum(num) {
  return Math.round(num * 1000) / 1000;
}

// Calculating logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
