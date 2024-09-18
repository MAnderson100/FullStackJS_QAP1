#!/usr/bin/env node

// Define the help message
const helpMessage = `
Usage: password-generator [options]

Generate a random password.

Options:
  --help, -h               Show this help message and exit.
  --length, -l <length>     Length of the password to generate. Must be a positive number. Defaults to 8.
  --numbers, -n             Include numbers in the password.

Examples:
  password-generator                 Generate an 8-character long password.
  password-generator --length 12     Generate a 12-character long password.
  password-generator --numbers        Generate an 8-character long password with numbers.
  password-generator -l 10 -n         Generate a 10-character long password with numbers.
`;

// Get command-line arguments
const args = process.argv.slice(2);

// Display help message if --help or -h is passed
if (args.includes('--help') || args.includes('-h')) {
  console.log(helpMessage);
  process.exit(0);
}

// Initialize default length and options
let length = 8;
let includeNumbers = false;

// Process command-line arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--length' || args[i] === '-l') {
    const parsedLength = parseInt(args[i + 1], 10);
    if (isNaN(parsedLength) || parsedLength <= 0) {
      console.error('Error: Length must be a positive number.');
      console.error('Use --help or -h for usage information.');
      process.exit(1);
    }
    length = parsedLength; // Update length to the provided value
    i++; // Skip the next argument as it is the value for length
  } else if (args[i] === '--numbers' || args[i] === '-n') {
    includeNumbers = true; // Set the flag to include numbers
  }
}

// Function to generate a random password
function generatePassword(length, includeNumbers) {
  const charset = 'abcdefghijklmnopqrstuvwxyz' + (includeNumbers ? '0123456789' : '');
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Generate and output the password
const password = generatePassword(length, includeNumbers);
console.log(password);
