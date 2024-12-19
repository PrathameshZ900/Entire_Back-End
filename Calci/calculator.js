const crypto = require('crypto');

// Retrieve command-line arguments
const args = process.argv.slice(2);
const [operation, ...numbers] = args;

// Helper function to validate numbers
const isNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);

const calculate = (operation, numbers) => {
  switch (operation.toLowerCase()) {
    case 'add':
      return numbers.reduce((acc, num) => acc + num, 0);
    case 'subtract':
      return numbers.reduce((acc, num) => acc - num);
    case 'multiply':
      return numbers.reduce((acc, num) => acc * num, 1);
    case 'divide':
      return numbers.reduce((acc, num) => acc / num);
    case 'random':
      const length = numbers[0] || 8; // Default length: 8 bytes
      return crypto.randomBytes(Number(length)).toString('hex');
    default:
      throw new Error(`Invalid operation: ${operation}`);
  }
};

// Validate arguments
try {
  if (!operation) throw new Error("Please specify an operation (e.g., add, subtract, multiply, divide, random).");

  const numericInputs = numbers.map(Number);
  if (['add', 'subtract', 'multiply', 'divide'].includes(operation.toLowerCase()) && !numericInputs.every(isNumber)) {
    throw new Error("All inputs for this operation must be numbers.");
  }

  const result = calculate(operation, numericInputs);
  console.log(`Result: ${result}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  console.log("Usage: node calculator.js <operation> <num1> <num2> ...");
  console.log("Supported operations: add, subtract, multiply, divide, random");
}
