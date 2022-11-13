// Constants and variables
let currOperation = [];
const numBtns = document.querySelectorAll(".nums");
const operatorBtns = document.querySelectorAll(".operator");
const display = document.querySelector(".currentOperationScreen");

// UI and event handling

function attachEventListenersToBtns() {
  // Numbers
  for (const numBtn of numBtns) {
    numBtn.addEventListener("click", () => {
      if (isJoinable()) {
        currOperation[currOperation.length - 1] += numBtn.dataset.key;
      } else {
        currOperation.push(numBtn.dataset.key);
      }
      refreshDisplay();
    });
  }
  // Operators
  for (const operatorBtn of operatorBtns) {
    operatorBtn.addEventListener("click", () => {
      currOperation.push(operatorBtn.dataset.key);
      refreshDisplay();
    });
  }
  // Equal
  
}

function refreshDisplay() {
  display.textContent = currOperation.join(" ");
}

// Logic
/**
 * @returns True if the entering digit is joinable 
 * with the last element of currOperation
 */
function isJoinable() {
  last = Number(currOperation[currOperation.length - 1]);
  if (isNaN(last)) {
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
 * Returns the result of applying the operator to two operands
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
