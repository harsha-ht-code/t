<?php
// bad.php - vulnerable to command injection

if (isset($_GET['filename'])) {
    $file = $_GET['filename'];

    // 🚨 Dangerous: user input passed directly to shell command
    $output = shell_exec("cat " . $file);

    echo "<pre>$output</pre>";
}
?>