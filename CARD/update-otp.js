// Script to update all OTP-related text to English
const updates = [
    // Product descriptions
    { old: "✨ <strong style=\"color: #00ff00;\">بطاقة مميزة للمشتريات اليومية</strong><br>", new: "✨ <strong style=\"color: #00ff00;\">NO OTP REQUIRED - Ready to Use</strong><br>" },
    { old: "🔒 تشفير عسكري متقدم | 🌍 قبول عالمي 100%<br>", new: "🚫 <strong style=\"color: #ff6600;\">ZERO OTP VERIFICATION</strong> | 🌍 Global Acceptance<br>" },
    { old: "⚡ تفعيل فوري خلال دقائق | 🚫 بدون تتبع أو OTP<br>", new: "⚡ Instant Activation | 🔒 Military-Grade Encryption<br>" },
    { old: "💎 مثالية للتسوق الآمن والخدمات الرقمية", new: "💎 Perfect for Anonymous Shopping & Digital Services" },
    
    // OTP tags
    { old: "🚫 OTP فري - جاهزة فوراً", new: "🚫 NO OTP EVER - Ready Now" },
    { old: "⚡ بدون OTP - مميزة", new: "⚡ ZERO OTP - Premium" },
    { old: "⚡ بدون OTP - حصرية", new: "⚡ NO OTP - Exclusive" },
    { old: "⚡ بدون OTP - احترافية", new: "⚡ OTP-FREE - Professional" },
    { old: "🚫 OTP فري - مجهولة", new: "🚫 NO OTP - Anonymous" },
    { old: "⚡ بدون OTP - ذهبية", new: "⚡ ZERO OTP - Golden" },
    { old: "⚡ بدون OTP - عصرية", new: "⚡ NO OTP - Modern" },
    { old: "⚡ بدون OTP - سريعة", new: "⚡ ZERO OTP - Fast" },
    { old: "⚡ بدون OTP - قوية", new: "⚡ NO OTP - Powerful" },
    { old: "⚡ بدون OTP - ممتازة", new: "⚡ ZERO OTP - Excellent" }
];

console.log("OTP text updates ready to apply");