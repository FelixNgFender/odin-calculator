// Constants and variables
let prevOperation = [];
let currOperation = [0];

const numBtns = document.querySelectorAll(".nums");
const zeroBtn = document.querySelector(".zero");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");
const delBtn = document.querySelector(".del-btn");
const prevDisplay = document.querySelector(".lastOperationScreen");
const currDisplay = document.querySelector(".currentOperationScreen");

// UI and event handling

function attachEventListenersToBtns() {
  // Division by 0 handler
  zeroBtn.addEventListener("click", () => {
    if (currOperation[currOperation.length - 1] == "÷") {
      alert("Division by 0, please try again.");
      currOperation = [];
    }
  });
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
    if (isLastNumber() & (currOperation.length > 1)) {
      currOperation.push(equalBtn.dataset.key);
      shiftOperation();
      refreshPrevDisplay();
      let result = calculate(processOperation(prevOperation));
      let roundedResult = roundResult(result, 4);
      currOperation.push(roundedResult);
      refreshCurrDisplay();
    } else {
      alert("Please complete operation.");
    }
  });
  // Clear
  clearBtn.addEventListener("click", () => {
    prevOperation = [];
    currOperation = [0];
    refreshPrevDisplay();
    refreshCurrDisplay();
  });
  // Delete
  delBtn.addEventListener("click", () => {
    deleteLast();
    refreshCurrDisplay();
  });
}

function deleteLast() {
  if (isLastNumber() & (currOperation[currOperation.length - 1].length > 1)) {
    currOperation[currOperation.length - 1] = currOperation[
      currOperation.length - 1
    ].slice(0, -1);
  } else if (currOperation.length == 1) {
    currOperation = [0];
  } else {
    currOperation.splice(currOperation.length - 1, 1);
  }
}

function roundResult(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

/**
 * @param {Array} operation The operation thats has Numbers as strings.
 */
function processOperation(operation) {
  for (let i = 0; i < operation.length; i++) {
    if (!isNaN(operation[i])) {
      operation[i] = Number(operation[i]);
    }
  }
  return operation;
}

/**
 * @param {Array} operation Assume a "valid" operation array:
 * "=" at the end and operator between numbers.
 * @return {Number} result The result of the equation.
 */
function calculate(operation) {
  for (let i = 0; i < operation.length; i++) {
    if (operation[i] == "×" || operation[i] == "÷") {
      operation[i - 1] = operate(
        operation[i],
        operation[i - 1],
        operation[i + 1]
      );
      operation.splice(i, 2);
      i -= 1;
    }
  }
  for (let i = 0; i < operation.length; i++) {
    if (operation[i] == "+" || operation[i] == "−") {
      operation[i - 1] = operate(
        operation[i],
        operation[i - 1],
        operation[i + 1]
      );
      operation.splice(i, 2);
      i -= 1;
    }
  }
  return operation[0];
}

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
      return subtract(a, b);
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
