/**
 * HER XV Website Application JavaScript
 * All interactive functionality for the HER XV landing page
 */

// ===========================================
// SMOOTH SCROLL INITIALIZATION
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================================
// MODAL FUNCTIONS
// ===========================================

// Product Modal Function
function openProductModal(largeImageUrl, productTitle, productPrice) {
    document.getElementById('modalProductImage').src = largeImageUrl;
    document.getElementById('modalProductTitle').textContent = productTitle;
    document.getElementById('modalProductPrice').textContent = productPrice;

    // Show the order button for product images
    const orderButton = document.querySelector('#productModal .btn-primary-custom');
    if (orderButton) {
        orderButton.style.display = 'inline-block';
    }

    var productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

// Enhanced modal for new product system
function openProductModalById(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        openProductModal(product.largeImage, product.name, `R${product.price}.00`);
    }
}

// Open Instagram modal for squad member images
function openInstagramModal(imageUrl) {
    // Reuse product modal for Instagram images
    document.getElementById('modalProductImage').src = imageUrl;
    document.getElementById('modalProductTitle').textContent = 'HER XV Squad';
    document.getElementById('modalProductPrice').textContent = 'STRENGTH. STYLE. SQUAD.';

    // Hide the order button for Instagram images
    const orderButton = document.querySelector('#productModal .btn-primary-custom');
    if (orderButton) {
        orderButton.style.display = 'none';
    }

    var productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

// Open chart modal for color palette and size chart
function openChartModal(imageUrl, title) {
    const modalBody = document.querySelector('#productModal .modal-body');
    modalBody.innerHTML = `
        <img src="${imageUrl}" class="img-fluid" alt="${title}">
        <h4 class="text-center mt-3">${title}</h4>
    `;
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// ===========================================
// PRODUCT DATA & CONFIGURATION
// ===========================================
const products = [
    // HER XV VARIANTS
    {
        id: 1,
        name: "Her XV",
        price: 320,
        image: "images/HER_XV_Black.png",
        largeImage: "images/HER_XV_Black.png",
        collection: "Kick Off"
    },
    {
        id: 2,
        name: "Her XV",
        price: 320,
        image: "images/HER_XV_White.resized.png",
        largeImage: "images/HER_XV_White.resized.png",
        collection: "Kick Off"
    },
    // HISTORY MAKERS VARIANTS
    {
        id: 3,
        name: "History Makers",
        price: 320,
        image: "images/HISTORY_MAKERS_White.resized.png",
        largeImage: "images/HISTORY_MAKERS_White.resized.png",
        collection: "Kick Off"
    },
    {
        id: 4,
        name: "History Makers",
        price: 320,
        image: "images/HISTORY_MAKERS_Mint_Green.png",
        largeImage: "images/HISTORY_MAKERS_Mint_Green.png",
        collection: "Kick Off"
    },
    // BLOM SQUAD VARIANTS
    {
        id: 5,
        name: "Blom Squad",
        price: 320,
        image: "images/BLOM_SQUAD_White.resized.png",
        largeImage: "images/BLOM_SQUAD_White.resized.png",
        collection: "Kick Off"
    },
    {
        id: 6,
        name: "Blom Squad",
        price: 320,
        image: "images/BLOM_SQUAD_Dusty_Pink.png",
        largeImage: "images/BLOM_SQUAD_Dusty_Pink.png",
        collection: "Kick Off"
    },
    // RUGBEE HONEY BLACK VARIANTS
    {
        id: 7,
        name: "RugBee Honey Black",
        price: 320,
        image: "images/RUGBEE_HONEY_BLACK_on_White.resized.png",
        largeImage: "images/RUGBEE_HONEY_BLACK_on_White.resized.png",
        collection: "Fun XV"
    },
    {
        id: 8,
        name: "RugBee Honey Black",
        price: 320,
        image: "images/RUGBEE_HONEY_BLACK_Dusty_Pink.png",
        largeImage: "images/RUGBEE_HONEY_BLACK_Dusty_Pink.png",
        collection: "Fun XV"
    },
    // BLOM SQUAD 2.0 VARIANTS
    {
        id: 9,
        name: "Blom Squad 2.0",
        price: 320,
        image: "images/BLOM_SQUAD_2_0_White.png",
        largeImage: "images/BLOM_SQUAD_2_0_White.png",
        collection: "Fun XV"
    },
    {
        id: 10,
        name: "Blom Squad 2.0",
        price: 320,
        image: "images/BLOM_SQUAD_2_0_Dusty_Pink.png",
        largeImage: "images/BLOM_SQUAD_2_0_Dusty_Pink.png",
        collection: "Fun XV"
    },
    {
        id: 11,
        name: "Blom Squad 2.0",
        price: 320,
        image: "images/BLOM_SQUAD_2_0_Mint_Green.png",
        largeImage: "images/BLOM_SQUAD_2_0_Mint_Green.png",
        collection: "Fun XV"
    },
    {
        id: 12,
        name: "Blom Squad 2.0",
        price: 320,
        image: "images/BLOM_SQUAD_2.0_Sky_Blue.png",
        largeImage: "images/BLOM_SQUAD_2_0_Sky_Blue.png",
        collection: "Fun XV"
    },
    // RUGBY GOOSE VARIANTS
    {
        id: 13,
        name: "Rugby Goose",
        price: 320,
        image: "images/RUGBY_GOOSE_White.resized.png",
        largeImage: "images/RUGBY_GOOSE_White.resized.png",
        collection: "Fun XV"
    },
    {
        id: 14,
        name: "Rugby Goose",
        price: 320,
        image: "images/RUGBY_GOOSE_Sky_Blue.png",
        largeImage: "images/RUGBY_GOOSE_Sky_Blue.png",
        collection: "Fun XV"
    },
    {
        id: 15,
        name: "Rugby Goose",
        price: 320,
        image: "images/RUGBY_GOOSE_Mint_Green.png",
        largeImage: "images/RUGBY_GOOSE_Mint_Green.png",
        collection: "Fun XV"
    },
    // RUGBEE TRY BLACK VARIANTS
    {
        id: 16,
        name: "RugBee Try Black",
        price: 320,
        image: "images/RUGBEE_TRY_BLACK_on_White.resized.png",
        largeImage: "images/RUGBEE_TRY_BLACK_on_White.resized.png",
        collection: "Fun XV"
    },
    {
        id: 17,
        name: "RugBee Try Black",
        price: 320,
        image: "images/RUGBEE_TRY_BLACK_Dusty_Pink.png",
        largeImage: "images/RUGBEE_TRY_BLACK_Dusty_Pink.png",
        collection: "Fun XV"
    },
    // MAIDEN COLLECTION (SINGLE COLOR EACH)
    {
        id: 18,
        name: "Wolfie",
        price: 320,
        image: "images/WOLFIE_White.png",
        largeImage: "images/WOLFIE_White.png",
        collection: "Maiden"
    },
    {
        id: 19,
        name: "Kapp",
        price: 320,
        image: "images/KAPP_White.png",
        largeImage: "images/KAPP_White.png",
        collection: "Maiden"
    },
    {
        id: 20,
        name: "Brits",
        price: 320,
        image: "images/BRITS_White.png",
        largeImage: "images/BRITS_White.png",
        collection: "Maiden"
    }
];

// ===========================================
// CART MANAGEMENT SYSTEM
// ===========================================
let cart = [];
let selectedProduct = null;

// Populate product selection grid
function populateProducts() {
    const productGrid = document.getElementById('productSelection');

    products.forEach(product => {
        const productCard = `
            <div class="col-xl-15 col-lg-3 col-md-4 col-sm-6 col-6 mb-2">
                <div class="card h-100 product-select-card-compact" onclick="selectProduct(${product.id})" style="cursor: pointer;">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 120px; object-fit: cover;">
                    <div class="card-body text-center p-1">
                        <h6 class="card-title mb-1 small">${product.name}</h6>
                        <p class="fw-bold mb-0 small">R${product.price}.00</p>
                    </div>
                </div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

// Select product for cart
function selectProduct(productId) {
    selectedProduct = products.find(p => p.id === productId);

    // Update selected product display
    document.getElementById('selectedProductImage').src = selectedProduct.image;
    document.getElementById('selectedProductName').textContent = selectedProduct.name;
    document.getElementById('selectedProductPrice').textContent = `R${selectedProduct.price}.00`;

    // Reset form
    document.getElementById('productSize').value = '';
    document.getElementById('productQuantity').value = 1;
    updateItemTotal();

    // Show add to cart form
    document.getElementById('addToCartForm').style.display = 'block';

    // Highlight selected product
    document.querySelectorAll('.product-select-card, .product-select-card-compact').forEach(card => {
        card.classList.remove('border-primary');
    });
    event.currentTarget.classList.add('border-primary');
}

// Change quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('productQuantity');
    let newQuantity = parseInt(quantityInput.value) + change;

    if (newQuantity >= 1 && newQuantity <= 10) {
        quantityInput.value = newQuantity;
        updateItemTotal();
    }
}

// Update item total
function updateItemTotal() {
    if (selectedProduct) {
        const quantity = parseInt(document.getElementById('productQuantity').value);
        const total = selectedProduct.price * quantity;
        document.getElementById('itemTotal').textContent = `R${total}.00`;
    }
}

// Add product to cart
function addToCart() {
    if (!selectedProduct) return;

    const size = document.getElementById('productSize').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);

    if (!size) {
        alert('Please select a size');
        return;
    }

    const cartItem = {
        id: Date.now(), // Unique cart item ID
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        size: size,
        quantity: quantity,
        image: selectedProduct.image,
        total: selectedProduct.price * quantity
    };

    cart.push(cartItem);
    updateCartDisplay();

    // Reset form
    document.getElementById('addToCartForm').style.display = 'none';
    document.querySelectorAll('.product-select-card, .product-select-card-compact').forEach(card => {
        card.classList.remove('border-primary');
    });
    selectedProduct = null;
}

// Update cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-shopping-cart fa-2x mb-2"></i>
                <p>Your cart is empty</p>
                <small>Select products to get started</small>
            </div>
        `;
        cartTotalDiv.style.display = 'none';
        return;
    }

    let cartHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        grandTotal += item.total;
        cartHTML += `
            <div class="cart-item mb-3 pb-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <img src="${item.image}" style="width: 70px; height: 70px; object-fit: cover;" class="rounded" alt="${item.name}">
                    </div>
                    <div class="col">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">Size: ${item.size} | Qty: ${item.quantity}</small>
                        <p class="mb-0 fw-bold">R${item.total}.00</p>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">×</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = cartHTML;
    document.getElementById('grandTotal').textContent = `R${grandTotal}.00`;
    cartTotalDiv.style.display = 'block';
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCartDisplay();
    }
}

// Clear entire cart (used after successful order)
function clearCartSilent() {
    cart = [];
    updateCartDisplay();
    // Hide add to cart form
    document.getElementById('addToCartForm').style.display = 'none';
    // Remove selected product highlighting
    document.querySelectorAll('.product-select-card, .product-select-card-compact').forEach(card => {
        card.classList.remove('border-primary');
    });
    selectedProduct = null;
}

// ===========================================
// ORDER PROCESSING SYSTEM
// ===========================================

// Send order via AJAX to PHP backend
async function sendOrder() {
    // Validate customer details
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const city = document.getElementById('customerCity').value.trim();
    const notes = document.getElementById('orderNotes').value.trim();
    const website = document.getElementById('website').value; // Honeypot field

    if (!name || !email || !phone || !city) {
        showOrderModal('Error', 'Please fill in all required fields (Name, Email, Phone, City)', 'error');
        return;
    }

    if (cart.length === 0) {
        showOrderModal('Error', 'Your cart is empty. Please add some products first.', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showOrderModal('Error', 'Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = event?.target;
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Processing...';
    }

    try {
        // Prepare order data
        const orderData = {
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            customerCity: city,
            orderNotes: notes,
            website: website, // Honeypot field
            cart: cart
        };

        // Debug: Log order data being sent
        console.log('📤 Sending order data:', orderData);
        console.log('🕐 Request timestamp:', new Date().toISOString());

        // Send to PHP backend with cache-busting parameter
        const cacheBuster = Date.now();
        const response = await fetch(`process-order.php?v=${cacheBuster}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (result.success) {
            // Debug: Log version info from server
            console.log('🔍 Order Processing Debug Info:', {
                version: result.version,
                timestamp: result.timestamp,
                last_updated: result.last_updated,
                order_ref: result.order_ref
            });

            showOrderModal(
                'Order Submitted Successfully!',
                `Thank you, ${name}! Your order ${result.order_ref} has been submitted. We will contact you within 24 hours to confirm and provide payment details.`,
                'success'
            );

            // Clear the form and cart
            clearCartSilent();
            document.getElementById('customerName').value = '';
            document.getElementById('customerEmail').value = '';
            document.getElementById('customerPhone').value = '';
            document.getElementById('customerCity').value = '';
            document.getElementById('orderNotes').value = '';
        } else {
            showOrderModal('Error', result.message || 'There was an error processing your order. Please try again.', 'error');
        }

    } catch (error) {
        console.error('Order submission error:', error);
        showOrderModal(
            'Connection Error',
            'Unable to submit your order. Please check your internet connection and try again, or email us directly at support@herfifteen.co.za',
            'error'
        );
    }

    // Reset submit button
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Order';
    }
}

// Show order result modal
function showOrderModal(title, message, type) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('orderResultModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'orderResultModal';
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="orderResultTitle"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div id="orderResultIcon" class="text-center mb-3"></div>
                        <p id="orderResultMessage"></p>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Set content based on type
    document.getElementById('orderResultTitle').textContent = title;
    document.getElementById('orderResultMessage').textContent = message;

    const iconElement = document.getElementById('orderResultIcon');
    if (type === 'success') {
        iconElement.innerHTML = '<i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>';
        modal.querySelector('.modal-header').className = 'modal-header border-0 bg-success text-white';
    } else {
        iconElement.innerHTML = '<i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem;"></i>';
        modal.querySelector('.modal-header').className = 'modal-header border-0 bg-warning text-dark';
    }

    // Show modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

// ===========================================
// MOBILE NAVBAR SCROLL BEHAVIOR
// ===========================================
let lastScrollTop = 0;
let scrollThreshold = 50;
let isScrolling = false;

function handleScroll() {
    if (window.innerWidth > 768) return; // Only apply on mobile

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar-custom');

    // Add scrolled class for styling
    if (currentScroll > 10) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Hide/show logic
    if (Math.abs(lastScrollTop - currentScroll) <= 5) return; // Avoid micro scrolls

    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        // Scrolling down and past threshold - hide navbar
        navbar.classList.add('navbar-hidden');
    } else if (currentScroll < lastScrollTop) {
        // Scrolling up - show navbar
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
}

// Throttle scroll events for performance
function throttleScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(handleScroll);
        isScrolling = true;
        setTimeout(() => { isScrolling = false; }, 10);
    }
}

// ===========================================
// APPLICATION INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize products
    populateProducts();

    // Bind quantity input listener
    document.getElementById('productQuantity').addEventListener('input', updateItemTotal);

    // Add scroll listener for mobile navbar
    window.addEventListener('scroll', throttleScroll);

    // Show navbar when mobile menu is toggled
    document.querySelector('.navbar-toggler')?.addEventListener('click', function() {
        document.querySelector('.navbar-custom').classList.remove('navbar-hidden');
    });
});