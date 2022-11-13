// Constants and variables
let prevOperation = [];
let currOperation = [0];

const numBtns = document.querySelectorAll(".nums");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal-btn");
const prevDisplay = document.querySelector(".lastOperationScreen");
const currDisplay = document.querySelector(".currentOperationScreen");

// UI and event handling

function attachEventListenersToBtns() {
  // Numbers
  for (const numBtn of numBtns) {
    numBtn.addEventListener("click", () => {
      if (isLastZero()) {
        currOperation[currOperation.length - 1] = numBtn.dataset.key;
      } else if (isLastNumber()) {
        currOperation[currOperation.length - 1] += numBtn.dataset.key;
      } else {
        currOperation.push(numBtn.dataset.key);
      }
      refreshCurrDisplay();
    });
  }
  // Operators
  for (const operatorBtn of operatorBtns) {
    operatorBtn.addEventListener("click", () => {
      if (isLastNumber()) {
        currOperation.push(operatorBtn.dataset.key);
      }
      refreshCurrDisplay();
    });
  }
  // Equal
  equalBtn.addEventListener("click", () => {
    if ((isLastNumber()) & (currOperation.length > 1)) {
      currOperation.push(equalBtn.dataset.key);
      shiftOperation();
      refreshPrevDisplay();
      let result = calculate(processOperation(prevOperation));
      currOperation.push(result);
      refreshCurrDisplay();
    }
    else {
      alert('Please complete operation.')
    }
  });
}

function processOperation(operation) {}

function calculate(operation) {}

function shiftOperation() {
  // Copy
  prevOperation = currOperation;
  // Clear currOperation
  currOperation = [];
}

function refreshPrevDisplay() {
  prevDisplay.textContent = prevOperation.join(" ");
}

function refreshCurrDisplay() {
  currDisplay.textContent = currOperation.join(" ");
}

// Logic
/**
 * @returns True if the entering digit is joinable
 * with the last element of currOperation
 */
function isLastNumber() {
  last = Number(currOperation[currOperation.length - 1]);
  if (isNaN(last)) {
    return false;
  } else return true;
}

/**
 * @returns True if the last element in currOperation
 * is 0
 */
function isLastZero() {
  last = Number(currOperation[currOperation.length - 1]);
  if (last != 0) {
    return false;
  } else return true;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

/**
 * Returns the result of applying the operator to two operands.
 * @param {*} operator A two-parameter function
 */
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

/**
 * Main driver method
 */
function main() {
  attachEventListenersToBtns();
}

main();
