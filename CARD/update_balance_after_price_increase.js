const fs = require('fs');

let content = fs.readFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', 'utf8');

// Update balance amounts for products with increased prices
const emailOtpRegex = /<div class="product-card[^>]*>([\s\S]*?)📧 Email \+ Password Included for OTP([\s\S]*?)<div class="price">\$(\d+)<\/div>([\s\S]*?)<\/div>/g;

content = content.replace(emailOtpRegex, (match, before, middle, price, after) => {
    const currentPrice = parseInt(price);
    const multiplier = Math.floor(Math.random() * 3) + 7; // 7-9
    const newBalance = currentPrice * multiplier;
    
    const updatedMatch = match.replace(
        /<span style="font-size: 1\.4em; color: #00ff00; font-weight: bold;">\$\d+<\/span>/,
        `<span style="font-size: 1.4em; color: #00ff00; font-weight: bold;">$${newBalance}</span>`
    );
    
    return updatedMatch;
});

fs.writeFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', content);
console.log('Balance amounts updated for email OTP products!');