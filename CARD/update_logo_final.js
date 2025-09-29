const fs = require('fs');

let content = fs.readFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', 'utf8');

// Replace PNG with SVG and update icon type
content = content.replace('type="image/png" href="images/LOGO/mastercard-logo-noir-1.png"', 'type="image/svg+xml" href="images/LOGO/mastercard-ultra-red.svg"');

// Replace all logo image sources
content = content.replace(/src="images\/LOGO\/mastercard-logo-noir-1\.png"/g, 'src="images/LOGO/mastercard-ultra-red.svg"');

fs.writeFileSync('C:/Users/ECC/Desktop/CARD/mastercard.html', content);
console.log('MasterCard logo updated to official red version!');