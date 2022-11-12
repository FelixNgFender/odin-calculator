function add(a, b) {
  return parseFloat(a) + parseFloat(b);
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
function operate(operator, operand1, operand2) {
    return operator(operand1, operand2)
}

