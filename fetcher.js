const request = require("request");
const fs = require("fs");
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
const URL = process.argv[2];
const localPath = process.argv[3]; 

//Checking if file exists (NOT IMPLEMENTED)
//***********************
// fs.access(localPath, fs.constants.F_OK, (error) => {
//   if (!error) {
//     rl.question(`${localPath} already exists. Would you like to overwrite?    y/n\n`, (answer) => {
//       if (answer === "\u0079") {
//         console.log("Ok, overwriting...");
//         rl.close();
//       }
//       else {
//         console.log("Ok, NOT overwiting.")
//         rl.close();
//       }
//     })
//   }
// });

// Checking if path is writable
fs.access(localPath, fs.constants.W_OK, (error) => {
  console.log(`${localPath} ${error ? 'is not writable' : 'is writable'}`)
});

request(URL, (error, response, data) => {
  if (error) {
    console.log(error, response)
  } else if (response.statusCode < 200 || response.statusCode >= 300) {
    console.log(`Download unsuccessful. HTTP Status Code: ${response.statusCode}`)
  } else {
    fs.writeFile(localPath, data, (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("Success")
    console.log(`Downloaded and saved ${data.length} bytes to ${localPath}`)
    })
  }
});