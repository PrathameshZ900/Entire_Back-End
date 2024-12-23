const fs = require("fs");
const path = require("path");

const command = process.argv[2]; // Operation command
const target = process.argv[3]; // File or directory target
const content = process.argv.slice(4).join(" "); // Additional content

// Helper to validate file/directory existence
const exists = (filePath) => fs.existsSync(filePath);

try {
  switch (command) {
    case "read":
      if (!exists(target)) {
        console.error("Error: File does not exist.");
      } else {
        const data = fs.readFileSync(target, "utf8");
        console.log("File content:\n" + data);
      }
      break;

    case "delete":
      if (!exists(target)) {
        console.error("Error: File does not exist.");
      } else {
        fs.unlinkSync(target);
        console.log(`File deleted: ${target}`);
      }
      break;

    case "create":
      if (exists(target)) {
        console.error("Error: File already exists.");
      } else {
        fs.writeFileSync(target, content || "", "utf8");
        console.log(`File created: ${target}`);
        if (content) console.log("Content written to file.");
      }
      break;

    case "append":
      if (!exists(target)) {
        console.error("Error: File does not exist.");
      } else {
        fs.appendFileSync(target, content, "utf8");
        console.log(`Content appended to file: ${target}`);
      }
      break;

    case "rename":
      if (!exists(target)) {
        console.error("Error: File does not exist.");
      } else if (!content) {
        console.error("Error: New name not provided.");
      } else {
        const newPath = path.join(path.dirname(target), content);
        fs.renameSync(target, newPath);
        console.log(`File renamed to: ${newPath}`);
      }
      break;

    case "list":
      if (!exists(target) || !fs.lstatSync(target).isDirectory()) {
        console.error("Error: Directory does not exist.");
      } else {
        const files = fs.readdirSync(target);
        console.log("Directory contents:");
        files.forEach((file) => console.log(file));
      }
      break;

    default:
      console.error("Invalid command. Use one of the following:");
      console.log("Commands:");
      console.log("  read <file>             - Read file contents");
      console.log("  delete <file>           - Delete a file");
      console.log("  create <file> <content> - Create a file with optional content");
      console.log("  append <file> <content> - Append content to a file");
      console.log("  rename <file> <newname> - Rename a file");
      console.log("  list <directory>        - List contents of a directory");
  }
} catch (err) {
  console.error("An error occurred:", err.message);
}

