# HER XV Order Form Implementation - To-Do List

## Phase 1: Form Structure & Layout ✅ READY TO START

### 1.1 Replace Basic Order Section
- [ ] Replace current "How to Order" section with interactive form
- [ ] Create new HTML structure with Bootstrap 5 grid
- [ ] Add form container with proper styling

### 1.2 Product Selection Interface
- [ ] Create product dropdown/grid selector
- [ ] Add product thumbnails for visual selection
- [ ] Include all 8 products (Kick Off + Fun XV collections)
- [ ] Show product name, price (R399), and image

## Phase 2: Cart Functionality 🛒

### 2.1 Add to Cart System
- [ ] Create "Add to Cart" buttons for each product
- [ ] Implement size selection (XS, S, M, L, XL, XXL)
- [ ] Add quantity input with +/- controls
- [ ] Build cart array to store multiple items

### 2.2 Cart Display & Management
- [ ] Create cart summary section
- [ ] Show selected items with edit/remove options
- [ ] Display running total calculation
- [ ] Add "Clear Cart" functionality

## Phase 3: Customer Details 👤

### 3.1 Contact Form Fields
- [ ] Customer name (required)
- [ ] Email address (required, validated)
- [ ] Phone number (required)
- [ ] Delivery address (optional)
- [ ] Special instructions (optional)

### 3.2 Form Validation
- [ ] JavaScript client-side validation
- [ ] Email format validation
- [ ] Required field checking
- [ ] Phone number format validation

## Phase 4: Price Calculation 💰

### 4.1 Dynamic Pricing
- [ ] Calculate item totals (R399 × quantity)
- [ ] Sum all cart items for grand total
- [ ] Update prices in real-time
- [ ] Display formatted currency (R399.00)

### 4.2 Order Summary
- [ ] Create detailed order breakdown
- [ ] Show each item: name, size, qty, subtotal
- [ ] Display grand total prominently
- [ ] Add order review before sending

## Phase 5: Email Processing 📧

### 5.1 Frontend Email Generation
- [ ] Build complete order details string
- [ ] Format email body with all information
- [ ] Create mailto link with pre-filled content
- [ ] Add customer copy (CC) functionality

### 5.2 PHP Email Processing (Optional Enhancement)
- [ ] Create process-order.php file
- [ ] Set up PHPMailer or native mail() function
- [ ] Send order email to herfifteen@gmail.com
- [ ] Send confirmation copy to customer
- [ ] Add success/error feedback

## Phase 6: User Experience & Validation ✨

### 6.1 Interactive Features
- [ ] Add loading states for form submission
- [ ] Implement success/error messages
- [ ] Add form reset after successful order
- [ ] Include order confirmation modal

### 6.2 Responsive Design
- [ ] Ensure form works on mobile devices
- [ ] Test cart functionality across screen sizes
- [ ] Optimize button sizes for touch
- [ ] Review form layout on tablets

## Phase 7: Testing & Polish 🧪

### 7.1 Functionality Testing
- [ ] Test all product selections
- [ ] Verify cart add/remove operations
- [ ] Check price calculations
- [ ] Test email generation
- [ ] Validate form submissions

### 7.2 Final Improvements
- [ ] Add size guide popup/modal
- [ ] Implement cart item counter
- [ ] Add product stock indicators (if needed)
- [ ] Include estimated delivery information

---

## Technical Stack
- **Frontend**: HTML5, Bootstrap 5, jQuery, JavaScript
- **Backend**: PHP (optional for email processing)
- **Styling**: Custom CSS with existing HER XV theme
- **Email**: mailto links or PHP mail processing

## Key Features Summary
✅ **No login required** - Direct guest ordering  
✅ **Multi-product cart** - Add multiple items to one order  
✅ **Real-time pricing** - Automatic calculations  
✅ **Customer details** - Name, email, phone capture  
✅ **Email ordering** - Send to shop + customer copy  
✅ **Responsive design** - Works on all devices  
✅ **Form validation** - Prevent incomplete orders

---

*Let's tackle this step by step, starting with Phase 1! 🚀*