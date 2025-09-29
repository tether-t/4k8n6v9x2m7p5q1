const fs = require('fs');

let content = fs.readFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', 'utf8');

// Extract price and calculate balance (7-9x price)
content = content.replace(/<div class="price">\$(\d+)<\/div>/g, (match, price) => {
    const priceNum = parseInt(price);
    const multiplier = Math.floor(Math.random() * 3) + 7; // 7-9
    const balance = priceNum * multiplier;
    
    // Find and replace the next Balance span
    const nextBalanceIndex = content.indexOf('<span style="font-size: 1.4em; color: #00ff00; font-weight: bold;">$', content.indexOf(match));
    if (nextBalanceIndex !== -1) {
        const endIndex = content.indexOf('</span>', nextBalanceIndex);
        content = content.substring(0, nextBalanceIndex) + 
                 `<span style="font-size: 1.4em; color: #00ff00; font-weight: bold;">$${balance}` + 
                 content.substring(endIndex);
    }
    
    return match;
});

fs.writeFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', content);
console.log('Amounts updated successfully!');