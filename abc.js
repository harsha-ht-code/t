// // vulnerable.js

// const express = require('express');
// const { exec } = require('child_process');

// const app = express();

// app.get('/ping', (req, res) => {
//   const ip = req.query.ip;

//   // 🚨 HIGH-RISK: untrusted user input passed directly into shell command
//   exec(`ping -c 1 ${ip}`, (error, stdout, stderr) => {
//     if (error) {
//       res.status(500).send(`Error: ${error.message}`);
//       return;
//     }
//     res.send(`<pre>${stdout}</pre>`);
//   });
// });



// app.listen(3000, () => console.log('Server running on http://localhost:3000'));