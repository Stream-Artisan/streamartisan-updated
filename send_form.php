<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Simple configuration
$to_email = 'services@streamartisan.com';
$from_email = 'noreply@streamartisan.com'; // Must be YOUR domain, not external

// If you don't have noreply@streamartisan.com set up, use:
// $from_email = 'services@streamartisan.com';

// Simple functions
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function send_email($to, $subject, $message, $headers) {
    // Add more headers for better delivery
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Priority: 3\r\n";
    
    return mail($to, $subject, $message, $headers);
}

// Handle forms
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Newsletter subscription
    if (isset($_POST['newsletter_email']) || isset($_POST['Email'])) {
        $email = sanitize_input($_POST['newsletter_email'] ?? $_POST['Email']);
        
        if (!validate_email($email)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email address']);
            exit;
        }
        
        $subject = 'New Newsletter Subscription';
        $message = "New newsletter subscription from: $email";
        $headers = "From: $from_email\r\n";
        
        if (send_email($to_email, $subject, $message, $headers)) {
            echo json_encode(['success' => true, 'message' => 'Newsletter subscription successful!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to subscribe. Please try again.']);
        }
        
    } else {
        // Contact form
        $name = sanitize_input($_POST['name'] ?? '');
        $email = sanitize_input($_POST['email'] ?? '');
        $phone = sanitize_input($_POST['phone'] ?? '');
        $message_text = sanitize_input($_POST['message'] ?? '');
        
        // Simple validation
        if (empty($name) || empty($email) || empty($message_text)) {
            echo json_encode(['success' => false, 'message' => 'Please fill all required fields']);
            exit;
        }
        
        if (!validate_email($email)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email address']);
            exit;
        }
        
        $subject = 'New Contact Form Message';
        $email_message = "
        Name: $name
        Email: $email
        Phone: $phone
        Message: $message_text
        ";
        
        $headers = "From: $from_email\r\n";
        $headers .= "Reply-To: $email\r\n";
        
        if (send_email($to_email, $subject, $email_message, $headers)) {
            echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
        }
    }
    
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>




