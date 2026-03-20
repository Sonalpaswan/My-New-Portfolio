<?php
// Start session for CSRF protection
session_start();

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "0";
    exit;
}

// Validate CSRF token
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    echo "0";
    exit;
}

// Sanitize and validate input
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "0";
    exit;
}

// Check if required fields are empty
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo "0";
    exit;
}

// Set up email headers
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: ' . $email . "\r\n";

// Prepare email body
$mail_body = "<html><body>";
$mail_body .= "<h2>Contact Form Submission</h2>";
$mail_body .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
$mail_body .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
$mail_body .= "<p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>";
$mail_body .= "<p><strong>Message:</strong> " . nl2br(htmlspecialchars($message)) . "</p>";
$mail_body .= "</body></html>";

// Send email to site owner
$to = "ayush@example.com"; // Replace with your actual email
$email_subject = "Portfolio Contact: " . $subject;

if (mail($to, $email_subject, $mail_body, $headers)) {
    // Prepare auto-reply email
    $thanks_mail_body = "<html><body>";
    $thanks_mail_body .= "<h2>Thank you for contacting me!</h2>";
    $thanks_mail_body .= "<p>Hello " . htmlspecialchars($name) . ",</p>";
    $thanks_mail_body .= "<p>Thank you for reaching out. I have received your message and will get back to you as soon as possible.</p>";
    $thanks_mail_body .= "<p>Best regards,<br>Ayush</p>";
    $thanks_mail_body .= "</body></html>";
    
    // Set up auto-reply headers
    $reply_headers  = 'MIME-Version: 1.0' . "\r\n";
    $reply_headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
    $reply_headers .= 'From: Ayush <ayush@example.com>' . "\r\n";
    
    // Send auto-reply
    mail($email, "Thank you for contacting me", $thanks_mail_body, $reply_headers);
    
    // Success response
    echo "1";
} else {
    // Error response
    echo "0";
}
