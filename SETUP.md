# HER XV Email Integration Setup Guide

## Prerequisites

- Web server with PHP 7.4+ support
- Composer installed
- SMTP email account (Gmail recommended for simplicity)

## Installation Steps

### 1. Install Dependencies

```bash
# Install Composer dependencies
composer install
```

This will install:
- PHPMailer for email sending
- vlucas/phpdotenv for environment variable management

### 2. Configure Environment Variables

```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your SMTP credentials
nano .env
```

**For Custom Domain Setup (herfifteen.co.za):**
Use your professional email server with these settings in `.env`:
```
SMTP_HOST=smtp.herfifteen.co.za
SMTP_PORT=465
SMTP_USERNAME=orders@herfifteen.co.za
SMTP_PASSWORD=your-email-password
SMTP_FROM_EMAIL=orders@herfifteen.co.za
SMTP_FROM_NAME="HER XV"
ORDER_TO_EMAIL=orders@herfifteen.co.za
```

**Important Notes:**
- **Port 465**: Uses SSL/TLS encryption (not STARTTLS)
- **Authentication**: Required with your email username and password
- **SSL/TLS**: Must be enabled on your hosting provider

**Alternative SMTP Providers:**
- **Gmail**: `smtp.gmail.com`, port 587, STARTTLS (requires app password)
- **SendGrid**: `smtp.sendgrid.net`, port 587
- **Mailgun**: `smtp.mailgun.org`, port 587
- **SMTP2GO**: `mail.smtp2go.com`, port 2525

### 3. Set Directory Permissions

```bash
# Ensure logs directory is writable
chmod 755 logs/
chmod 644 logs/*.log
```

### 4. Test the Setup

1. Open your website in a browser
2. Add products to cart
3. Fill out the order form
4. Submit an order
5. Check that emails are received by both owner and customer

### 5. Monitoring & Maintenance

**Log Files Location:**
- `logs/orders.log` - Successful orders
- `logs/errors.log` - Email failures and errors
- `logs/spam.log` - Blocked spam attempts

**Regular Maintenance:**
- Monitor log files for errors
- Rotate log files when they get large
- Keep SMTP credentials secure and up to date

## Security Features

### Anti-Spam Protection
- **Honeypot Field**: Hidden field that bots fill but humans don't see
- **Server-side Validation**: All inputs are sanitized and validated
- **Rate Limiting**: Logs help identify potential spam patterns

### Data Protection
- **Environment Variables**: SMTP credentials stored securely in .env file
- **Input Sanitization**: All user inputs are cleaned before processing
- **Error Handling**: Generic error messages don't reveal system details

## Troubleshooting

### Common Issues

**Email Not Sending:**
1. Check SMTP credentials in `.env` file
2. Verify SMTP server settings
3. Check `logs/errors.log` for detailed error messages
4. Ensure server allows outbound SMTP connections

**Form Submission Fails:**
1. Check browser console for JavaScript errors
2. Verify `process-order.php` is accessible
3. Check server error logs
4. Ensure PHP version is 7.4+

**Custom Domain SMTP Issues:**
1. Verify your hosting provider has SSL/TLS enabled for outgoing mail
2. Check that port 465 is not blocked by your server firewall
3. Confirm your email password is correct
4. Test with your hosting provider's webmail to ensure the account works

**Gmail App Password Issues (if using Gmail alternative):**
1. Ensure 2-factor authentication is enabled
2. Generate a new 16-character app password
3. Use the app password, not your regular Gmail password
4. Remove spaces from the app password

### Testing SMTP Settings

Create a simple test file to verify SMTP configuration:

```php
<?php
require_once 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = $_ENV['SMTP_HOST'];
$mail->SMTPAuth = true;
$mail->Username = $_ENV['SMTP_USERNAME'];
$mail->Password = $_ENV['SMTP_PASSWORD'];
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = $_ENV['SMTP_PORT'];

$mail->setFrom($_ENV['SMTP_FROM_EMAIL'], 'Test');
$mail->addAddress($_ENV['ORDER_TO_EMAIL']);
$mail->Subject = 'SMTP Test';
$mail->Body = 'SMTP configuration is working!';

try {
    $mail->send();
    echo 'Test email sent successfully!';
} catch (Exception $e) {
    echo "Test failed: {$mail->ErrorInfo}";
}
?>
```

## Support

For technical issues:
1. Check log files first
2. Verify all setup steps were completed
3. Test with the SMTP test script above
4. Contact your hosting provider for server-specific issues

For business inquiries: herfifteen@gmail.com