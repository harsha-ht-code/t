// vulnerable.js
//
// 1. Command-injection demo (js/command-execution)
// 2. Dangerous eval demo (js/dangerous-eval)
// 3. Bonus: a hard-coded GitHub token string so your secrets-scanner lights up

const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// ---------- 1) COMMAND INJECTION ----------
app.post('/run', (req, res) => {
  const cmd = req.body.cmd;              // ⚠️ unsanitised user input
  exec(cmd, (err, out, errOut) => {      // CodeQL will flag this line
    if (err) return res.status(500).send(errOut);
    res.send(out);
  });
});


// ---------- 2) DANGEROUS EVAL ----------
app.get('/eval', (req, res) => {
  const code = req.query.code;           // ⚠️ unsanitised user input
  res.send(eval(code));                  // CodeQL will flag this line
});



// ---------- 3) LEAKED SECRET ----------
const SECRET_GH_PAT = "ghp_1234567890abcdef1234567890abcdef"; // gitleaks / push-protection

app.listen(3000, () => console.log('Test app listening on :3000'));
