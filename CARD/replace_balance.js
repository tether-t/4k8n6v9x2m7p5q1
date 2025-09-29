// Script to replace Balance with dollar amounts
const fs = require('fs');

let content = fs.readFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', 'utf8');

// Replace all Balance occurrences with random dollar amounts
const amounts = ['$850', '$1250', '$950', '$1580', '$2340', '$780', '$1890', '$3200', '$650', '$4500', '$720', '$2100', '$1350', '$890', '$2750', '$1680', '$3800', '$1120', '$2450', '$990'];
let index = 0;

content = content.replace(/<span style="font-size: 1\.4em; color: #00ff00; font-weight: bold;">Balance<\/span>/g, () => {
    const amount = amounts[index % amounts.length];
    index++;
    return `<span style="font-size: 1.4em; color: #00ff00; font-weight: bold;">${amount}</span>`;
});

fs.writeFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', content);
console.log('Balance replaced with dollar amounts successfully!');