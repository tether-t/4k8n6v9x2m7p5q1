// Script to update all remaining products
// This will be used as reference for manual updates

const normalProduct = `
                        <div class="dark-badges">
                            <span class="verified-badge">🔒 متاح</span>
                            <span class="instant-badge">⚡ فوري</span>
                        </div>
                        <div class="rating-only">
                            <i class="fas fa-star"></i>
                            <span>RATING/5</span>
                        </div>
`;

const soldOutProduct = `
                        <div class="dark-badges">
                            <span class="unavailable-badge">⚠️ غير متاح</span>
                            <span class="restock-badge">🔄 قريباً</span>
                        </div>
                        <div class="rating-only">
                            <i class="fas fa-star"></i>
                            <span>RATING/5</span>
                        </div>
`;

const featuredProduct = `
                        <div class="dark-badges">
                            <span class="premium-badge">🏆 مميز</span>
                            <span class="verified-badge">🔒 موثق</span>
                            <span class="instant-badge">⚡ فوري</span>
                        </div>
                        <div class="rating-only">
                            <i class="fas fa-star"></i>
                            <span>RATING/5</span>
                        </div>
`;