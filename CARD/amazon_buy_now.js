// Amazon Buy Now System - Integrated with Advanced Payment
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.add-to-cart');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            
            // Check if product is sold out
            if (productCard.classList.contains('sold-out')) {
                showAlert('⚠️ هذا المنتج غير متوفر حالياً', 'error');
                return;
            }
            
            const productName = productCard.querySelector('h3').textContent;
            const price = productCard.querySelector('.price').textContent;
            const image = productCard.querySelector('img').src;
            
            // Open payment page directly
            openPaymentPage(productName, price, image);
        });
    });
});

// Open payment page function
function openPaymentPage(name, price, image) {
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

// Show alert messages
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    const bgColor = type === 'success' ? '#00ff00' : '#e50914';
    
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
        font-size: 0.9rem;
    `;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}