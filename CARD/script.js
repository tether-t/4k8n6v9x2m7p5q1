// Global Variables
let cart = [];
let products = [
    {
        id: 1,
        name: "بطاقة Amazon $25",
        price: 25,
        category: "gift",
        type: "amazon",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
        discount: 0
    },
    {
        id: 2,
        name: "Worm GPT $50",
        price: 50,
        category: "gaming",
        type: "playstation",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop",
        discount: 15
    },
    {
        id: 3,
        name: "بطاقة Netflix Premium شهر",
        price: 15,
        category: "streaming",
        type: "netflix",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=200&fit=crop",
        discount: 0
    },
    {
        id: 4,
        name: "بطاقة Visa مسبقة الدفع $100",
        price: 100,
        category: "prepaid",
        type: "visa",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
        discount: 5
    },
    {
        id: 5,
        name: "بطاقة Steam $20",
        price: 20,
        category: "gaming",
        type: "steam",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop",
        discount: 10
    },
    {
        id: 6,
        name: "بطاقة MasterCard مسبقة الدفع $50",
        price: 50,
        category: "prepaid",
        type: "mastercard",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop",
        discount: 0
    },
    {
        id: 7,
        name: "بطاقة Google Play $30",
        price: 30,
        category: "gift",
        type: "google",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=300&h=200&fit=crop",
        discount: 8
    },
    {
        id: 8,
        name: "بطاقة Apple Store $100",
        price: 100,
        category: "gift",
        type: "apple",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop",
        discount: 12
    },
    {
        id: 9,
        name: "بطاقة Xbox Live $25",
        price: 25,
        category: "gaming",
        type: "xbox",
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=200&fit=crop",
        discount: 0
    },
    {
        id: 10,
        name: "بطاقة Spotify Premium 3 أشهر",
        price: 30,
        category: "streaming",
        type: "spotify",
        image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=200&fit=crop",
        discount: 20
    }
];

// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const productsGrid = document.getElementById('products-grid');
const tabBtns = document.querySelectorAll('.tab-btn');
const filterItems = document.querySelectorAll('.filter-item');
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChatBtn = document.querySelector('.close-chat');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    startTimer();
    initializeEventListeners();
    initializePremiumCards();
    initializeTheme();
    initializeMobileMenu();
    
    // Show welcome notification after 3 seconds
    setTimeout(() => {
        showNotification('مرحباً بك في Black Store! استكشف أفضل العروض الحصرية', 'social');
    }, 3000);
    
    // Show urgency notification after 10 seconds
    setTimeout(() => {
        showNotification('⚡ عرض البرق: خصم يصل إلى 50% ينتهي خلال ساعات!', 'urgency');
    }, 10000);
    
    // Show scarcity notification after 20 seconds
    setTimeout(() => {
        showNotification('🔥 تحذير: متبقي قطع محدودة من العروض الحصرية!', 'urgency');
    }, 20000);
    
    // Show social proof notification after 30 seconds
    setTimeout(() => {
        showNotification('👥 انضم إلى +127K عميل راضي واحصل على أفضل الأسعار!', 'social');
    }, 30000);
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuToggle || !mobileNavMenu || !mobileOverlay) return;
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileNavMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('show');
        document.body.style.overflow = mobileNavMenu.classList.contains('open') ? 'hidden' : 'auto';
    });
    
    // Close menu when overlay is clicked
    mobileOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Close menu when link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNavMenu.classList.remove('open');
        mobileOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Premium Cards Functionality
function initializePremiumCards() {
    const amountCards = document.querySelectorAll('.amount-card');
    const premiumBtns = document.querySelectorAll('.premium-btn');
    
    let selectedAmount = 100; // Default selection
    let selectedCardType = 'visa'; // Default card type
    
    // Amount selection
    amountCards.forEach(card => {
        card.addEventListener('click', function() {
            amountCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedAmount = parseInt(this.dataset.amount);
            updatePremiumPricing();
        });
    });
    
    // Set default selection
    document.querySelector('.amount-card[data-amount="100"]')?.classList.add('selected');
    
    // Premium button handlers
    premiumBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            selectedCardType = index === 0 ? 'visa' : 'mastercard';
            addPremiumCardToCart(selectedCardType, selectedAmount);
        });
    });
}

function updatePremiumPricing() {
    const discountRate = 0.05; // 5% discount
    const amountCards = document.querySelectorAll('.amount-card');
    
    amountCards.forEach(card => {
        const amount = parseInt(card.dataset.amount);
        const discountedPrice = (amount * (1 - discountRate)).toFixed(2);
        const priceElement = card.querySelector('.price');
        if (priceElement) {
            priceElement.textContent = `$${discountedPrice}`;
        }
    });
}

function addPremiumCardToCart(cardType, amount) {
    const discountRate = 0.05;
    const finalPrice = amount * (1 - discountRate);
    
    const premiumCard = {
        id: Date.now(),
        name: `بطاقة ${cardType.toUpperCase()} مسبقة الدفع $${amount}`,
        price: amount,
        finalPrice: finalPrice,
        category: 'premium',
        type: cardType,
        quantity: 1,
        isPremium: true
    };
    
    const existingItem = cart.find(item => 
        item.type === cardType && 
        item.price === amount && 
        item.isPremium
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(premiumCard);
    }
    
    updateCartUI();
    showNotification(`تم إضافة بطاقة ${cardType.toUpperCase()} بقيمة $${amount} للسلة!`);
    
    // Add premium card animation
    animatePremiumAddition(cardType);
}

function animatePremiumAddition(cardType) {
    const cardElement = document.querySelector(`.${cardType}-card`);
    if (cardElement) {
        cardElement.style.animation = 'premiumPulse 0.6s ease';
        setTimeout(() => {
            cardElement.style.animation = '';
        }, 600);
    }
}

// Event Listeners
function initializeEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Cart functionality
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    
    // Category tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => filterProducts(btn.dataset.tab));
    });
    
    // Quick filters
    filterItems.forEach(item => {
        item.addEventListener('click', () => filterByType(item.dataset.category));
    });
    
    // Chat functionality
    chatToggle.addEventListener('click', toggleChat);
    closeChatBtn.addEventListener('click', toggleChat);
    
    // Advanced dropdown functionality
    const megaItems = document.querySelectorAll('.mega-item');
    megaItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            if (category) {
                filterByType(category);
                showNotification(`تم تطبيق فلتر ${item.querySelector('.item-title').textContent}`);
            }
        });
    });
    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', (e) => searchProducts(e.target.value));
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Product Management
function loadProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'deal-card';
    
    const discountPrice = product.discount > 0 ? 
        (product.price * (1 - product.discount / 100)).toFixed(2) : 
        product.price;
    
    const isImageUrl = product.image.startsWith('http');
    
    card.innerHTML = `
        ${product.discount > 0 ? `<div class="deal-badge">خصم ${product.discount}%</div>` : ''}
        <div class="card-image">
            ${isImageUrl ? 
                `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` + 
                `<i class="fas fa-credit-card" style="display:none;"></i>` :
                `<i class="${product.image}"></i>`
            }
        </div>
        <h3>${product.name}</h3>
        <div class="price">
            ${product.discount > 0 ? `<span class="old-price">$${product.price}</span>` : ''}
            <span class="new-price">$${discountPrice}</span>
        </div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">إضافة للسلة</button>
    `;
    
    return card;
}

function filterProducts(category) {
    // Update active tab
    tabBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${category}"]`).classList.add('active');
    
    // Load filtered products
    loadProducts(category);
}

function filterByType(type) {
    const filteredProducts = products.filter(product => product.type === type);
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function searchProducts(query) {
    if (!query.trim()) {
        loadProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const discountPrice = product.discount > 0 ? 
            (product.price * (1 - product.discount / 100)) : 
            product.price;
        
        cart.push({
            ...product,
            quantity: 1,
            finalPrice: discountPrice
        });
    }
    
    updateCartUI();
    showNotification('تم إضافة المنتج للسلة بنجاح!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888; padding: 2rem;">السلة فارغة</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 1rem;
        `;
        
        cartItem.innerHTML = `
            <div>
                <h4 style="color: #e0e0e0; margin-bottom: 0.5rem;">${item.name}</h4>
                <p style="color: #00ffff;">$${item.finalPrice.toFixed(2)} × ${item.quantity}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button onclick="updateCartQuantity(${item.id}, -1)" style="background: rgba(255,0,0,0.2); border: none; color: white; width: 25px; height: 25px; border-radius: 50%; cursor: pointer;">-</button>
                <span style="color: #e0e0e0; min-width: 20px; text-align: center;">${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, 1)" style="background: rgba(0,255,0,0.2); border: none; color: white; width: 25px; height: 25px; border-radius: 50%; cursor: pointer;">+</button>
                <button onclick="removeFromCart(${item.id})" style="background: rgba(255,0,0,0.3); border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-right: 10px;">حذف</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
}

// Chat System
function toggleChat() {
    chatWindow.classList.toggle('open');
}

// Advanced Dropdown Functions
function filterByType(type) {
    const filteredProducts = products.filter(product => product.type === type);
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; color: #888; padding: 2rem; grid-column: 1/-1;">لا توجد بطاقات من هذا النوع حالياً</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Scroll to products section
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate support response
    setTimeout(() => {
        const responses = [
            'شكرًا لتواصلك معنا! كيف يمكنني مساعدتك؟',
            'سأقوم بمساعدتك فورًا. ما هو استفسارك؟',
            'مرحبًا! فريق الدعم هنا لمساعدتك.',
            'تم استلام رسالتك. سنرد عليك في أقرب وقت ممكن.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'support');
    }, 1000);
}

function addMessage(text, sender) {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.innerHTML = `<span>${text}</span>`;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enhanced Timer for deals
function startTimer() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    let hours = 23, minutes = 59, seconds = 45;
    
    const updateTimer = () => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 23;
                }
            }
        }
        
        // Update individual elements
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Add urgency effects when time is low
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        if (totalSeconds < 3600) { // Less than 1 hour
            document.querySelectorAll('.time-unit').forEach(unit => {
                unit.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
                unit.style.animation = 'urgencyPulse 0.5s ease-in-out infinite';
            });
        } else if (totalSeconds < 7200) { // Less than 2 hours
            document.querySelectorAll('.time-unit').forEach(unit => {
                unit.style.background = 'linear-gradient(135deg, #ff6600, #cc4400)';
            });
        }
    };
    
    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
}

// Enhanced Notifications with Psychology
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    
    let bgColor = 'linear-gradient(45deg, #00ffff, #0080ff)';
    let icon = '✅';
    
    if (type === 'urgency') {
        bgColor = 'linear-gradient(45deg, #ff4444, #cc0000)';
        icon = '⚡';
    } else if (type === 'social') {
        bgColor = 'linear-gradient(45deg, #ff00ff, #cc00cc)';
        icon = '👥';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        box-shadow: 0 8px 25px rgba(0,255,255,0.3);
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 350px;
    `;
    
    notification.innerHTML = `<span style="font-size: 1.2rem;">${icon}</span><span>${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, type === 'urgency' ? 5000 : 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes premiumPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(0, 255, 255, 0.6); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Loyalty Points System
let userPoints = 0;

function addLoyaltyPoints(amount) {
    userPoints += Math.floor(amount);
    updateLoyaltyDisplay();
}

function updateLoyaltyDisplay() {
    // This would update a loyalty points display if we had one
    console.log(`نقاط الولاء الحالية: ${userPoints}`);
}

// Checkout Process
function checkout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
    
    // Add loyalty points (1 point per dollar)
    addLoyaltyPoints(total);
    
    // Simulate checkout process
    showNotification('جاري معالجة الطلب...');
    
    setTimeout(() => {
        showNotification('تم إتمام الشراء بنجاح! شكرًا لك.');
        cart = [];
        updateCartUI();
        toggleCart();
    }, 2000);
}

// Add checkout functionality to button
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});

// Seller Dashboard Functions (Basic)
function openSellerDashboard() {
    // This would open a seller dashboard modal or page
    showNotification('لوحة تحكم البائعين قيد التطوير');
}

// Support Ticket System
function createSupportTicket(subject, message) {
    const ticket = {
        id: Date.now(),
        subject: subject,
        message: message,
        status: 'مفتوح',
        created: new Date().toLocaleString('ar-SA')
    };
    
    // In a real app, this would be sent to a server
    console.log('تذكرة دعم جديدة:', ticket);
    showNotification('تم إنشاء تذكرة الدعم بنجاح!');
}

// Advanced Search with Filters
function advancedSearch(query, filters = {}) {
    let results = products.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
        
        if (filters.category && product.category !== filters.category) return false;
        if (filters.minPrice && product.price < filters.minPrice) return false;
        if (filters.maxPrice && product.price > filters.maxPrice) return false;
        if (filters.hasDiscount && product.discount === 0) return false;
        
        return matchesQuery;
    });
    
    return results;
}

// Price Range Filter
function filterByPriceRange(min, max) {
    const filteredProducts = products.filter(product => 
        product.price >= min && product.price <= max
    );
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Wishlist functionality
let wishlist = [];

function addToWishlist(productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        showNotification('تم إضافة المنتج لقائمة الأمنيات!');
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    showNotification('تم حذف المنتج من قائمة الأمنيات!');
}

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Show notification
    const themeText = newTheme === 'dark' ? 'المظلم' : 'الفاتح';
    showNotification(`تم التبديل إلى الوضع ${themeText}`);
}

function applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.querySelector('#theme-toggle i');
    
    if (theme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }
    

}



// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + K to focus search
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-box input').focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
        if (chatWindow.classList.contains('open')) {
            toggleChat();
        }
    }
});

// Smooth animations on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.deal-card, .filter-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
}

// Add fade in animation CSS
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeStyle);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    initializeCounters();
    addPsychologicalEffects();
});

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current).toLocaleString();
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Enhanced Psychological Effects
function addPsychologicalEffects() {
    // Update scarcity bars dynamically
    updateScarcityBars();
    
    // Update social proof numbers
    updateSocialProof();
}

// Update scarcity bars
function updateScarcityBars() {
    const scarcityBars = document.querySelectorAll('.scarcity-fill');
    
    scarcityBars.forEach(bar => {
        setInterval(() => {
            const currentWidth = parseInt(bar.style.width);
            if (currentWidth > 5 && Math.random() > 0.7) {
                const newWidth = Math.max(5, currentWidth - Math.floor(Math.random() * 3) - 1);
                bar.style.width = newWidth + '%';
                
                // Update text
                const text = bar.nextElementSibling;
                if (text && text.classList.contains('scarcity-text')) {
                    const match = text.textContent.match(/(\d+)/g);
                    if (match && match.length >= 2) {
                        const remaining = Math.floor((newWidth / 100) * parseInt(match[1]));
                        text.textContent = `متبقي ${remaining} من ${match[1]}`;
                    }
                }
            }
        }, Math.random() * 45000 + 15000);
    });
}

// Update social proof numbers
function updateSocialProof() {
    const buyersCount = document.querySelectorAll('.buyers-count');
    
    buyersCount.forEach(count => {
        setInterval(() => {
            const currentText = count.textContent;
            const match = currentText.match(/(\d+)/g);
            if (match) {
                const number = parseInt(match[0]);
                const increase = Math.floor(Math.random() * 5) + 1;
                const newNumber = number + increase;
                count.textContent = currentText.replace(match[0], newNumber);
            }
        }, Math.random() * 60000 + 30000);
    });
}

