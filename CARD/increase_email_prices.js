const fs = require('fs');

let content = fs.readFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', 'utf8');

// Find products with email OTP and increase price by 30%
const emailOtpRegex = /<div class="product-card[^>]*>[\s\S]*?📧 Email \+ Password Included for OTP[\s\S]*?<div class="price">\$(\d+)<\/div>[\s\S]*?<\/div>/g;

content = content.replace(emailOtpRegex, (match, price) => {
    const currentPrice = parseInt(price);
    const newPrice = Math.round(currentPrice * 1.3);
    return match.replace(`<div class="price">$${price}</div>`, `<div class="price">$${newPrice}</div>`);
});

fs.writeFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', content);
console.log('Email OTP product prices increased by 30%!');