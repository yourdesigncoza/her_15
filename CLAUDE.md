# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Bootstrap 5 landing page for **HER XV**, a women's rugby apparel brand. The site showcases three product collections with a fully functional e-commerce ordering system.

### Brand Identity
- **Name**: HER XV
- **Tagline**: "STRENGTH. STYLE. SQUAD."
- **Mission**: A movement for women who play bold and live stronger
- **Target**: Women's rugby community and athletic apparel

## Architecture & Structure

### Core Files
- `index.html` - Single-page Bootstrap 5 landing page
- `app.js` - Application JavaScript with cart system and order processing
- `styles.css` - Custom CSS with CSS variables for brand colors
- `phoenix.css` - Additional styling framework
- `process-order.php` - Backend order processing with PHPMailer
- `images/` - Product images, brand assets, and header backgrounds
- `.factory/` or `design-inspiration/` - Reference materials (do not modify)

### CSS Architecture
Uses CSS custom properties for consistent theming:
```css
:root {
    --primary-black: #1a1a1a;
    --primary-white: #ffffff;
    --accent-gray: #f8f9fa;
    --text-gray: #666666;
}
```

### Product Collections
1. **The Kick Off Collection** - 6 products (Her XV, History Makers, Blom Squad variants)
2. **The Fun XV Collection** - 11 products (RugBee Honey, Blom Squad 2.0, Rugby Goose, RugBee Try variants)
3. **The Maiden Collection** - 3 products (Wolfie, Kapp, Brits)

All products are priced at R320.00 and available in sizes S, M, L, XL, XXL.

### Current Implementation Status
- **Completed**: Full interactive order form with cart system, email processing via PHP
- **Email System**: Fully functional with PHPMailer using SMTP
- **Cart System**: Multi-product cart with size/quantity selection

## Key Components

### Product Data Structure
Products are defined in `app.js` in the `products` array (lines 81-250). Each product has:
- `id` - Unique product identifier
- `name` - Product name
- `price` - Price in ZAR (R320)
- `image` & `largeImage` - Image paths
- `collection` - "Kick Off", "Fun XV", or "Maiden"

### Cart System Architecture
The cart system in `app.js` includes:
- `cart[]` - Array storing cart items with id, productId, name, price, size, quantity
- `selectProduct(productId)` - Selects product for adding to cart
- `addToCart()` - Adds selected product with size/quantity to cart
- `removeFromCart(itemId)` - Removes specific item from cart
- `updateCartDisplay()` - Refreshes cart UI with current items and totals
- `clearCart()` - Clears all cart items with confirmation

### Modal Functions
- `openProductModal(largeImageUrl, productTitle, productPrice)` - Opens Bootstrap modal for product viewing
- `openProductModalById(productId)` - Opens modal using product ID from products array
- `openInstagramModal(imageUrl)` - Opens modal for squad/Instagram images
- `openChartModal(imageUrl, title)` - Opens modal for size charts

### Order Processing Flow
1. Frontend validation in `sendOrder()` (app.js:434)
2. AJAX POST to `process-order.php` with JSON payload
3. PHP backend validates, sends emails via PHPMailer
4. Success/error modal displayed to user
5. Cart cleared and form reset on success

### Email System (process-order.php)
- Uses PHPMailer with SMTP configuration from `.env`
- Sends HTML-formatted order confirmation to customer
- Sends detailed order notification to shop owner
- Logs orders to `logs/orders.log`
- Honeypot spam protection via hidden "website" field
- Error logging to `logs/errors.log`

### Mobile Navbar Behavior
Auto-hide navbar on scroll down, show on scroll up (app.js:587-625)
- Only applies to mobile screens (< 768px)
- Throttled scroll event handling for performance

## Development Commands

### Local Development
Open `index.html` directly in browser - no build process required. For PHP functionality:
```bash
# Use PHP built-in server
php -S localhost:8000

# Or configure Apache/XAMPP to serve the directory
```

### Email System Setup
```bash
# Install dependencies
composer install

# Configure environment variables
cp .env.example .env
# Edit .env with SMTP credentials

# Test email configuration
php test-smtp.php  # If available
```

Refer to [SETUP.md](SETUP.md) for complete email configuration guide.

### Logs and Debugging
```bash
# View order logs
tail -f logs/orders.log

# View error logs
tail -f logs/errors.log

# View spam detection logs
tail -f logs/spam.log
```

### Testing Checklist
- Product selection and "Add to Cart" functionality
- Size and quantity selection
- Cart item addition/removal
- Cart total calculations (R320 × quantity)
- Customer form validation (name, email, phone, city required)
- Order submission and email delivery
- Mobile responsive design and navbar behavior
- Modal functionality for products, charts, and Instagram images

## Key JavaScript Functions (app.js)

### Modal Functions
```javascript
openProductModal(largeImageUrl, productTitle, productPrice)  // General product modal
openProductModalById(productId)                               // Open by product ID
openInstagramModal(imageUrl)                                 // Squad member images
openChartModal(imageUrl, title)                              // Size/color charts
```

### Cart Functions
```javascript
populateProducts()              // Initialize product grid on page load
selectProduct(productId)        // Select product for adding to cart
addToCart()                     // Add selected product to cart
removeFromCart(itemId)          // Remove item from cart
clearCart()                     // Clear cart with confirmation
updateCartDisplay()             // Refresh cart UI
changeQuantity(change)          // Increment/decrement quantity
updateItemTotal()               // Recalculate item total
```

### Order Processing
```javascript
sendOrder()                     // Validate and submit order via AJAX
showOrderModal(title, message, type)  // Display success/error modal
```

## Technical Stack

### Frontend
- **HTML5** - Semantic markup with Bootstrap 5 components
- **Bootstrap 5** - Via CDN (v5.3.2)
- **JavaScript** - Vanilla JS (no jQuery despite original plan)
- **Font Awesome** - Icons (v6.4.0)
- **Google Fonts** - Montserrat font family

### Backend
- **PHP 7.4+** - Server-side processing
- **PHPMailer** - SMTP email sending (installed via Composer)
- **vlucas/phpdotenv** - Environment variable management

### File Structure
```
/
├── index.html              # Main landing page
├── app.js                  # Application JavaScript
├── styles.css              # Custom styles
├── phoenix.css             # Additional framework styles
├── process-order.php       # Order processing backend
├── composer.json           # PHP dependencies
├── .env                    # SMTP configuration (not in git)
├── SETUP.md               # Email setup guide
├── To-Do.md               # Development roadmap (may be outdated)
├── images/                # Product and brand images
│   ├── instagram/         # Squad member images
│   └── *.png             # Product images
├── logs/                  # Application logs
│   ├── orders.log
│   ├── errors.log
│   └── spam.log
└── vendor/                # Composer dependencies
```

## Important Notes

### Adding New Products
1. Add product object to `products` array in `app.js` (lines 81-250)
2. Add corresponding HTML card in `index.html` with correct `onclick="openProductModalById(X)"`
3. Ensure product images exist in `images/` directory
4. Update product count in this documentation

### Modifying Email Templates
Email templates are hardcoded in `process-order.php`. To modify:
1. Edit HTML structure in the `$mail->Body` sections
2. Maintain responsive email design
3. Test emails across email clients

### Contact Information
- **Support Email**: support@herfifteen.co.za
- **Instagram**: @herfifteenxv
- **Order Email**: Configured in `.env` file (typically orders@herfifteen.co.za)