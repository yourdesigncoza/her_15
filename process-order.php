<?php
/**
 * HER XV Order Processing System
 * Processes order forms and sends emails via PHPMailer with SMTP
 */

// Version tracking for cache debugging
define('PROCESS_ORDER_VERSION', '2.1.0');
define('LAST_UPDATED', '2025-09-16 14:05:00');

// Clear any PHP OPCache if enabled
if (function_exists('opcache_reset')) {
    opcache_reset();
}

// Add cache-busting headers
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('X-Process-Order-Version: ' . PROCESS_ORDER_VERSION);
header('X-Last-Updated: ' . LAST_UPDATED);

require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Set response header for JSON
header('Content-Type: application/json');

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Initialize logging
function writeLog($type, $message, $data = null) {
    if (!$_ENV['ENABLE_LOGGING'] || $_ENV['ENABLE_LOGGING'] !== 'true') {
        return;
    }

    $logDir = $_ENV['LOG_DIRECTORY'] ?? 'logs';
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }

    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $logEntry = "[$timestamp] [IP: $ip] $message";

    if ($data) {
        $logEntry .= " | Data: " . json_encode($data);
    }

    $logEntry .= PHP_EOL;

    $filename = "$logDir/$type.log";
    file_put_contents($filename, $logEntry, FILE_APPEND | LOCK_EX);
}

try {
    // Log version info for debugging
    writeLog('orders', "Process Order starting", [
        'version' => PROCESS_ORDER_VERSION,
        'last_updated' => LAST_UPDATED,
        'timestamp' => date('Y-m-d H:i:s')
    ]);

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        throw new Exception('Invalid JSON input');
    }

    // Anti-spam: Check honeypot field
    if (!empty($input['website'])) {
        writeLog('spam', 'Honeypot field filled - likely spam', $input);
        // Don't reveal it's a honeypot, just say generic error
        echo json_encode(['success' => false, 'message' => 'There was an error processing your order. Please try again.']);
        exit;
    }

    // Validate required fields
    $required = ['customerName', 'customerEmail', 'customerPhone', 'cart'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Validate email format
    if (!filter_var($input['customerEmail'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }

    // Validate cart has items
    if (!is_array($input['cart']) || empty($input['cart'])) {
        throw new Exception('Cart is empty');
    }

    // Validate each cart item has required fields
    foreach ($input['cart'] as $index => $cartItem) {
        $requiredCartFields = ['name', 'size', 'quantity', 'total'];
        foreach ($requiredCartFields as $field) {
            if (!isset($cartItem[$field]) || empty($cartItem[$field])) {
                throw new Exception("Cart item $index missing required field: $field");
            }
        }

        // Validate data types
        if (!is_numeric($cartItem['quantity']) || $cartItem['quantity'] < 1) {
            throw new Exception("Cart item $index has invalid quantity");
        }

        if (!is_numeric($cartItem['total']) || $cartItem['total'] <= 0) {
            throw new Exception("Cart item $index has invalid total");
        }
    }

    // Sanitize input data
    $customerName = htmlspecialchars(trim($input['customerName']), ENT_QUOTES, 'UTF-8');
    $customerEmail = filter_var(trim($input['customerEmail']), FILTER_SANITIZE_EMAIL);
    $customerPhone = htmlspecialchars(trim($input['customerPhone']), ENT_QUOTES, 'UTF-8');
    $customerCity = htmlspecialchars(trim($input['customerCity'] ?? ''), ENT_QUOTES, 'UTF-8');
    $orderNotes = htmlspecialchars(trim($input['orderNotes'] ?? ''), ENT_QUOTES, 'UTF-8');
    $cart = $input['cart'];

    // Generate order reference
    $orderRef = 'HER' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));

    // Debug: Log received cart data
    writeLog('orders', "Cart data received", $cart);

    // Calculate totals
    $grandTotal = 0;
    foreach ($cart as $index => $item) {
        // Debug: Log each item before processing
        writeLog('orders', "Processing cart item $index", $item);

        $cart[$index]['name'] = htmlspecialchars($item['name'], ENT_QUOTES, 'UTF-8');
        $cart[$index]['size'] = htmlspecialchars($item['size'], ENT_QUOTES, 'UTF-8');
        $cart[$index]['quantity'] = (int)$item['quantity'];
        $cart[$index]['total'] = (float)$item['total'];
        $grandTotal += $cart[$index]['total'];

        // Debug: Log each item after processing
        writeLog('orders', "Processed cart item $index", $cart[$index]);
    }

    // Create PHPMailer instances
    $ownerMail = new PHPMailer(true);
    $customerMail = new PHPMailer(true);

    // Configure SMTP for both emails
    $configureMailer = function($mail) {
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];

        // Use appropriate encryption based on port
        if ($_ENV['SMTP_PORT'] == '465') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL for port 465
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // STARTTLS for port 587
        }

        $mail->Port = $_ENV['SMTP_PORT'];
        $mail->CharSet = 'UTF-8';
    };

    $configureMailer($ownerMail);
    $configureMailer($customerMail);

    // Build order items HTML
    $orderItemsHtml = '';
    $itemIndex = 0;
    foreach ($cart as $item) {
        // Debug: Log item being processed for HTML
        writeLog('orders', "Building HTML for item $itemIndex", [
            'name' => $item['name'],
            'size' => $item['size'],
            'quantity' => $item['quantity'],
            'total' => $item['total']
        ]);

        $orderItemsHtml .= "
            <tr>
                <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$item['name']}</td>
                <td style='padding: 10px; border-bottom: 1px solid #ddd; text-align: center;'>{$item['size']}</td>
                <td style='padding: 10px; border-bottom: 1px solid #ddd; text-align: center;'>{$item['quantity']}</td>
                <td style='padding: 10px; border-bottom: 1px solid #ddd; text-align: right;'>R" . number_format($item['total'], 2) . "</td>
            </tr>";

        $itemIndex++;
    }

    // Debug: Log final HTML
    writeLog('orders', "Generated order items HTML", ['html_length' => strlen($orderItemsHtml)]);

    // Owner email
    $ownerMail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['ORDER_FROM_NAME']);
    $ownerMail->addAddress($_ENV['ORDER_TO_EMAIL']);
    $ownerMail->Subject = "New HER XV Order - $orderRef - $customerName";

    $ownerMail->isHTML(true);
    $ownerMail->Body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; }
        .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .order-info { background: #f8f9fa; padding: 15px; margin: 15px 0; border-left: 4px solid #1a1a1a; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #1a1a1a; color: white; padding: 12px; text-align: left; }
        .total-row { font-weight: bold; background: #f8f9fa; }
    </style>
</head>
<body>
    <div class='header'>
        <h1>HER XV</h1>
        <h2>New Order Received</h2>
    </div>

    <div class='content'>
        <div class='order-info'>
            <h3>Order Reference: $orderRef</h3>
            <p><strong>Date:</strong> " . date('Y-m-d H:i:s') . "</p>
            <p><strong>Customer IP:</strong> " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "</p>
        </div>

        <h3>Customer Details</h3>
        <p><strong>Name:</strong> $customerName</p>
        <p><strong>Email:</strong> $customerEmail</p>
        <p><strong>Phone:</strong> $customerPhone</p>
        " . ($customerCity ? "<p><strong>City:</strong> $customerCity</p>" : "") . "

        <h3>Order Details</h3>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                $orderItemsHtml
                <tr class='total-row'>
                    <td colspan='3' style='padding: 12px; text-align: right;'><strong>GRAND TOTAL:</strong></td>
                    <td style='padding: 12px; text-align: right;'><strong>R" . number_format($grandTotal, 2) . "</strong></td>
                </tr>
            </tbody>
        </table>

        " . ($orderNotes ? "<h3>Special Instructions</h3><p>$orderNotes</p>" : "") . "

        <p style='margin-top: 30px; padding: 15px; background: #fff2d5; border: 1px solid #e5780b;'>
            <strong>Next Steps:</strong> Please contact the customer within 24 hours to confirm the order and provide payment/delivery details.
        </p>
    </div>
</body>
</html>";

    // Customer confirmation email
    $customerMail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
    $customerMail->addAddress($customerEmail, $customerName);
    $customerMail->Subject = "Order Confirmation - $orderRef - HER XV";

    $customerMail->isHTML(true);
    $customerMail->Body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; }
        .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .confirmation { background: #d4edda; padding: 15px; margin: 15px 0; border: 1px solid #c3e6cb; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #1a1a1a; color: white; padding: 12px; text-align: left; }
        .total-row { font-weight: bold; background: #f8f9fa; }
        .next-steps { background: #fff2d5; padding: 15px; margin: 20px 0; border: 1px solid #e5780b; border-radius: 5px; }
    </style>
</head>
<body>
    <div class='header'>
        <h1>HER XV</h1>
        <p>STRENGTH. STYLE. SQUAD.</p>
    </div>

    <div class='content'>
        <div class='confirmation'>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order, $customerName! Your order has been received and is being processed.</p>
        </div>

        <h3>Order Reference: $orderRef</h3>
        <p><strong>Order Date:</strong> " . date('Y-m-d H:i:s') . "</p>

        <h3>Your Order Details</h3>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                $orderItemsHtml
                <tr class='total-row'>
                    <td colspan='3' style='padding: 12px; text-align: right;'><strong>TOTAL:</strong></td>
                    <td style='padding: 12px; text-align: right;'><strong>R" . number_format($grandTotal, 2) . "</strong></td>
                </tr>
            </tbody>
        </table>

        " . ($orderNotes ? "<h3>Your Special Instructions</h3><p>$orderNotes</p>" : "") . "

        <div class='next-steps'>
            <h3>What happens next?</h3>
            <ul>
                <li>We will contact you within 24 hours to confirm your order</li>
                <li>Payment details will be provided via email or phone</li>
                <li>Orders are delivered via PUDO collection points</li>
                <li>Typical delivery time is 2-3 business days</li>
            </ul>
            <p><strong>Questions?</strong> Email us at herfifteen@gmail.com or follow us on Instagram @herfifteenxv</p>
        </div>

        <p style='text-align: center; margin-top: 30px; color: #666;'>
            Thank you for supporting women's rugby!<br>
            <strong>HER XV Team</strong>
        </p>
    </div>
</body>
</html>";

    // Send emails
    $ownerMail->send();
    $customerMail->send();

    // Log successful order
    writeLog('orders', "Order processed successfully - $orderRef", [
        'order_ref' => $orderRef,
        'customer' => $customerName,
        'email' => $customerEmail,
        'total' => $grandTotal,
        'items_count' => count($cart)
    ]);

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Order submitted successfully!',
        'order_ref' => $orderRef,
        'version' => PROCESS_ORDER_VERSION,
        'timestamp' => date('Y-m-d H:i:s'),
        'last_updated' => LAST_UPDATED
    ]);

} catch (Exception $e) {
    // Log error
    writeLog('errors', 'Order processing error: ' . $e->getMessage(), $input ?? []);

    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'There was an error processing your order. Please try again or contact us directly.'
    ]);
}
?>