// Button interactions for Visa Cards
let selectedRating = 0;
let btcRate = 45000;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeButtons();
    fetchBTCRate();
    initializeStarRating();
});

// Initialize all button interactions
function initializeButtons() {
    // Buy now buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            buyNow(this);
        });
    });
    
    // Payment method selection
    setTimeout(() => {
        const btcOption = document.getElementById('btcOption');
        const usdtOption = document.getElementById('usdtOption');
        const copyButton = document.getElementById('copyButton');
        
        if (btcOption) {
            btcOption.addEventListener('click', () => selectPaymentMethod('btc'));
        }
        if (usdtOption) {
            usdtOption.addEventListener('click', () => selectPaymentMethod('usdt'));
        }
        if (copyButton) {
            copyButton.addEventListener('click', copySelectedAddress);
        }
    }, 500);
    
    // Modal close buttons
    document.addEventListener('click', function(e) {
        if (e.target.id === 'paymentModal') {
            closePaymentModal();
        }
        if (e.target.id === 'reviewModal') {
            closeReviewModal();
        }
    });
}

// Buy now functionality
function buyNow(element) {
    const card = element.closest('.product-card');
    
    if (card.classList.contains('sold-out')) {
        showAlert('⚠️ هذا المنتج غير متوفر حالياً', 'error');
        return;
    }
    
    const name = card.querySelector('h3').textContent;
    const image = card.querySelector('img').src;
    const price = card.querySelector('.price').textContent;
    
    openPaymentModal(name, image, price);
}

// Open payment page
function openPaymentModal(name, image, price) {
    // Create URL parameters
    const params = new URLSearchParams({
        name: name,
        price: price,
        image: image
    });
    
    // Calculate window size based on screen
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    const width = Math.min(600, screenWidth * 0.9);
    const height = Math.min(800, screenHeight * 0.9);
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;
    
    // Open payment page in new window/tab
    const paymentWindow = window.open(
        `payment.html?${params.toString()}`,
        'payment',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
    
    // Focus the payment window
    if (paymentWindow) {
        paymentWindow.focus();
    }
}

// Initialize payment buttons
function initializePaymentButtons() {
    const btcOption = document.getElementById('btcOption');
    const usdtOption = document.getElementById('usdtOption');
    const copyButton = document.getElementById('copyButton');
    
    if (btcOption) {
        btcOption.onclick = () => selectPaymentMethod('btc');
    }
    if (usdtOption) {
        usdtOption.onclick = () => selectPaymentMethod('usdt');
    }
    if (copyButton) {
        copyButton.onclick = copySelectedAddress;
    }
}

// Select payment method
function selectPaymentMethod(method) {
    const detailsDiv = document.getElementById('paymentDetails');
    const addressDiv = document.getElementById('walletAddress');
    const copyBtn = document.getElementById('copyButton');
    
    if (method === 'btc') {
        addressDiv.textContent = '1B4QLAxE1ABeyWTab7mivzzH7TS2Tq9YRL';
        copyBtn.style.background = 'linear-gradient(45deg, #f7931e, #ff6b35)';
        copyBtn.setAttribute('data-address', '1B4QLAxE1ABeyWTab7mivzzH7TS2Tq9YRL');
    } else if (method === 'usdt') {
        addressDiv.textContent = 'TQo39kdaRiA32F72C9bihPV742P8Ew9Q8q';
        copyBtn.style.background = 'linear-gradient(45deg, #26a69a, #00c853)';
        copyBtn.setAttribute('data-address', 'TQo39kdaRiA32F72C9bihPV742P8Ew9Q8q');
    }
    
    detailsDiv.style.display = 'block';
    detailsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy selected address
function copySelectedAddress() {
    const address = document.getElementById('copyButton').getAttribute('data-address');
    copyToClipboard(address);
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.transition = 'all 0.3s ease';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Copy to clipboard with enhanced feedback
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Find the button that was clicked and provide visual feedback
        const buttons = document.querySelectorAll('#paymentModal button');
        buttons.forEach(btn => {
            if (btn.onclick && btn.onclick.toString().includes(text)) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '✅ Copied!';
                btn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 2000);
            }
        });
        
        showAlert('✅ Address copied to clipboard!', 'success');
    }).catch(() => {
        showAlert('❌ Failed to copy address', 'error');
    });
}

// Show alert messages
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    const bgColor = type === 'success' ? '#00ff00' : '#ff0000';
    
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10001;
        box-shadow: 0 8px 25px rgba(255,255,255,0.3);
        font-weight: 600;
    `;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}

// Fetch BTC rate
async function fetchBTCRate() {
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        btcRate = data.bpi.USD.rate_float;
    } catch (error) {
        btcRate = 45000;
    }
}

// Review modal functions
function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'flex';
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
    document.getElementById('reviewText').value = '';
    selectedRating = 0;
    updateStars();
}

// Star rating
function initializeStarRating() {
    document.getElementById('starRating').addEventListener('click', function(e) {
        if (e.target.dataset.rating) {
            selectedRating = parseInt(e.target.dataset.rating);
            updateStars();
        }
    });
}

function updateStars() {
    document.querySelectorAll('#starRating span').forEach((star, index) => {
        if (index < selectedRating) {
            star.textContent = '★';
            star.style.color = '#ffd700';
        } else {
            star.textContent = '☆';
            star.style.color = '#666';
        }
    });
}

// Add anonymous review
function addAnonymousReview() {
    const reviewText = document.getElementById('reviewText').value.trim();
    
    if (!reviewText || selectedRating === 0) {
        showAlert('يرجى كتابة تعليق واختيار تقييم', 'error');
        return;
    }
    
    const anonymousId = '#' + Math.floor(Math.random() * 9000 + 1000);
    const colors = ['#00ff00', '#ff6600', '#9d4edd', '#00ffff', '#ffff00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const reviewDiv = document.createElement('div');
    reviewDiv.style.cssText = `
        background: rgba(0,0,0,0.5);
        padding: 20px;
        border-radius: 15px;
        border-left: 4px solid ${randomColor};
        margin-bottom: 20px;
    `;
    
    reviewDiv.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="color: ${randomColor}; font-weight: 600;">👤 مستخدم مجهول ${anonymousId}</span>
            <div style="margin-left: auto; color: #ffd700;">
                ${'★'.repeat(selectedRating)}
            </div>
        </div>
        <p style="color: #ddd; font-style: italic;">"${reviewText}"</p>
        <small style="color: #666;">الآن - تعليق مجهول</small>
    `;
    
    document.getElementById('userReviews').appendChild(reviewDiv);
    closeReviewModal();
    showAlert('✅ تم نشر تعليقك بشكل مجهول!', 'success');
}