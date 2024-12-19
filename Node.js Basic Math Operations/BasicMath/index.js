const operations = {
    sum: require('./sum'),
    multiply: require('./multiplication'),
    subtract: require('./subtraction'),
    divide: require('./division')
};

const [operation, a, b] = process.argv.slice(2);
if (!operation || !a || !b || !operations[operation]) {
    console.error("Usage: node index.js <operation> <num1> <num2>");
    console.error("Operations: sum, multiply, subtract, divide");
} else {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    try {
        console.log(`${operation}: ${operations[operation](num1, num2)}`);
    } catch (err) {
        console.error(err.message);
    }
}
