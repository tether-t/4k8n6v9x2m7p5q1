class BitcoinAPI {
    constructor() {
        this.price = 0;
        this.lastUpdate = null;
        this.updateInterval = 30000;
        this.apis = [
            'https://api.coindesk.com/v1/bpi/currentprice/USD.json',
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
            'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
        ];
        this.currentApiIndex = 0;
    }

    async fetchPrice() {
        for (let i = 0; i < this.apis.length; i++) {
            try {
                const response = await fetch(this.apis[this.currentApiIndex]);
                if (!response.ok) throw new Error('API Error');
                
                const data = await response.json();
                let price = 0;

                if (this.currentApiIndex === 0) {
                    price = parseFloat(data.bpi.USD.rate.replace(/,/g, ''));
                } else if (this.currentApiIndex === 1) {
                    price = data.bitcoin.usd;
                } else if (this.currentApiIndex === 2) {
                    price = parseFloat(data.price);
                }

                this.price = price;
                this.lastUpdate = new Date();
                return price;
            } catch (error) {
                this.currentApiIndex = (this.currentApiIndex + 1) % this.apis.length;
            }
        }
        throw new Error('All APIs failed');
    }

    calculateBTC(usdAmount) {
        if (this.price === 0) return 0;
        return (usdAmount / this.price).toFixed(8);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    async startAutoUpdate(callback) {
        try {
            await this.fetchPrice();
            if (callback) callback(this.price);
        } catch (error) {
            console.error('Bitcoin price fetch failed:', error);
        }

        setInterval(async () => {
            try {
                await this.fetchPrice();
                if (callback) callback(this.price);
            } catch (error) {
                console.error('Bitcoin price update failed:', error);
            }
        }, this.updateInterval);
    }
}

window.BitcoinAPI = BitcoinAPI;