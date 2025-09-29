class PaymentSystem {
    constructor() {
        this.btcAPI = new BitcoinAPI();
        this.selectedMethod = null;
        this.productPrice = 0;
        this.addresses = {
            btc: '1B4QLAxE1ABeyWTab7mivzzH7TS2Tq9YRL'
        };
        this.init();
    }

    async init() {
        this.updateProductInfo();
        await this.initBitcoinPrice();
        this.setupEventListeners();
    }

    updateProductInfo() {
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('name') || 'Visa Card €1200';
        const productPrice = urlParams.get('price') || '$185';
        const productImage = urlParams.get('image') || 'images/VISA CARD/istockphoto-1175005292-612x612.jpg';

        document.getElementById('productName').textContent = productName;
        document.getElementById('productPrice').textContent = productPrice;
        document.getElementById('productImage').src = productImage;

        this.productPrice = parseFloat(productPrice.replace('$', ''));

        const instructionsDiv = document.querySelector('.payment-methods div[style*="background: linear-gradient(135deg, rgba(255,0,0,0.1)"]');
        if (instructionsDiv) {
            instructionsDiv.innerHTML = instructionsDiv.innerHTML.replace('${productPrice}', productPrice);
        }
    }

    async initBitcoinPrice() {
        const exampleDiv = document.getElementById('btcExample');
        exampleDiv.innerHTML = 'Updating Bitcoin price...';

        await this.btcAPI.startAutoUpdate((price) => {
            this.updateBitcoinDisplay(price);
        });
    }

    updateBitcoinDisplay(price) {
        document.getElementById('btcExample').innerHTML = 
            `<strong>Instructions:</strong> Use any Bitcoin wallet to send the equivalent amount`;
        
        const lastUpdate = new Date().toLocaleTimeString('en-US');
        document.getElementById('btcExample').title = `Last update: ${lastUpdate}`;
    }

    setupEventListeners() {
        window.selectPayment = (method) => this.selectPayment(method);
        window.copyAddress = () => this.copyAddress();
        window.openVerificationModal = () => this.openVerificationModal();
        window.closeVerificationModal = () => this.closeVerificationModal();
        window.verifyPayment = () => this.verifyPayment();
    }

    selectPayment(method) {
        document.querySelectorAll('.crypto-option').forEach(option => {
            option.classList.remove('selected');
        });

        document.querySelector('.bitcoin-option').classList.add('selected');
        document.getElementById('walletAddress').textContent = this.addresses[method];

        const copyButton = document.querySelector('.copy-button');
        const addressIcon = document.querySelector('.address-icon');
        
        copyButton.style.background = 'linear-gradient(45deg, #f7931e, #ff6b35)';
        copyButton.style.boxShadow = '0 8px 25px rgba(247,147,30,0.3)';
        addressIcon.innerHTML = '<img src="imgs/87496d50-2408-43e1-ad4c-78b47b448a6a.png" style="width: 20px; height: 20px; border-radius: 50%;">';
        addressIcon.style.background = 'linear-gradient(45deg, #f7931e, #ff6b35)';

        document.getElementById('paymentDetails').style.display = 'block';
        document.getElementById('paymentDetails').scrollIntoView({ behavior: 'smooth' });

        this.selectedMethod = method;
    }

    copyAddress() {
        const address = document.getElementById('walletAddress').textContent;
        navigator.clipboard.writeText(address).then(() => {
            const button = document.querySelector('.copy-button');
            const originalText = button.innerHTML;
            button.innerHTML = '<span>✅</span>Copied!';
            button.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = 'linear-gradient(45deg, #f7931e, #ff6b35)';
            }, 2000);
        });
    }

    openVerificationModal() {
        document.getElementById('verificationModal').style.display = 'flex';
    }

    closeVerificationModal() {
        document.getElementById('verificationModal').style.display = 'none';
        document.getElementById('transactionId').value = '';
        document.getElementById('paymentScreenshot').value = '';
    }

    verifyPayment() {
        const txId = document.getElementById('transactionId').value.trim();
        const screenshot = document.getElementById('paymentScreenshot').files[0];
        
        if (!txId) {
            alert('Please enter a transaction ID');
            return;
        }
        
        if (!screenshot) {
            alert('Please upload a payment screenshot');
            return;
        }
        
        const verificationWindow = window.open(
            'verification.html',
            'verification',
            'width=600,height=500,scrollbars=no,resizable=no,centerscreen=yes'
        );
        
        if (verificationWindow) {
            verificationWindow.focus();
        }
        
        this.closeVerificationModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PaymentSystem();
});