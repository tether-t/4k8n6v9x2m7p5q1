/**
 * نظام الدعم الذكي المتقدم - Black Store
 * يوفر ردود تلقائية احترافية بناءً على محتوى الموقع
 */

class AISupport {
    constructor() {
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.conversationHistory = [];
        this.userSession = this.generateSessionId();
        this.supportLanguage = 'ar';
        this.responseTemplates = this.initializeTemplates();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeChat();
        this.startProactiveSupport();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    initializeKnowledgeBase() {
        return {
            products: {
                visa: {
                    name: "بطاقات Visa",
                    description: "بطاقات Visa مسبقة الدفع بدون OTP",
                    features: ["بدون رمز OTP", "تفعيل فوري", "صالحة عالمياً", "أمان عالي"],
                    prices: ["$50", "$100", "$200", "$500", "$1000"],
                    delivery: "فوري خلال 60 ثانية",
                    support: "دعم 24/7"
                },
                mastercard: {
                    name: "بطاقات MasterCard",
                    description: "بطاقات MasterCard مسبقة الدفع عالية الجودة",
                    features: ["بدون رمز OTP", "تفعيل فوري", "قبول واسع", "حماية متقدمة"],
                    prices: ["$50", "$100", "$200", "$500", "$1000"],
                    delivery: "فوري خلال 60 ثانية",
                    support: "دعم 24/7"
                },
                ai_tools: {
                    name: "أدوات الذكاء الاصطناعي",
                    description: "أدوات AI متقدمة للمطورين والمحترفين",
                    features: ["ChatGPT Premium", "Claude Pro", "Midjourney", "GitHub Copilot"],
                    prices: ["$20", "$50", "$100"],
                    delivery: "فوري",
                    support: "دعم تقني متخصص"
                },
                netflix: {
                    name: "حسابات Netflix",
                    description: "حسابات Netflix Premium مشتركة",
                    features: ["جودة 4K", "متعدد الأجهزة", "مكتبة كاملة", "بدون إعلانات"],
                    prices: ["$5/شهر", "$15/3أشهر", "$50/سنة"],
                    delivery: "فوري",
                    support: "استبدال مجاني"
                },
                amazon: {
                    name: "بطاقات Amazon",
                    description: "بطاقات هدايا Amazon للتسوق",
                    features: ["صالحة في جميع البلدان", "بدون انتهاء صلاحية", "قابلة للتحويل"],
                    prices: ["$25", "$50", "$100", "$200"],
                    delivery: "فوري",
                    support: "ضمان الاستبدال"
                }
            },
            policies: {
                payment: {
                    methods: ["Bitcoin فقط"],
                    security: "تشفير عسكري",
                    confirmation: "3 تأكيدات blockchain",
                    time: "30-60 دقيقة"
                },
                delivery: {
                    average: "60 ثانية",
                    method: "رسالة مشفرة",
                    tracking: "متابعة الطلب متاحة"
                },
                refund: {
                    policy: "لا توجد استردادات",
                    reason: "طبيعة المنتجات الرقمية",
                    alternative: "استبدال مجاني للمنتجات المعطلة",
                    success_rate: "99.8%"
                },
                security: {
                    encryption: "تشفير عسكري",
                    logs: "سياسة عدم الاحتفاظ بالسجلات",
                    anonymity: "إخفاء هوية كامل",
                    access: "Tor Browser فقط"
                }
            },
            faq: {
                "كيف أدفع؟": "نقبل Bitcoin فقط للحصول على أقصى درجات الأمان والخصوصية",
                "متى أستلم المنتج؟": "التسليم فوري خلال 60 ثانية بعد تأكيد الدفع",
                "هل المنتجات آمنة؟": "نعم، معدل نجاح 99.8% مع ضمان الاستبدال",
                "هل تحتفظون بالسجلات؟": "لا، سياسة عدم الاحتفاظ بأي سجلات أو بيانات شخصية",
                "كيف أتواصل معكم؟": "الدردشة المباشرة أو تذكرة دعم مشفرة"
            }
        };
    }

    initializeTemplates() {
        return {
            greeting: [
                "مرحباً بك في Black Store! 🖤 كيف يمكنني مساعدتك اليوم؟",
                "أهلاً وسهلاً! 👋 أنا مساعدك الذكي، كيف يمكنني خدمتك؟",
                "مرحباً! 🌟 فريق الدعم هنا لمساعدتك في أي استفسار"
            ],
            product_inquiry: [
                "بالطبع! دعني أخبرك عن {product}...",
                "ممتاز! إليك كل ما تحتاج معرفته عن {product}:",
                "سأوضح لك تفاصيل {product} بالكامل:"
            ],
            payment_help: [
                "سأوضح لك عملية الدفع خطوة بخطوة:",
                "إليك دليل الدفع الكامل:",
                "دعني أساعدك في إتمام عملية الدفع:"
            ],
            technical_support: [
                "سأساعدك في حل هذه المشكلة التقنية:",
                "دعني أوجهك للحل الصحيح:",
                "إليك الخطوات لحل هذه المشكلة:"
            ],
            closing: [
                "هل هناك أي شيء آخر يمكنني مساعدتك فيه؟ 😊",
                "أتمنى أن أكون قد ساعدتك! هل تحتاج لأي شيء آخر؟",
                "سعيد لمساعدتك! لا تتردد في السؤال عن أي شيء آخر"
            ]
        };
    }

    setupEventListeners() {
        // استبدال نظام الدردشة الحالي
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-message');
        
        if (chatInput && sendButton) {
            chatInput.removeEventListener('keypress', this.handleEnterKey);
            sendButton.removeEventListener('click', this.handleSendMessage);
            
            chatInput.addEventListener('keypress', (e) => this.handleEnterKey(e));
            sendButton.addEventListener('click', () => this.handleSendMessage());
        }

        // إضافة أزرار الاقتراحات السريعة
        this.addQuickSuggestions();
    }

    handleEnterKey(e) {
        if (e.key === 'Enter') {
            this.handleSendMessage();
        }
    }

    handleSendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        this.addMessageToChat(message, 'user');
        chatInput.value = '';
        
        // معالجة الرسالة والرد
        setTimeout(() => {
            const response = this.processMessage(message);
            this.addMessageToChat(response, 'support');
        }, 1000);
    }

    processMessage(message) {
        const normalizedMessage = this.normalizeArabicText(message.toLowerCase());
        
        // تحليل نوع الاستفسار
        const intent = this.detectIntent(normalizedMessage);
        
        // إضافة للتاريخ
        this.conversationHistory.push({
            message: message,
            intent: intent,
            timestamp: new Date()
        });
        
        // توليد الرد المناسب
        return this.generateResponse(intent, normalizedMessage);
    }

    normalizeArabicText(text) {
        return text
            .replace(/أ|إ|آ/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ي/g, 'ى')
            .replace(/\s+/g, ' ')
            .trim();
    }

    detectIntent(message) {
        const intents = {
            greeting: ['مرحبا', 'السلام', 'اهلا', 'صباح', 'مساء', 'هاي', 'هلو'],
            product_visa: ['فيزا', 'visa', 'بطاقه فيزا', 'كارد فيزا'],
            product_mastercard: ['ماستر', 'master', 'بطاقه ماستر', 'كارد ماستر'],
            product_ai: ['ذكاء اصطناعي', 'ai', 'جي بي تي', 'gpt', 'كلود', 'claude'],
            product_netflix: ['نتفليكس', 'netflix', 'مسلسلات', 'افلام'],
            product_amazon: ['امازون', 'amazon', 'تسوق'],
            payment: ['دفع', 'بيتكوين', 'bitcoin', 'كيف ادفع', 'طريقه الدفع'],
            delivery: ['تسليم', 'استلام', 'متى استلم', 'وقت التسليم'],
            security: ['امان', 'حمايه', 'خصوصيه', 'سجلات'],
            refund: ['استرداد', 'ارجاع', 'رد المال'],
            technical: ['مشكله', 'خطا', 'لا يعمل', 'عطل'],
            contact: ['تواصل', 'اتصال', 'رقم', 'ايميل']
        };

        for (const [intent, keywords] of Object.entries(intents)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return intent;
            }
        }

        return 'general';
    }

    generateResponse(intent, message) {
        switch (intent) {
            case 'greeting':
                return this.getRandomTemplate('greeting');
                
            case 'product_visa':
                return this.generateProductResponse('visa');
                
            case 'product_mastercard':
                return this.generateProductResponse('mastercard');
                
            case 'product_ai':
                return this.generateProductResponse('ai_tools');
                
            case 'product_netflix':
                return this.generateProductResponse('netflix');
                
            case 'product_amazon':
                return this.generateProductResponse('amazon');
                
            case 'payment':
                return this.generatePaymentResponse();
                
            case 'delivery':
                return this.generateDeliveryResponse();
                
            case 'security':
                return this.generateSecurityResponse();
                
            case 'refund':
                return this.generateRefundResponse();
                
            case 'technical':
                return this.generateTechnicalResponse();
                
            case 'contact':
                return this.generateContactResponse();
                
            default:
                return this.generateGeneralResponse(message);
        }
    }

    generateProductResponse(productType) {
        const product = this.knowledgeBase.products[productType];
        if (!product) return "عذراً، لم أجد معلومات عن هذا المنتج.";

        return `
🔥 **${product.name}**

📝 **الوصف:** ${product.description}

✨ **المميزات:**
${product.features.map(feature => `• ${feature}`).join('\n')}

💰 **الأسعار المتاحة:** ${product.prices.join(' - ')}

⚡ **التسليم:** ${product.delivery}

🛡️ **الدعم:** ${product.support}

هل تريد المزيد من التفاصيل أو تحتاج مساعدة في الطلب؟
        `.trim();
    }

    generatePaymentResponse() {
        const payment = this.knowledgeBase.policies.payment;
        
        return `
💳 **دليل الدفع الكامل:**

🔐 **الطريقة المقبولة:** ${payment.methods[0]} فقط
🛡️ **الأمان:** ${payment.security}
⏱️ **التأكيد:** ${payment.confirmation}
🕐 **الوقت المتوقع:** ${payment.time}

📋 **خطوات الدفع:**
1️⃣ اختر المنتج المطلوب
2️⃣ انسخ عنوان المحفظة
3️⃣ أرسل المبلغ المطلوب
4️⃣ انتظر 3 تأكيدات
5️⃣ استلم المنتج فوراً

💡 **نصيحة:** استخدم محفظة موثوقة لضمان سرعة التأكيد
        `.trim();
    }

    generateDeliveryResponse() {
        const delivery = this.knowledgeBase.policies.delivery;
        
        return `
🚀 **معلومات التسليم:**

⚡ **متوسط وقت التسليم:** ${delivery.average}
📨 **طريقة التسليم:** ${delivery.method}
📊 **متابعة الطلب:** ${delivery.tracking}

🔄 **عملية التسليم:**
1️⃣ تأكيد الدفع (3 تأكيدات blockchain)
2️⃣ معالجة الطلب تلقائياً
3️⃣ إرسال المنتج مشفراً
4️⃣ إشعار التسليم

⭐ **معدل النجاح:** 99.8%
        `.trim();
    }

    generateSecurityResponse() {
        const security = this.knowledgeBase.policies.security;
        
        return `
🔒 **أمان وخصوصية Black Store:**

🛡️ **التشفير:** ${security.encryption}
📝 **السجلات:** ${security.logs}
👤 **إخفاء الهوية:** ${security.anonymity}
🌐 **الوصول:** ${security.access}

🔐 **ضمانات الأمان:**
• تشفير end-to-end لجميع البيانات
• عدم تخزين أي معلومات شخصية
• حذف تلقائي للجلسات كل 24 ساعة
• خوادم في دول صديقة للخصوصية

✅ **نعمل منذ 2020 بدون أي خروقات أمنية**
        `.trim();
    }

    generateRefundResponse() {
        const refund = this.knowledgeBase.policies.refund;
        
        return `
💰 **سياسة الاسترداد:**

❌ **الاسترداد:** ${refund.policy}
📝 **السبب:** ${refund.reason}
🔄 **البديل:** ${refund.alternative}
📊 **معدل النجاح:** ${refund.success_rate}

🛠️ **في حالة عدم عمل المنتج:**
1️⃣ تواصل معنا فوراً
2️⃣ قدم تفاصيل المشكلة
3️⃣ احصل على استبدال مجاني
4️⃣ خلال 24 ساعة كحد أقصى

💡 **نضمن جودة منتجاتنا بنسبة 99.8%**
        `.trim();
    }

    generateTechnicalResponse() {
        return `
🔧 **الدعم التقني:**

🚨 **المشاكل الشائعة وحلولها:**

1️⃣ **الموقع لا يحمل:**
   • جرب دائرة Tor جديدة (Ctrl+Shift+L)
   • امسح cache المتصفح
   • تأكد من استخدام Tor Browser

2️⃣ **الدفع لا يظهر:**
   • تحقق من عدد التأكيدات (يحتاج 3)
   • راجع عنوان المحفظة
   • انتظر حتى 2 ساعة كحد أقصى

3️⃣ **المنتج لا يعمل:**
   • تواصل معنا فوراً
   • قدم screenshot للمشكلة
   • احصل على استبدال مجاني

📞 **طرق التواصل:**
• الدردشة المباشرة (الأسرع)
• تذكرة دعم مشفرة
• متوسط وقت الرد: 1-2 ساعة
        `.trim();
    }

    generateContactResponse() {
        return `
📞 **طرق التواصل معنا:**

💬 **الدردشة المباشرة:** متاحة 24/7 (الأسرع)
🎫 **تذكرة دعم:** للاستفسارات المعقدة
🔐 **PGP Email:** للمراسلات الحساسة

⏰ **أوقات الاستجابة:**
• الدردشة المباشرة: فوري
• تذكرة الدعم: 1-2 ساعة
• الاستفسارات التقنية: 30 دقيقة

🌍 **الدعم متاح بـ:**
• العربية 🇸🇦
• English 🇺🇸
• Français 🇫🇷
• Deutsch 🇩🇪

💡 **نصيحة:** استخدم الدردشة المباشرة للحصول على أسرع إجابة
        `.trim();
    }

    generateGeneralResponse(message) {
        // محاولة البحث في قاعدة المعرفة
        for (const [question, answer] of Object.entries(this.knowledgeBase.faq)) {
            if (message.includes(question.toLowerCase()) || 
                this.calculateSimilarity(message, question.toLowerCase()) > 0.6) {
                return `💡 **${question}**\n\n${answer}\n\nهل هذا يجيب على سؤالك؟`;
            }
        }

        return `
🤔 أعتذر، لم أفهم سؤالك بوضوح.

💡 **يمكنني مساعدتك في:**
• معلومات عن المنتجات (Visa, MasterCard, AI Tools, Netflix, Amazon)
• طرق الدفع والأمان
• التسليم والاستلام
• الدعم التقني
• سياسات المتجر

📝 **أو جرب هذه الأسئلة:**
• "كيف أدفع؟"
• "متى أستلم المنتج؟"
• "هل المنتجات آمنة؟"
• "أريد بطاقة Visa"

كيف يمكنني مساعدتك بشكل أفضل؟
        `.trim();
    }

    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    getRandomTemplate(type) {
        const templates = this.responseTemplates[type];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    addMessageToChat(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (sender === 'support') {
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="support-badge">🤖 مساعد ذكي</span>
                    <span class="timestamp">${new Date().toLocaleTimeString('ar-SA')}</span>
                </div>
                <div class="message-content">${this.formatMessage(message)}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">${new Date().toLocaleTimeString('ar-SA')}</div>
            `;
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // إضافة تأثير الكتابة
        if (sender === 'support') {
            this.addTypingEffect(messageDiv);
        }
    }

    formatMessage(message) {
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '•')
            .replace(/(\d+️⃣)/g, '<span class="step-number">$1</span>');
    }

    addTypingEffect(messageDiv) {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    addQuickSuggestions() {
        const chatWindow = document.getElementById('chat-window');
        if (!chatWindow) return;

        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'quick-suggestions';
        suggestionsDiv.innerHTML = `
            <div class="suggestions-header">اقتراحات سريعة:</div>
            <div class="suggestions-buttons">
                <button onclick="aiSupport.sendQuickMessage('أريد بطاقة Visa')">بطاقة Visa</button>
                <button onclick="aiSupport.sendQuickMessage('كيف أدفع؟')">طريقة الدفع</button>
                <button onclick="aiSupport.sendQuickMessage('متى أستلم المنتج؟')">وقت التسليم</button>
                <button onclick="aiSupport.sendQuickMessage('هل المنتجات آمنة؟')">الأمان</button>
            </div>
        `;

        const chatInput = document.querySelector('.chat-input');
        if (chatInput) {
            chatInput.parentNode.insertBefore(suggestionsDiv, chatInput);
        }
    }

    sendQuickMessage(message) {
        document.getElementById('chat-input').value = message;
        this.handleSendMessage();
    }

    initializeChat() {
        // رسالة ترحيب تلقائية
        setTimeout(() => {
            const welcomeMessage = `
مرحباً بك في Black Store! 🖤

أنا مساعدك الذكي وسأكون سعيداً لمساعدتك في:

🛒 **اختيار المنتجات المناسبة**
💳 **شرح طرق الدفع الآمنة**  
🚀 **متابعة طلباتك**
🔒 **الإجابة على أسئلة الأمان**
🛠️ **حل المشاكل التقنية**

كيف يمكنني مساعدتك اليوم؟
            `.trim();
            
            this.addMessageToChat(welcomeMessage, 'support');
        }, 1000);
    }

    startProactiveSupport() {
        // مراقبة سلوك المستخدم وتقديم المساعدة الاستباقية
        this.monitorUserBehavior();
        this.scheduleProactiveMessages();
    }

    monitorUserBehavior() {
        let timeOnPage = 0;
        let scrollDepth = 0;
        
        // مراقبة الوقت المقضي
        setInterval(() => {
            timeOnPage += 1;
            
            // رسالة مساعدة بعد 30 ثانية
            if (timeOnPage === 30 && this.conversationHistory.length === 0) {
                this.sendProactiveMessage('هل تحتاج مساعدة في العثور على ما تبحث عنه؟ 😊');
            }
            
            // رسالة تشجيعية بعد دقيقتين
            if (timeOnPage === 120 && this.conversationHistory.length === 0) {
                this.sendProactiveMessage('💡 نصيحة: جميع منتجاتنا بدون OTP وتسليم فوري!');
            }
        }, 1000);

        // مراقبة التمرير
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 50 && scrollDepth < 50) {
                scrollDepth = 50;
                if (this.conversationHistory.length === 0) {
                    this.sendProactiveMessage('🔥 شاهدت عروضنا الحصرية؟ هل تحتاج توضيح حول أي منتج؟');
                }
            }
        });
    }

    scheduleProactiveMessages() {
        // رسائل دورية لتحفيز التفاعل
        const messages = [
            '⚡ تذكير: عروض البرق تنتهي قريباً!',
            '🛡️ جميع معاملاتنا مشفرة وآمنة 100%',
            '🚀 متوسط وقت التسليم: 60 ثانية فقط!',
            '💎 انضم لأكثر من 127K عميل راضي'
        ];

        let messageIndex = 0;
        setInterval(() => {
            if (this.conversationHistory.length > 0) return; // لا ترسل إذا كان هناك محادثة نشطة
            
            this.sendProactiveMessage(messages[messageIndex]);
            messageIndex = (messageIndex + 1) % messages.length;
        }, 300000); // كل 5 دقائق
    }

    sendProactiveMessage(message) {
        const chatToggle = document.getElementById('chat-toggle');
        if (chatToggle) {
            // إضافة تأثير بصري للفت الانتباه
            chatToggle.style.animation = 'pulse 1s ease-in-out 3';
            
            setTimeout(() => {
                this.addMessageToChat(message, 'support');
            }, 1000);
        }
    }
}

// تهيئة النظام عند تحميل الصفحة
let aiSupport;
document.addEventListener('DOMContentLoaded', function() {
    aiSupport = new AISupport();
    
    // إضافة الأنماط المطلوبة
    const supportStyles = document.createElement('style');
    supportStyles.textContent = `
        .quick-suggestions {
            padding: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.3);
        }
        
        .suggestions-header {
            color: #00ffff;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        .suggestions-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .suggestions-buttons button {
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.3);
            color: #00ffff;
            padding: 0.5rem 1rem;
            border-radius: 15px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .suggestions-buttons button:hover {
            background: rgba(0, 255, 255, 0.2);
            border-color: #00ffff;
            transform: translateY(-2px);
        }
        
        .message.support {
            background: rgba(0, 255, 255, 0.1);
            border-left: 3px solid #00ffff;
            padding: 1rem;
            margin: 0.5rem 0;
            border-radius: 10px;
        }
        
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .support-badge {
            background: linear-gradient(45deg, #00ffff, #0080ff);
            color: #000;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 0.7rem;
            font-weight: 700;
        }
        
        .timestamp {
            color: #888;
            font-size: 0.7rem;
        }
        
        .message-content {
            line-height: 1.6;
            color: #e0e0e0;
        }
        
        .message-content strong {
            color: #00ffff;
        }
        
        .step-number {
            color: #ff0066;
            font-weight: 700;
        }
        
        .message.user {
            background: rgba(255, 0, 102, 0.1);
            border-right: 3px solid #ff0066;
            padding: 1rem;
            margin: 0.5rem 0;
            border-radius: 10px;
            text-align: right;
        }
        
        .message-time {
            color: #888;
            font-size: 0.7rem;
            margin-top: 0.5rem;
            text-align: right;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); }
        }
    `;
    document.head.appendChild(supportStyles);
});