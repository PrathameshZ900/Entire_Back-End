// index.js

const crypto = require('crypto');
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const uuid = require('uuid');

// 1. Crypto module - Encrypting string and generating random UUID
function encryptString() {
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update("Hello, Good Morning", 'utf8', 'hex');
  encrypted += cipher.final('hex');
  console.log("Encrypted String: ", encrypted);
}

function generateUUID() {
  const id = uuid.v4();
  console.log("Random UUID: ", id);
}

// 2. Stream module - Read large text file using stream and compare with fs read
function readFileWithStream() {
  const filePath = './largeFile.txt'; // Make sure the file is 1MB or larger
  const startStream = process.hrtime();
  
  const readStream = fs.createReadStream(filePath);
  readStream.on('data', (chunk) => {
    // Handle data
  });
  readStream.on('end', () => {
    const endStream = process.hrtime(startStream);
    console.log(`Time taken to read with stream: ${endStream[0]}s ${endStream[1] / 1000000}ms`);
  });
}

function readFileWithFS() {
  const filePath = './largeFile.txt';
  const startFS = process.hrtime();
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    const endFS = process.hrtime(startFS);
    console.log(`Time taken to read with fs: ${endFS[0]}s ${endFS[1] / 1000000}ms`);
  });
}

// 3. OS module - Print system details
function printSystemDetails() {
  console.log("System Details: ", os.platform(), os.arch(), os.cpus(), os.totalmem(), os.freemem());
}

// 4. Command line arguments to run functions
const args = process.argv.slice(2);

if (args.includes('crypto')) {
  encryptString();
  generateUUID();
}

if (args.includes('stream')) {
  readFileWithStream();
  readFileWithFS();
}

if (args.includes('os')) {
  printSystemDetails();
}
