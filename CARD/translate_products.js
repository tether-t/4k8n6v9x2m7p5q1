// Script to translate product section to English
document.addEventListener('DOMContentLoaded', function() {
    // Translate OTP tags
    const otpTags = document.querySelectorAll('.no-otp-tag');
    otpTags.forEach(tag => {
        if (tag.textContent.includes('خالية من OTP')) {
            tag.innerHTML = '🔓 OTP Free';
        }
        if (tag.textContent.includes('بدون OTP - مميزة')) {
            tag.innerHTML = '✨ OTP Free - Premium';
        }
        if (tag.textContent.includes('بدون قيود - مميز')) {
            tag.innerHTML = '⚡ No Limits - Premium';
        }
    });
    
    // Translate buy buttons
    const buyButtons = document.querySelectorAll('.add-to-cart');
    buyButtons.forEach(button => {
        if (button.textContent.includes('شراء الآن')) {
            button.textContent = 'Buy Now';
        }
    });
    
    // Translate featured badges
    const featuredBadges = document.querySelectorAll('.featured-badge');
    featuredBadges.forEach(badge => {
        if (badge.textContent.includes('عرض مميز')) {
            badge.textContent = 'Featured Deal';
        }
    });
});