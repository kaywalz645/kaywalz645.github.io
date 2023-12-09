// server.js
const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.static("public"));
// Set the "final" folder as the static content root
// app.use(express.static(path.join(__dirname, 'Final')));

// Method to serve index.html file for a specific folder
// function serveFolder(folderName) {
//   return (req, res) => {
//     const filePath = path.join(__dirname, 'Final', folderName, 'index.html');
//     res.sendFile(filePath);
//   };
// }

// // Method to serve styles.css file for a specific folder
// function serveStyles(folderName) {
//   return (req, res) => {
//     const filePath = path.join(__dirname, 'Final', folderName, 'styles.css');
//     res.sendFile(filePath);
//   };
// }

// // Method to serve script.js file for a specific folder
// function serveScript(folderName) {
//   return (req, res) => {
//     const filePath = path.join(__dirname, 'Final', folderName, 'script.js');
//     res.sendFile(filePath);
//   };
// }

// Set up routes for each folder
// app.get('/joinOurTeam', serveFolder('joinOurTeam'));
// app.get('/joinOurTeam/styles.css', serveStyles('joinOurTeam'));
// app.get('/joinOurTeam/script.js', serveScript('joinOurTeam'));

// app.get('/contactUs', serveFolder('contactUs'));
// app.get('/contactUs/styles.css', serveStyles('contactUs'));
// app.get('/contactUs/script.js', serveScript('contactUs'));

// Start the server
app.listen(3000, () => {
  console.log(`Listening`);
});