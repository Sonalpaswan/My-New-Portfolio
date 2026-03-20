<?php
// Start session
session_start();

// Generate a new CSRF token
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Return the token
echo $_SESSION['csrf_token']; 