// Script to fix all product titles
document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('h3');
    titles.forEach(title => {
        if (title.textContent.includes('بطاقة MasterCard $')) {
            const text = title.textContent;
            const priceMatch = text.match(/\$(\d+)/);
            if (priceMatch) {
                const price = priceMatch[0];
                title.innerHTML = `MasterCard <span style="font-size: 1.4em; color: #00ff00; font-weight: bold;">${price}</span>`;
            }
        }
    });
});