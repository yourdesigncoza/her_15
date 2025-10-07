# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Bootstrap 5 landing page for **HER XV**, a women's rugby apparel brand. The site showcases two product collections and includes an e-commerce ordering system.

### Brand Identity
- **Name**: HER XV  
- **Tagline**: "STRENGTH. STYLE. SQUAD."
- **Mission**: A movement for women who play bold and live stronger
- **Target**: Women's rugby community and athletic apparel

## Architecture & Structure

### Core Files
- `index.html` - Single-page Bootstrap 5 landing page
- `styles.css` - Custom CSS with CSS variables for brand colors
- `images/` - Product images, brand assets, and header backgrounds
- `design-inspiration/` - Reference materials (do not modify)

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
1. **The Kick Off Collection** - 4 core products (black, white, hoodie, essentials)
2. **The Fun XV Collection** - 4 colorful variants with different hex colors

All products are priced at R399.00 and available in sizes XS-XXL.

### Current Implementation Status
- **Completed**: Static landing page with product showcase, hero section, about section
- **In Progress**: Interactive order form system (see To-Do.md)
- **Email System**: Currently mailto links, PHP processing planned

## Key Components

### Product Modal System
- JavaScript function: `openProductModal(imageUrl, title, price)`
- Bootstrap 5 modal for enlarged product views
- Square image format (500x500px cards, 1200x1200px modals)

### Image Management
- Hero background: `images/header.png`
- Placeholder images: `placehold.co` service for development
- Square aspect ratio enforced with `aspect-ratio: 1` CSS

### Responsive Design
- Bootstrap 5 grid: `col-md-3 col-sm-6` for product cards
- Mobile-first approach with responsive images using `srcset`

## Order Form Development

Refer to `To-Do.md` for the complete implementation roadmap. Key phases:

1. **Form Structure** - Replace basic "How to Order" section
2. **Cart System** - Multi-product cart with add/remove functionality  
3. **Customer Details** - Name, email, phone capture with validation
4. **Price Calculation** - Real-time totals (R399 × quantity)
5. **Email Processing** - Frontend mailto or PHP backend options

### Technical Stack for Order System
- Frontend: Bootstrap 5, jQuery, JavaScript
- Backend: PHP (optional for email processing)
- No user authentication required

## Contact Integration
- **Email**: herfifteen@gmail.com
- **Instagram**: @herfifteenxv
- All orders processed via email (no payment gateway)

## Development Notes

### Image Requirements
- Product images should be square (1:1 aspect ratio)
- Card images: 500x500px optimal
- Modal images: 1200x1200px for detail views
- Use responsive `srcset` for performance

### Brand Compliance
- Maintain athletic, bold aesthetic
- Use Montserrat font family
- Follow existing color scheme and spacing patterns
- Keep messaging focused on community and empowerment

### Email Integration
Current system uses pre-filled mailto links. PHP enhancement planned to include:
- Order confirmation emails to customer
- Formatted order details to shop email
- Form validation and error handling

## Development Commands

### Local Development
- Open `index.html` directly in browser (no build process required)
- Use Live Server extension in VS Code for auto-reload during development

### Testing
- Manual testing in browser for responsive design
- Test modal functionality: `openProductModal(imageUrl, title, price)`
- Test chart modal: `openChartModal(imageUrl, title)`
- Verify email links work correctly with mailto system

## Key JavaScript Functions

### Product Modal System
```javascript
openProductModal(largeImageUrl, productTitle, productPrice)
openProductModalById(productId)
openChartModal(imageUrl, title)
```

### Implementation Notes
- Bootstrap 5 modals are used for product enlargement and charts
- Smooth scrolling implemented for anchor navigation
- No build system - direct HTML/CSS/JS development
- Uses CDN for Bootstrap 5 and Google Fonts
- Phoenix CSS (`phoenix.css`) provides additional styling framework

### File Dependencies
- **CSS Files**: `styles.css` (custom), `phoenix.css` (framework)
- **JavaScript**: Inline scripts in `index.html` (no external JS files)
- **Images**: Located in `images/` with subdirectories for resized variants
- **Task Planning**: Reference `To-Do.md` for order form implementation roadmap