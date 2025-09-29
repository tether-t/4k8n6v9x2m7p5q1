const fs = require('fs');

let content = fs.readFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', 'utf8');

// Replace all mastercard logo references with red SVG version
content = content.replace(/images\/LOGO\/mastercard-logo-noir-1\.png/g, 'images/LOGO/mastercard-ultra-red.svg');

fs.writeFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', content);
console.log('Logo updated to red SVG version!');