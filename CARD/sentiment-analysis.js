/**
 * نظام تحليل المشاعر والذكاء الاصطناعي المتقدم
 * يحلل مشاعر العملاء ويقدم ردود مخصصة
 */

class SentimentAnalyzer {
    constructor() {
        this.emotionPatterns = this.initializeEmotionPatterns();
        this.responseStrategies = this.initializeResponseStrategies();
        this.customerProfiles = new Map();
        this.conversationContext = new Map();
        this.init();
    }

    init() {
        this.setupEmotionDetection();
        this.initializePersonalization();
    }

    initializeEmotionPatterns() {
        return {
            // المشاعر الإيجابية
            positive: {
                keywords: [
                    'ممتاز', 'رائع', 'جيد', 'شكرا', 'مشكور', 'حلو', 'جميل', 'عظيم',
                    'أحب', 'سعيد', 'راضي', 'مبسوط', 'فرحان', 'مسرور', 'ممنون',
                    'perfect', 'great', 'good', 'thanks', 'awesome', 'excellent'
                ],
                patterns: [
                    /شكر[اً]?/g,
                    /ممتاز/g,
                    /رائع/g,
                    /جيد جداً?/g,
                    /أحب/g,
                    /سعيد/g
                ],
                score: 1,
                intensity: {
                    high: ['ممتاز جداً', 'رائع جداً', 'أحبكم', 'شكراً جزيلاً'],
                    medium: ['جيد', 'شكراً', 'حلو', 'جميل'],
                    low: ['ok', 'اوكي', 'تمام']
                }
            },

            // المشاعر السلبية
            negative: {
                keywords: [
                    'سيء', 'مشكلة', 'خطأ', 'لا يعمل', 'معطل', 'غاضب', 'زعلان',
                    'مستاء', 'محبط', 'تعبان', 'مش راضي', 'مو عاجبني', 'فاشل',
                    'bad', 'problem', 'error', 'angry', 'upset', 'disappointed'
                ],
                patterns: [
                    /لا يعمل/g,
                    /مشكل[ةه]/g,
                    /خطأ/g,
                    /غاضب/g,
                    /زعلان/g,
                    /محبط/g
                ],
                score: -1,
                intensity: {
                    high: ['غاضب جداً', 'محبط جداً', 'كارثة', 'فضيحة'],
                    medium: ['مشكلة', 'خطأ', 'لا يعمل', 'سيء'],
                    low: ['مش حلو', 'مو عاجبني']
                }
            },

            // المشاعر المحايدة
            neutral: {
                keywords: [
                    'سؤال', 'استفسار', 'معلومات', 'كيف', 'متى', 'أين', 'ماذا',
                    'هل', 'لو سمحت', 'ممكن', 'أريد', 'أحتاج',
                    'question', 'how', 'when', 'where', 'what', 'please'
                ],
                patterns: [
                    /كيف/g,
                    /متى/g,
                    /أين/g,
                    /ماذا/g,
                    /هل/g,
                    /ممكن/g
                ],
                score: 0,
                intensity: {
                    high: ['أحتاج مساعدة عاجلة'],
                    medium: ['سؤال', 'استفسار', 'معلومات'],
                    low: ['ممكن', 'لو سمحت']
                }
            },

            // مشاعر الإلحاح والاستعجال
            urgent: {
                keywords: [
                    'عاجل', 'سريع', 'فوري', 'مستعجل', 'بسرعة', 'حالاً', 'الآن',
                    'urgent', 'asap', 'quickly', 'immediately', 'now'
                ],
                patterns: [
                    /عاجل/g,
                    /سريع/g,
                    /فوري/g,
                    /بسرعة/g,
                    /الآن/g
                ],
                score: 0.5,
                priority: 'high'
            },

            // مشاعر الشك والقلق
            concerned: {
                keywords: [
                    'قلق', 'خائف', 'متردد', 'مش متأكد', 'شاك', 'محتار',
                    'worried', 'concerned', 'unsure', 'doubt', 'hesitant'
                ],
                patterns: [
                    /قلق/g,
                    /خائف/g,
                    /مش متأكد/g,
                    /شاك/g,
                    /محتار/g
                ],
                score: -0.3,
                needsReassurance: true
            }
        };
    }

    initializeResponseStrategies() {
        return {
            positive: {
                acknowledgment: [
                    'سعداء جداً لسماع ذلك! 😊',
                    'رائع! نحن فخورون بخدمتك 🌟',
                    'شكراً لك على كلماتك الطيبة! 💖',
                    'يسعدنا أنك راضي عن خدماتنا! ✨'
                ],
                continuation: [
                    'كيف يمكننا أن نجعل تجربتك أفضل؟',
                    'هل هناك شيء آخر يمكننا مساعدتك فيه؟',
                    'نتطلع لخدمتك مرة أخرى!',
                    'شاركنا تجربتك مع الآخرين!'
                ],
                tone: 'enthusiastic'
            },

            negative: {
                empathy: [
                    'أتفهم إحباطك تماماً، وأعتذر عن هذه المشكلة 😔',
                    'أعتذر بشدة عن هذه التجربة السيئة',
                    'نأسف جداً لما حدث، دعني أساعدك فوراً',
                    'أقدر صبرك، وسأحل هذه المشكلة شخصياً'
                ],
                action: [
                    'سأعطي أولوية قصوى لحل مشكلتك',
                    'دعني أتحقق من الأمر فوراً',
                    'سأصعد هذا الأمر لفريق متخصص',
                    'سأتابع معك شخصياً حتى الحل'
                ],
                tone: 'apologetic_helpful'
            },

            neutral: {
                professional: [
                    'بالطبع، سأساعدك بكل سرور',
                    'دعني أوضح لك الأمر بالتفصيل',
                    'إليك المعلومات التي تحتاجها',
                    'سأجيب على جميع استفساراتك'
                ],
                informative: [
                    'هذا سؤال ممتاز، إليك الإجابة:',
                    'المعلومات التي تبحث عنها:',
                    'دعني أشرح لك الأمر خطوة بخطوة:',
                    'إليك كل ما تحتاج معرفته:'
                ],
                tone: 'professional'
            },

            urgent: {
                immediate: [
                    'أفهم أن الأمر عاجل، سأساعدك فوراً! ⚡',
                    'لا تقلق، سأحل هذا الأمر بأسرع وقت ممكن',
                    'أعطيت طلبك أولوية عاجلة',
                    'فهمت الاستعجال، دعني أتعامل مع الأمر حالاً'
                ],
                escalation: [
                    'سأصعد هذا الأمر للإدارة فوراً',
                    'تم تحويل طلبك لفريق الطوارئ',
                    'سأتابع معك كل دقيقة حتى الحل',
                    'أولوية قصوى - سأحل هذا شخصياً'
                ],
                tone: 'urgent_helpful'
            },

            concerned: {
                reassurance: [
                    'لا تقلق أبداً، نحن هنا لحمايتك 🛡️',
                    'أفهم قلقك، دعني أطمئنك بالتفاصيل',
                    'مخاوفك مبررة، وسأوضح لك كل شيء',
                    'ثق بنا، سنعتني بك خطوة بخطوة'
                ],
                explanation: [
                    'دعني أشرح لك كيف نحمي بياناتك:',
                    'إليك ضماناتنا الأمنية بالتفصيل:',
                    'هذا ما نفعله لضمان أمانك:',
                    'سأوضح لك جميع إجراءات الحماية:'
                ],
                tone: 'reassuring'
            }
        };
    }

    analyzeSentiment(message, userId = null) {
        const analysis = {
            message: message,
            timestamp: new Date(),
            emotions: {},
            overallSentiment: 'neutral',
            intensity: 'medium',
            confidence: 0,
            needsEscalation: false,
            suggestedResponse: null,
            context: this.getConversationContext(userId)
        };

        // تحليل كل نوع من المشاعر
        for (const [emotionType, emotionData] of Object.entries(this.emotionPatterns)) {
            const score = this.calculateEmotionScore(message, emotionData);
            if (score > 0) {
                analysis.emotions[emotionType] = {
                    score: score,
                    intensity: this.determineIntensity(message, emotionData),
                    matchedKeywords: this.getMatchedKeywords(message, emotionData)
                };
            }
        }

        // تحديد المشاعر الإجمالية
        analysis.overallSentiment = this.determineOverallSentiment(analysis.emotions);
        analysis.intensity = this.determineOverallIntensity(analysis.emotions);
        analysis.confidence = this.calculateConfidence(analysis.emotions);

        // تحديد الحاجة للتصعيد
        analysis.needsEscalation = this.shouldEscalate(analysis);

        // اقتراح الرد المناسب
        analysis.suggestedResponse = this.generateSuggestedResponse(analysis);

        // حفظ في السياق
        this.updateConversationContext(userId, analysis);

        return analysis;
    }

    calculateEmotionScore(message, emotionData) {
        let score = 0;
        const normalizedMessage = message.toLowerCase();

        // فحص الكلمات المفتاحية
        emotionData.keywords.forEach(keyword => {
            if (normalizedMessage.includes(keyword.toLowerCase())) {
                score += 1;
            }
        });

        // فحص الأنماط
        emotionData.patterns.forEach(pattern => {
            const matches = normalizedMessage.match(pattern);
            if (matches) {
                score += matches.length;
            }
        });

        return score;
    }

    determineIntensity(message, emotionData) {
        const normalizedMessage = message.toLowerCase();
        
        // فحص الكثافة العالية
        if (emotionData.intensity?.high) {
            for (const phrase of emotionData.intensity.high) {
                if (normalizedMessage.includes(phrase.toLowerCase())) {
                    return 'high';
                }
            }
        }

        // فحص الكثافة المنخفضة
        if (emotionData.intensity?.low) {
            for (const phrase of emotionData.intensity.low) {
                if (normalizedMessage.includes(phrase.toLowerCase())) {
                    return 'low';
                }
            }
        }

        return 'medium';
    }

    getMatchedKeywords(message, emotionData) {
        const normalizedMessage = message.toLowerCase();
        return emotionData.keywords.filter(keyword => 
            normalizedMessage.includes(keyword.toLowerCase())
        );
    }

    determineOverallSentiment(emotions) {
        let maxScore = 0;
        let dominantEmotion = 'neutral';

        for (const [emotion, data] of Object.entries(emotions)) {
            if (data.score > maxScore) {
                maxScore = data.score;
                dominantEmotion = emotion;
            }
        }

        // تحويل المشاعر المعقدة للأساسية
        if (dominantEmotion === 'urgent' || dominantEmotion === 'concerned') {
            return emotions.negative?.score > emotions.positive?.score ? 'negative' : 'neutral';
        }

        return dominantEmotion;
    }

    determineOverallIntensity(emotions) {
        const intensities = Object.values(emotions).map(e => e.intensity);
        
        if (intensities.includes('high')) return 'high';
        if (intensities.includes('medium')) return 'medium';
        return 'low';
    }

    calculateConfidence(emotions) {
        const totalScore = Object.values(emotions).reduce((sum, e) => sum + e.score, 0);
        const emotionCount = Object.keys(emotions).length;
        
        if (emotionCount === 0) return 0;
        
        // كلما زادت النقاط وقل عدد المشاعر المختلطة، زادت الثقة
        const confidence = Math.min(totalScore / emotionCount * 0.3, 1);
        return Math.round(confidence * 100) / 100;
    }

    shouldEscalate(analysis) {
        // تصعيد في الحالات التالية:
        
        // 1. مشاعر سلبية عالية الكثافة
        if (analysis.emotions.negative?.intensity === 'high') {
            return true;
        }

        // 2. طلبات عاجلة مع مشاعر سلبية
        if (analysis.emotions.urgent && analysis.emotions.negative) {
            return true;
        }

        // 3. مشاكل أمنية
        if (analysis.message.toLowerCase().includes('أمان') || 
            analysis.message.toLowerCase().includes('security') ||
            analysis.message.toLowerCase().includes('hack')) {
            return true;
        }

        // 4. طلبات استرداد غاضبة
        if (analysis.emotions.negative && 
            (analysis.message.includes('استرداد') || analysis.message.includes('refund'))) {
            return true;
        }

        return false;
    }

    generateSuggestedResponse(analysis) {
        const sentiment = analysis.overallSentiment;
        const hasUrgent = analysis.emotions.urgent;
        const hasConcerned = analysis.emotions.concerned;
        
        let strategy;
        
        // اختيار الاستراتيجية المناسبة
        if (hasUrgent) {
            strategy = this.responseStrategies.urgent;
        } else if (hasConcerned) {
            strategy = this.responseStrategies.concerned;
        } else {
            strategy = this.responseStrategies[sentiment] || this.responseStrategies.neutral;
        }

        // بناء الرد
        let response = '';
        
        // إضافة الاعتراف/التعاطف
        if (strategy.empathy) {
            response += this.getRandomFromArray(strategy.empathy) + '\n\n';
        } else if (strategy.acknowledgment) {
            response += this.getRandomFromArray(strategy.acknowledgment) + '\n\n';
        } else if (strategy.immediate) {
            response += this.getRandomFromArray(strategy.immediate) + '\n\n';
        } else if (strategy.reassurance) {
            response += this.getRandomFromArray(strategy.reassurance) + '\n\n';
        } else if (strategy.professional) {
            response += this.getRandomFromArray(strategy.professional) + '\n\n';
        }

        // إضافة الإجراء/المعلومات
        if (strategy.action && sentiment === 'negative') {
            response += this.getRandomFromArray(strategy.action) + '\n\n';
        } else if (strategy.explanation && hasConcerned) {
            response += this.getRandomFromArray(strategy.explanation) + '\n\n';
        } else if (strategy.informative && sentiment === 'neutral') {
            response += this.getRandomFromArray(strategy.informative) + '\n\n';
        }

        // إضافة المتابعة
        if (strategy.continuation && sentiment === 'positive') {
            response += this.getRandomFromArray(strategy.continuation);
        } else if (strategy.escalation && analysis.needsEscalation) {
            response += this.getRandomFromArray(strategy.escalation);
        }

        return {
            text: response.trim(),
            tone: strategy.tone,
            priority: analysis.needsEscalation ? 'high' : 'normal',
            suggestedActions: this.getSuggestedActions(analysis)
        };
    }

    getSuggestedActions(analysis) {
        const actions = [];

        if (analysis.needsEscalation) {
            actions.push({
                type: 'escalate',
                description: 'تصعيد للإدارة',
                priority: 'high'
            });
        }

        if (analysis.emotions.urgent) {
            actions.push({
                type: 'priority',
                description: 'معالجة عاجلة',
                priority: 'high'
            });
        }

        if (analysis.emotions.concerned) {
            actions.push({
                type: 'reassure',
                description: 'تقديم ضمانات إضافية',
                priority: 'medium'
            });
        }

        if (analysis.overallSentiment === 'positive') {
            actions.push({
                type: 'upsell',
                description: 'اقتراح منتجات إضافية',
                priority: 'low'
            });
        }

        return actions;
    }

    getRandomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getConversationContext(userId) {
        if (!userId) return null;
        return this.conversationContext.get(userId) || {
            messageCount: 0,
            sentimentHistory: [],
            topics: [],
            lastInteraction: null
        };
    }

    updateConversationContext(userId, analysis) {
        if (!userId) return;

        const context = this.getConversationContext(userId) || {
            messageCount: 0,
            sentimentHistory: [],
            topics: [],
            lastInteraction: null
        };

        context.messageCount++;
        context.sentimentHistory.push({
            sentiment: analysis.overallSentiment,
            intensity: analysis.intensity,
            timestamp: analysis.timestamp
        });

        // الاحتفاظ بآخر 10 مشاعر فقط
        if (context.sentimentHistory.length > 10) {
            context.sentimentHistory = context.sentimentHistory.slice(-10);
        }

        context.lastInteraction = analysis.timestamp;

        this.conversationContext.set(userId, context);
    }

    setupEmotionDetection() {
        // ربط مع نظام الدردشة الموجود
        if (window.aiSupport) {
            const originalProcessMessage = window.aiSupport.processMessage;
            
            window.aiSupport.processMessage = (message) => {
                // تحليل المشاعر أولاً
                const sentimentAnalysis = this.analyzeSentiment(message, window.aiSupport.userSession);
                
                // تخصيص الرد بناءً على المشاعر
                let response = originalProcessMessage.call(window.aiSupport, message);
                
                // تحسين الرد بناءً على تحليل المشاعر
                response = this.enhanceResponse(response, sentimentAnalysis);
                
                // إضافة معلومات التحليل للمطورين (في وضع التطوير)
                if (window.location.hostname === 'localhost') {
                    console.log('Sentiment Analysis:', sentimentAnalysis);
                }
                
                return response;
            };
        }
    }

    enhanceResponse(originalResponse, sentimentAnalysis) {
        const sentiment = sentimentAnalysis.overallSentiment;
        const intensity = sentimentAnalysis.intensity;
        
        let enhancedResponse = originalResponse;

        // إضافة مقدمة عاطفية مناسبة
        if (sentiment === 'negative' && intensity === 'high') {
            enhancedResponse = '😔 أعتذر بشدة عن هذه المشكلة. ' + enhancedResponse;
        } else if (sentiment === 'positive') {
            enhancedResponse = '😊 ' + enhancedResponse;
        } else if (sentimentAnalysis.emotions.urgent) {
            enhancedResponse = '⚡ أفهم الاستعجال! ' + enhancedResponse;
        } else if (sentimentAnalysis.emotions.concerned) {
            enhancedResponse = '🛡️ لا تقلق، سأوضح لك كل شيء. ' + enhancedResponse;
        }

        // إضافة خاتمة مناسبة
        if (sentiment === 'negative') {
            enhancedResponse += '\n\n💪 سأتأكد شخصياً من حل مشكلتك!';
        } else if (sentimentAnalysis.emotions.concerned) {
            enhancedResponse += '\n\n🤝 نحن هنا لحمايتك وضمان راحتك التامة.';
        }

        // إضافة إجراءات خاصة للحالات العاجلة
        if (sentimentAnalysis.needsEscalation) {
            enhancedResponse += '\n\n🚨 تم تصعيد طلبك للإدارة للمعالجة الفورية.';
        }

        return enhancedResponse;
    }

    initializePersonalization() {
        // نظام التخصيص بناءً على تاريخ العميل
        this.personalizedGreetings = {
            new_customer: [
                'مرحباً بك في Black Store! 🌟 نحن سعداء لانضمامك إلينا',
                'أهلاً وسهلاً! 👋 مرحباً بك في عائلة Black Store'
            ],
            returning_happy: [
                'مرحباً بعودتك! 😊 سعداء برؤيتك مرة أخرى',
                'أهلاً بك مجدداً! 🎉 كيف يمكننا خدمتك اليوم؟'
            ],
            returning_had_issues: [
                'مرحباً بعودتك! 🤝 نأمل أن تكون مشكلتك السابقة قد حُلت',
                'أهلاً بك! 💪 نحن هنا لضمان تجربة أفضل هذه المرة'
            ],
            vip_customer: [
                'مرحباً بعميلنا المميز! 👑 كيف يمكننا خدمتك اليوم؟',
                'أهلاً بك! ⭐ نقدر ولاءك لـ Black Store'
            ]
        };
    }

    getPersonalizedGreeting(userId) {
        const context = this.getConversationContext(userId);
        
        if (!context || context.messageCount === 0) {
            return this.getRandomFromArray(this.personalizedGreetings.new_customer);
        }

        // تحليل تاريخ المشاعر
        const recentSentiments = context.sentimentHistory.slice(-5);
        const negativeCount = recentSentiments.filter(s => s.sentiment === 'negative').length;
        const positiveCount = recentSentiments.filter(s => s.sentiment === 'positive').length;

        if (context.messageCount > 20) {
            return this.getRandomFromArray(this.personalizedGreetings.vip_customer);
        } else if (negativeCount > positiveCount) {
            return this.getRandomFromArray(this.personalizedGreetings.returning_had_issues);
        } else {
            return this.getRandomFromArray(this.personalizedGreetings.returning_happy);
        }
    }

    // تحليل الاتجاهات العامة للمشاعر
    analyzeTrends() {
        const allContexts = Array.from(this.conversationContext.values());
        const trends = {
            totalCustomers: allContexts.length,
            averageMessages: 0,
            sentimentDistribution: {
                positive: 0,
                negative: 0,
                neutral: 0
            },
            commonIssues: [],
            satisfactionScore: 0
        };

        if (allContexts.length === 0) return trends;

        // حساب متوسط الرسائل
        trends.averageMessages = allContexts.reduce((sum, ctx) => sum + ctx.messageCount, 0) / allContexts.length;

        // توزيع المشاعر
        const allSentiments = allContexts.flatMap(ctx => ctx.sentimentHistory);
        allSentiments.forEach(sentiment => {
            trends.sentimentDistribution[sentiment.sentiment]++;
        });

        // حساب نقاط الرضا
        const totalSentiments = allSentiments.length;
        if (totalSentiments > 0) {
            const positiveRatio = trends.sentimentDistribution.positive / totalSentiments;
            const negativeRatio = trends.sentimentDistribution.negative / totalSentiments;
            trends.satisfactionScore = Math.round((positiveRatio - negativeRatio + 1) * 50);
        }

        return trends;
    }

    // إنشاء تقرير تحليل المشاعر
    generateSentimentReport() {
        const trends = this.analyzeTrends();
        
        return {
            timestamp: new Date(),
            summary: {
                totalInteractions: trends.totalCustomers,
                averageMessagesPerCustomer: Math.round(trends.averageMessages * 100) / 100,
                satisfactionScore: trends.satisfactionScore,
                sentimentBreakdown: trends.sentimentDistribution
            },
            recommendations: this.generateRecommendations(trends),
            alerts: this.generateAlerts(trends)
        };
    }

    generateRecommendations(trends) {
        const recommendations = [];
        
        const totalSentiments = Object.values(trends.sentimentDistribution).reduce((a, b) => a + b, 0);
        const negativeRatio = trends.sentimentDistribution.negative / totalSentiments;
        
        if (negativeRatio > 0.3) {
            recommendations.push({
                type: 'urgent',
                message: 'نسبة عالية من المشاعر السلبية - يحتاج تدخل فوري',
                action: 'مراجعة العمليات وتحسين الخدمة'
            });
        }
        
        if (trends.satisfactionScore < 60) {
            recommendations.push({
                type: 'warning',
                message: 'نقاط الرضا منخفضة',
                action: 'تحسين جودة الردود وسرعة الاستجابة'
            });
        }
        
        if (trends.averageMessages > 10) {
            recommendations.push({
                type: 'info',
                message: 'متوسط عالي من الرسائل لكل عميل',
                action: 'تحسين الأسئلة الشائعة والردود التلقائية'
            });
        }
        
        return recommendations;
    }

    generateAlerts(trends) {
        const alerts = [];
        const now = new Date();
        
        // تحقق من الاتجاهات الحديثة
        const recentContexts = Array.from(this.conversationContext.values())
            .filter(ctx => ctx.lastInteraction && (now - new Date(ctx.lastInteraction)) < 3600000); // آخر ساعة
        
        const recentNegative = recentContexts
            .flatMap(ctx => ctx.sentimentHistory.slice(-3))
            .filter(s => s.sentiment === 'negative').length;
        
        if (recentNegative > 5) {
            alerts.push({
                level: 'high',
                message: 'زيادة في المشاعر السلبية خلال الساعة الماضية',
                count: recentNegative,
                timestamp: now
            });
        }
        
        return alerts;
    }
}

// تهيئة نظام تحليل المشاعر
let sentimentAnalyzer;
document.addEventListener('DOMContentLoaded', function() {
    sentimentAnalyzer = new SentimentAnalyzer();
    
    // إضافة لوحة تحكم تحليل المشاعر للمطورين
    if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
        createSentimentDashboard();
    }
});

function createSentimentDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'sentiment-dashboard';
    dashboard.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        width: 300px;
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid #333;
        border-radius: 10px;
        padding: 15px;
        color: white;
        font-size: 12px;
        z-index: 10000;
        display: none;
    `;
    
    dashboard.innerHTML = `
        <h4>🧠 Sentiment Analysis Dashboard</h4>
        <div id="sentiment-stats"></div>
        <button onclick="toggleSentimentDashboard()" style="margin-top: 10px; padding: 5px 10px; background: #333; color: white; border: none; border-radius: 5px;">Hide</button>
    `;
    
    document.body.appendChild(dashboard);
    
    // زر لإظهار/إخفاء اللوحة
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '🧠';
    toggleBtn.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 10001;
        background: #333;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
    `;
    toggleBtn.onclick = () => toggleSentimentDashboard();
    document.body.appendChild(toggleBtn);
    
    // تحديث الإحصائيات كل 5 ثوان
    setInterval(updateSentimentStats, 5000);
}

function toggleSentimentDashboard() {
    const dashboard = document.getElementById('sentiment-dashboard');
    dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
}

function updateSentimentStats() {
    if (!sentimentAnalyzer) return;
    
    const stats = document.getElementById('sentiment-stats');
    if (!stats) return;
    
    const report = sentimentAnalyzer.generateSentimentReport();
    
    stats.innerHTML = `
        <div><strong>Total Interactions:</strong> ${report.summary.totalInteractions}</div>
        <div><strong>Satisfaction Score:</strong> ${report.summary.satisfactionScore}%</div>
        <div><strong>Positive:</strong> ${report.summary.sentimentBreakdown.positive}</div>
        <div><strong>Negative:</strong> ${report.summary.sentimentBreakdown.negative}</div>
        <div><strong>Neutral:</strong> ${report.summary.sentimentBreakdown.neutral}</div>
        <div><strong>Avg Messages:</strong> ${report.summary.averageMessagesPerCustomer}</div>
        ${report.alerts.length > 0 ? `<div style="color: red;"><strong>Alerts:</strong> ${report.alerts.length}</div>` : ''}
    `;
}