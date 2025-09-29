const fs = require('fs');

let content = fs.readFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', 'utf8');

// Find all product cards and update balance based on price
const productRegex = /<div class="product-card[^>]*>[\s\S]*?<div class="price">\$(\d+)<\/div>[\s\S]*?<\/div>/g;
let matches = [...content.matchAll(productRegex)];

matches.forEach(match => {
    const price = parseInt(match[1]);
    const multiplier = Math.floor(Math.random() * 3) + 7; // 7-9
    const balance = price * multiplier;
    
    const cardContent = match[0];
    const updatedCard = cardContent.replace(
        /<span style="font-size: 1\.4em; color: #00ff00; font-weight: bold;">\$\d+<\/span>/,
        `<span style="font-size: 1.4em; color: #00ff00; font-weight: bold;">$${balance}</span>`
    );
    
    content = content.replace(cardContent, updatedCard);
});

fs.writeFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', content);
console.log('Balance amounts updated to 7-9x price!');