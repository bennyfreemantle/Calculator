const numberBtns = document.querySelectorAll(".didgit-button");
const divideBtn = document.querySelector(".divide-button");
const multiplyBtn = document.querySelector(".multiply-button");
const subtractBtn = document.querySelector(".subtract-button");
const addBtn = document.querySelector(".add-button");
const equalsBtn = document.querySelector(".equals-button");
const numberDisplay = document.querySelector(".calc-display > p");

let chosenOperation = null;
let tempDisplayValue = "";
let firstValue = "";
let valueArr = [];

const operate = (operator, num1, num2) => {
  return operator(num1, num2);
};

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

// Event listener for all number buttons
numberBtns.forEach((number) => {
  number.addEventListener("click", () => {
    tempDisplayValue += number.textContent;
    valueArr.push(+number.textContent);
    numberDisplay.textContent = tempDisplayValue;
  });
});

const calculate = () => {
  let result = operate(chosenOperation, +firstValue, +tempDisplayValue);
  firstValue = "";
  numberDisplay.textContent = result;
  tempDisplayValue = result;
};

// Event listeners for operation buttons
addBtn.addEventListener("click", () => {
  if (!firstValue == "" && !tempDisplayValue == "") {
    calculate();
  }
  firstValue = tempDisplayValue;
  tempDisplayValue = "";
  chosenOperation = add;
});

subtractBtn.addEventListener("click", () => {
  if (!firstValue == "" && !tempDisplayValue == "") {
    calculate();
  }
  firstValue = tempDisplayValue;
  tempDisplayValue = "";
  chosenOperation = subtract;
});

multiplyBtn.addEventListener("click", () => {
  if (!firstValue == "" && !tempDisplayValue == "") {
    calculate();
  }
  firstValue = tempDisplayValue;
  tempDisplayValue = "";
  chosenOperation = multiply;
});

divideBtn.addEventListener("click", () => {
  if (!firstValue == "" && !tempDisplayValue == "") {
    calculate();
  }
  firstValue = tempDisplayValue;
  tempDisplayValue = "";
  chosenOperation = divide;
});

equalsBtn.addEventListener("click", () => {
  calculate();
});
