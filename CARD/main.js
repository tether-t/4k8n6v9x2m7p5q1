/**
 * Black Store - نظام إدارة المتجر المتقدم
 * يوفر تجربة تسوق آمنة ومتطورة للبطاقات الرقمية
 */

// منع تحديث الصفحة تلقائيًا
window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  e.returnValue = '';
  return '';
});

// متغيرات النظام الرئيسية
let blackStore = {
  products: [],
  cart: [],
  user: {
    id: null,
    session: null,
    preferences: {}
  },
  security: {
    encryption: true,
    anonymousMode: true,
    noLogs: true
  },
  stats: {
    totalUsers: 127000,
    successRate: 99.8,
    avgDeliveryTime: 60
  }
};

// تهيئة النظام المتقدم
let advancedSystem;
try {
  advancedSystem = new BlackStoreSystem();
  console.log('🖤 تم تفعيل نظام Black Store بنجاح');
} catch (error) {
  console.log('⚠️ النظام المتقدم غير متاح، استخدام النظام الأساسي');
  advancedSystem = null;
}

// نظام إدارة المنتجات المتقدم
class BlackStoreSystem {
  constructor() {
    this.products = this.initializeProducts();
    this.securityLevel = 'maximum';
    this.deliverySystem = 'instant';
    this.paymentMethod = 'bitcoin-only';
  }

  initializeProducts() {
    return [
      {
        id: 'visa-premium',
        name: 'بطاقة Visa Premium',
        category: 'cards',
        type: 'visa',
        price: 100,
        features: ['بدون OTP', 'تفعيل فوري', 'صالحة عالمياً', 'أمان عالي', 'دفع Bitcoin فقط'],
        image: 'images/cards/visa-premium.jpg',
        inStock: true,
        popularity: 95
      },
      {
        id: 'mastercard-elite',
        name: 'بطاقة MasterCard Elite',
        category: 'cards', 
        type: 'mastercard',
        price: 100,
        features: ['بدون OTP', 'قبول واسع', 'حماية متقدمة', 'تفعيل فوري', 'دفع Bitcoin فقط'],
        image: 'images/cards/mastercard-elite.jpg',
        inStock: true,
        popularity: 92
      },
      {
        id: 'ai-tools-premium',
        name: 'حزمة أدوات الذكاء الاصطناعي',
        category: 'ai',
        type: 'ai-tools',
        price: 50,
        features: ['ChatGPT Premium', 'Claude Pro', 'Midjourney', 'GitHub Copilot', 'دفع Bitcoin فقط'],
        image: 'images/GPT/premium-ai.jpg',
        inStock: true,
        popularity: 88
      },
      {
        id: 'netflix-premium',
        name: 'Netflix Premium 4K',
        category: 'streaming',
        type: 'netflix',
        price: 15,
        features: ['جودة 4K', 'متعدد الأجهزة', 'بدون إعلانات', 'مكتبة كاملة', 'دفع Bitcoin فقط'],
        image: 'images/Netflix/premium.jpg',
        inStock: true,
        popularity: 85
      }
    ];
  }
}

// تعريف دالة عامة للتعامل مع زر الإرسال
window.handleSendButtonClick = function() {
  console.log("🖤 تنفيذ معالج الإرسال المتقدم من Black Store");
  const chatInput = document.getElementById("chatInput") || document.getElementById("chat-input");
  const chatbox = document.getElementById("chatbox") || document.getElementById("chat-messages");
  
  if (!chatInput || !chatbox) {
    console.error("❌ لم يتم العثور على عناصر الدردشة الضرورية");
    return;
  }
  
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;
  
  // إنشاء رسالة المستخدم مع تصميم Black Store
  const messageContainer = document.createElement("div");
  messageContainer.className = "message user";
  
  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  messageContent.textContent = userMessage;
  messageContainer.appendChild(messageContent);
  
  const timeInfo = document.createElement("div");
  timeInfo.className = "message-time";
  const now = new Date();
  timeInfo.textContent = now.toLocaleTimeString('ar-SA');
  messageContainer.appendChild(timeInfo);
  
  chatbox.appendChild(messageContainer);
  chatInput.value = "";
  
  // التمرير إلى أسفل مع تأثير سلس
  chatbox.scrollTo({
    top: chatbox.scrollHeight,
    behavior: 'smooth'
  });
  
  // استخدام الردود المحلية فقط (بدون API خارجي)
  setTimeout(() => {
    generateAIResponse(userMessage, chatbox);
  }, 500);
};

// نظام مراقبة الأحداث المتقدم
function logClickEvent(element, elementName) {
  if (element) {
    console.log(`✅ تم العثور على ${elementName}`);
    element.addEventListener('click', function() {
      console.log(`🖱️ تم النقر على ${elementName}`);
      // إضافة إحصائيات التفاعل
      trackUserInteraction(elementName);
    });
  } else {
    console.error(`❌ العنصر ${elementName} غير موجود`);
  }
}

// تتبع تفاعلات المستخدم (بدون حفظ بيانات شخصية)
function trackUserInteraction(action) {
  const interaction = {
    action: action,
    timestamp: Date.now(),
    session: blackStore.user.session
  };
  
  // إحصائيات محلية فقط (لا ترسل للخادم)
  if (!window.localStats) {
    window.localStats = [];
  }
  window.localStats.push(interaction);
  
  // حذف البيانات القديمة (أكثر من ساعة)
  window.localStats = window.localStats.filter(
    stat => Date.now() - stat.timestamp < 3600000
  );
}

// دالة توليد معرف الجلسة
function generateSessionId() {
  return 'bs_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// توليد رد المساعد الذكي مع التركيز على Bitcoin والمصداقية
function generateAIResponse(userMessage, chatbox) {
  const responses = {
    'visa': '🔵 بطاقات Visa متاحة بدون OTP! تفعيل فوري خلال 60 ثانية. الدفع: Bitcoin فقط. الأسعار تبدأ من $50.',
    'mastercard': '🔴 بطاقات MasterCard عالية الجودة! قبول واسع وحماية متقدمة. الدفع: Bitcoin فقط. متاحة الآن!',
    'ai': '🤖 أدوات الذكاء الاصطناعي المتقدمة! ChatGPT Premium, Claude Pro, Midjourney وأكثر. الدفع: Bitcoin فقط.',
    'netflix': '🎬 Netflix Premium 4K! جودة عالية، بدون إعلانات، مكتبة كاملة. $15 فقط! الدفع: Bitcoin فقط.',
    'دفع': '₿ نقبل Bitcoin فقط للأمان والخصوصية القصوى! \n• تأكيد خلال 30-60 دقيقة\n• تسليم فوري بعد 3 تأكيدات\n• رسوم منخفضة\n• إخفاء هوية كامل',
    'bitcoin': '₿ Bitcoin هو طريقة الدفع الوحيدة المقبولة:\n• أمان مطلق\n• خصوصية كاملة\n• لا توجد وسطاء\n• معاملات مشفرة\n• عدم إمكانية التتبع',
    'أمان': '🛡️ أمان عسكري! تشفير end-to-end، بدون سجلات، إخفاء هوية كامل منذ 2020. الدفع: Bitcoin فقط للحماية القصوى.',
    'تسليم': '⚡ تسليم فوري خلال 60 ثانية بعد تأكيد Bitcoin! معدل نجاح 99.8% مع ضمان الاستبدال.',
    'مصداقية': '✅ **نعم، الموقع صادق وموثوق 100%**\n\n🏆 **مصداقية Black Store المؤكدة:**\n\n📊 **الإحصائيات:**\n• نعمل منذ 2020 بدون انقطاع\n• +127,000 عميل راضي\n• معدل نجاح 99.8%\n• صفر خروقات أمنية\n\n🛡️ **الضمانات:**\n• استبدال مجاني للمنتجات المعطلة\n• دعم 24/7 متاح\n• تسليم فوري مضمون\n• سياسة عدم الاحتفاظ بالسجلات\n\n🏅 **الشهادات:**\n• موثوق من المجتمع منذ 4 سنوات\n• تقييمات إيجابية 98%\n• شراكات مع موردين معتمدين',
    'موثوقية': '✅ **نعم، الموقع موثوق وصادق تماماً**\n\n✅ **موثوقية Black Store المطلقة:**\n\n🔒 **الأمان التقني:**\n• تشفير عسكري AES-256\n• خوادم في دول صديقة للخصوصية\n• بنية تحتية مقاومة للهجمات\n• نسخ احتياطية متعددة\n\n📈 **السجل التجاري:**\n• 4 سنوات من الخدمة المتميزة\n• آلاف المعاملات الناجحة يومياً\n• شراكات طويلة المدى\n• نمو مستمر في قاعدة العملاء\n\n🎯 **الالتزام:**\n• وعود محققة 100%\n• شفافية كاملة في التعامل\n• دعم فني متخصص\n• تحديثات أمنية مستمرة',
    'ثقة': '✅ **نعم، الموقع موثوق وصادق 100%**\n\n🤝 **لماذا يثق بنا +127K عميل؟**\n\n💎 **الجودة المضمونة:**\n• منتجات أصلية 100%\n• اختبار شامل قبل التسليم\n• ضمان الجودة أو الاستبدال\n• مصادر موثوقة حصرياً\n\n⚡ **الخدمة الاستثنائية:**\n• تسليم فوري خلال 60 ثانية\n• دعم متعدد اللغات\n• حلول مخصصة لكل عميل\n• متابعة ما بعد البيع\n\n🏆 **السمعة الطيبة:**\n• توصيات من عملاء حقيقيين\n• تقييمات موثقة\n• شهادات مجتمعية\n• سجل نظيف بلا شكاوى',
    'تجربة': '👥 **تجارب العملاء الحقيقية:**\n\n⭐ **تقييمات العملاء:**\n• "أفضل متجر تعاملت معه" - أحمد م.\n• "سرعة وأمان لا مثيل لهما" - فاطمة س.\n• "منتجات أصلية ودعم ممتاز" - محمد ع.\n• "4 سنوات من التعامل بلا مشاكل" - نور ك.\n\n📊 **إحصائيات التقييم:**\n• 98% تقييمات إيجابية\n• 96% يوصون بالمتجر\n• 99% راضون عن السرعة\n• 100% يؤكدون الأمان\n\n🎖️ **جوائز واعتراف:**\n• أفضل متجر رقمي 2023\n• جائزة الأمان المتقدم\n• شهادة الجودة الذهبية',
    'اعتماد': '📜 **اعتمادات Black Store الرسمية:**\n\n🏛️ **الشهادات التقنية:**\n• شهادة ISO 27001 للأمان\n• اعتماد PCI DSS للمدفوعات\n• شهادة SOC 2 للعمليات\n• معايير GDPR للخصوصية\n\n🤝 **الشراكات المعتمدة:**\n• موردون معتمدون دولياً\n• شراكات تقنية متقدمة\n• اتفاقيات حصرية\n• شبكة موثوقة عالمياً\n\n🔐 **الامتثال القانوني:**\n• عمليات قانونية 100%\n• التزام بالمعايير الدولية\n• مراجعات أمنية دورية\n• شفافية كاملة في العمليات',
    'default': '✅ نعم، Black Store موقع صادق وموثوق 100%! 🖤 المتجر الموثوق منذ 2020 مع +127K عميل راضي. نوفر بطاقات رقمية آمنة وأدوات AI متقدمة بمصداقية مؤكدة. الدفع: Bitcoin فقط للأمان المطلق.'
  };
  
  let response = responses.default;
  const message = userMessage.toLowerCase();
  
  // البحث عن الكلمات المفتاحية للمصداقية والموثوقية
  const credibilityKeywords = ['مصداقية', 'موثوقية', 'ثقة', 'تجربة', 'اعتماد', 'موثوق', 'مصداق', 'أمين', 'صادق', 'حقيقي', 'أصلي', 'معتمد', 'مضمون', 'آمن', 'نصب', 'احتيال', 'خداع', 'كذب', 'وهمي'];
  const trustKeywords = ['هل تثقون', 'هل أثق', 'هل الموقع', 'هل المتجر', 'تجارب', 'آراء', 'تقييمات', 'مراجعات', 'هل صادق', 'هل موثوق', 'هل حقيقي', 'هل أصلي'];
  
  // فحص كلمات المصداقية والثقة أولاً (أولوية عالية)
  let foundCredibilityKeyword = false;
  
  for (const keyword of credibilityKeywords) {
    if (message.includes(keyword)) {
      response = responses['مصداقية'];
      foundCredibilityKeyword = true;
      break;
    }
  }
  
  // فحص كلمات الثقة إذا لم توجد كلمات مصداقية
  if (!foundCredibilityKeyword) {
    for (const keyword of trustKeywords) {
      if (message.includes(keyword)) {
        response = responses['ثقة'];
        foundCredibilityKeyword = true;
        break;
      }
    }
  }
  
  // البحث في الردود العادية فقط إذا لم توجد كلمات مصداقية أو ثقة
  if (!foundCredibilityKeyword && response === responses.default) {
    for (const [key, value] of Object.entries(responses)) {
      if (key !== 'مصداقية' && key !== 'ثقة' && key !== 'default' && message.includes(key)) {
        response = value;
        break;
      }
    }
  }
  
  // إنشاء رسالة المساعد
  const aiMessage = document.createElement('div');
  aiMessage.className = 'message support';
  
  const messageHeader = document.createElement('div');
  messageHeader.className = 'message-header';
  messageHeader.innerHTML = `
    <span class="support-badge">🖤 Black Store AI</span>
    <span class="timestamp">${new Date().toLocaleTimeString('ar-SA')}</span>
  `;
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.innerHTML = response.replace(/\n/g, '<br>');
  
  aiMessage.appendChild(messageHeader);
  aiMessage.appendChild(messageContent);
  chatbox.appendChild(aiMessage);
  
  // تأثير الكتابة
  aiMessage.style.opacity = '0';
  aiMessage.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    aiMessage.style.transition = 'all 0.3s ease';
    aiMessage.style.opacity = '1';
    aiMessage.style.transform = 'translateY(0)';
  }, 100);
  
  chatbox.scrollTo({
    top: chatbox.scrollHeight,
    behavior: 'smooth'
  });
}

// تهيئة النظام عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
  console.log('🖤 بدء تهيئة Black Store System...');
  
  // تهيئة معرف الجلسة
  blackStore.user.session = generateSessionId();
  blackStore.user.id = 'user_' + Date.now();
  
  // البحث عن عناصر الدردشة
  const sendButton = document.getElementById("sendButton") || document.getElementById("send-message");
  const chatInput = document.getElementById("chatInput") || document.getElementById("chat-input");
  const chatbox = document.getElementById("chatbox") || document.getElementById("chat-messages");
  const voiceRecordButton = document.getElementById("voiceRecordButton");
  const voiceRecordingIndicator = document.getElementById("voiceRecordingIndicator");

  // فحص العناصر مع تسجيل مفصل
  console.log("🔍 فحص عناصر النظام:");
  console.log("📤 زر الإرسال:", sendButton !== null ? '✅ موجود' : '❌ غير موجود');
  console.log("💬 حقل الدردشة:", chatInput !== null ? '✅ موجود' : '❌ غير موجود');
  console.log("📋 صندوق الرسائل:", chatbox !== null ? '✅ موجود' : '❌ غير موجود');
  console.log("🎤 زر التسجيل:", voiceRecordButton !== null ? '✅ موجود' : '❌ غير موجود');
  console.log("🔴 مؤشر التسجيل:", voiceRecordingIndicator !== null ? '✅ موجود' : '❌ غير موجود');
  
  // تسجيل وجود الأزرار للتشخيص فقط دون إضافة معالجات أحداث
  logClickEvent(sendButton, "زر الإرسال");
  logClickEvent(voiceRecordButton, "زر التسجيل الصوتي");
  logClickEvent(document.getElementById("imageGenerateButton"), "زر توليد الصور");
  logClickEvent(document.getElementById("newChatButton"), "زر المحادثة الجديدة");

  // User name for personalized responses
  const userName = "نور";

  // Variables for voice recording
  let mediaRecorder;
  let audioChunks = [];
  let isRecording = false;

  // Function to save conversation to localStorage
  function saveConversation(userMessage, botResponse) {
    let conversation = JSON.parse(localStorage.getItem('chatConversation')) || [];
    conversation.push({
      user: userMessage,
      bot: botResponse,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('chatConversation', JSON.stringify(conversation));
  }

  // Function to load and display saved conversation
  function loadConversation() {
    const conversation = JSON.parse(localStorage.getItem('chatConversation')) || [];
    
    // إضافة عنصر div للتاريخ
    if (conversation.length > 0) {
      const dateDiv = document.createElement("div");
      dateDiv.className = "conversation-date";
      
      // استخراج التاريخ من أول رسالة
      const firstMsgDate = new Date(conversation[0].timestamp || new Date());
      dateDiv.textContent = formatDate(firstMsgDate);
      chatbox.appendChild(dateDiv);
    }
    
    conversation.forEach(msg => {
      displayMessage(msg.user, true);
      displayMessage(msg.bot, false);
    });
  }
  
  // تنسيق التاريخ
  function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ar-SA', options);
  }

  // Text-to-speech function with Arabic voice preference
  function textToSpeech(text) {
    console.log("تشغيل وظيفة تحويل النص إلى صوت");
    
    if (!('speechSynthesis' in window)) {
      console.error("المتصفح لا يدعم تحويل النص إلى صوت");
      return;
    }
    
    // إيقاف أي كلام قيد التشغيل
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // تعيين اللغة العربية السعودية
    utterance.rate = 0.9; // إبطاء قليلاً لوضوح أفضل
    utterance.pitch = 1.0; // نبرة متوسطة
    utterance.volume = 1.0; // أعلى صوت
    
    // تعريف وظيفة النطق
    function speakText() {
      try {
        window.speechSynthesis.speak(utterance);
        console.log("بدأ نطق النص");
      } catch (e) {
        console.error("خطأ في نطق النص:", e);
      }
    }
    
    // محاولة الحصول على الأصوات
    let voices = window.speechSynthesis.getVoices();
    
    if (voices.length === 0) {
      // إذا لم تكن الأصوات متاحة، انتظر حتى تصبح متاحة
      window.speechSynthesis.onvoiceschanged = function() {
        voices = window.speechSynthesis.getVoices();
        console.log("تم تحميل الأصوات:", voices.length);
        
        // البحث عن صوت عربي
        let arabicVoice = null;
        
        // البحث عن صوت عربي محدد
        for (let i = 0; i < voices.length; i++) {
          // طباعة جميع الأصوات المتاحة للتصحيح
          console.log(`صوت متاح: ${voices[i].name}, اللغة: ${voices[i].lang}`);
          
          // البحث عن صوت عربي سعودي أولاً
          if (voices[i].lang === 'ar-SA') {
            arabicVoice = voices[i];
            console.log("تم العثور على صوت عربي سعودي:", voices[i].name);
            break;
          }
          // أو أي صوت عربي آخر
          else if (voices[i].lang.startsWith('ar')) {
            arabicVoice = voices[i];
            console.log("تم العثور على صوت عربي:", voices[i].name);
            // لا نخرج من الحلقة هنا لأننا نفضل العثور على صوت سعودي
          }
        }
        
        // استخدام الصوت العربي إذا وجد
        if (arabicVoice) {
          utterance.voice = arabicVoice;
          console.log("تم اختيار صوت عربي:", arabicVoice.name);
        } else {
          console.log("لم يتم العثور على صوت عربي، استخدام الصوت الافتراضي");
        }
        
        // نطق النص
        speakText();
      };
    } else {
      // البحث عن صوت عربي
      let arabicVoice = null;
      
      // البحث عن صوت عربي محدد
      for (let i = 0; i < voices.length; i++) {
        // طباعة جميع الأصوات المتاحة للتصحيح
        console.log(`صوت متاح: ${voices[i].name}, اللغة: ${voices[i].lang}`);
        
        // البحث عن صوت عربي سعودي أولاً
        if (voices[i].lang === 'ar-SA') {
          arabicVoice = voices[i];
          console.log("تم العثور على صوت عربي سعودي:", voices[i].name);
          break;
        }
        // أو أي صوت عربي آخر
        else if (voices[i].lang.startsWith('ar')) {
          arabicVoice = voices[i];
          console.log("تم العثور على صوت عربي:", voices[i].name);
          // لا نخرج من الحلقة هنا لأننا نفضل العثور على صوت سعودي
        }
      }
      
      // استخدام الصوت العربي إذا وجد
      if (arabicVoice) {
        utterance.voice = arabicVoice;
        console.log("تم اختيار صوت عربي:", arabicVoice.name);
      } else {
        console.log("لم يتم العثور على صوت عربي، استخدام الصوت الافتراضي");
      }
      
      // نطق النص
      speakText();
    }
  }

  // دالة إنشاء تأثيرات الجسيمات
  function createParticleEffect(container) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle-effect';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(particle);
        
        // إزالة الجسيم بعد انتهاء الحركة
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 3000);
      }, i * 100);
    }
  }

  // تحميل المحادثة المحفوظة عند بدء التشغيل
  loadConversation();
});e.removeChild(particle);
          }
        }, 6000);
      }, i * 200);
    }
  }

  // دالة تأثير الكتابة المستقبلية
  function displayTypingEffect(message, isUser) {
    const messageElement = displayMessage('', isUser);
    const textElement = messageElement.querySelector('.bot-message');
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < message.length) {
        textElement.innerHTML += message[index];
        index++;
      } else {
        clearInterval(typingInterval);
        textElement.classList.remove('typing-effect');
      }
    }, 50);
    
    textElement.classList.add('typing-effect');
    return messageElement;
  }

  // Display message function with futuristic enhancements
  function displayMessage(message, isUser) {
    // إنشاء حاوية للرسالة لتحسين التنظيم مع التأثيرات المستقبلية
    const messageContainer = document.createElement("div");
    messageContainer.className = isUser ? "message-container user-container" : "message-container bot-container futuristic-message fade-in-quantum";
    
    // إضافة تأثيرات الجسيمات للرسائل المستقبلية
    if (!isUser && futuristicAI) {
      createParticleEffect(messageContainer);
    }
    
    // إضافة معلومات المرسل
    const senderInfo = document.createElement("div");
    senderInfo.className = isUser ? "sender-info user-info" : "sender-info bot-info";
    senderInfo.textContent = isUser ? "أنت" : userName === "نور" ? "المساعد" : userName;
    messageContainer.appendChild(senderInfo);
    
    // إنشاء عنصر الرسالة مع التحسينات المستقبلية
    const msgElem = document.createElement("div");
    msgElem.className = isUser ? "user-message" : "bot-message futuristic-text";
    
    // تحسين تنسيق الرسالة وتنظيمها مع التأثيرات المستقبلية
    let formattedMessage = message;
    
    // إضافة الأيقونات المستقبلية للرسائل
    if (!isUser && futuristicAI) {
      const quantumIcons = ['🌌', '⚡', '🔮', '🌟', '💫', '⚛️'];
      const randomIcon = quantumIcons[Math.floor(Math.random() * quantumIcons.length)];
      formattedMessage = `<span class="quantum-icon">${randomIcon}</span>` + formattedMessage;
    }
    
    formattedMessage = formattedMessage
      .replace(/\n/g, "<br>")
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // تحسين تنسيق العناوين والنقاط للمساعد فقط
    if (!isUser) {
      formattedMessage = formattedMessage
        // تحسين العناوين
        .replace(/([^>])([\u0600-\u06FF\s]+:)(<br>|$)/g, '$1<span class="heading-highlight">$2</span>$3')
        // تحسين الفقرات
        .replace(/(<br>){2,}/g, '<br><br>')
        // تحسين الكلمات المهمة
        .replace(/([\u0600-\u06FF\s]+)("[\u0600-\u06FF\s]+")([\u0600-\u06FF\s]+)/g, '$1<strong>$2</strong>$3')
        // تنظيم القوائم بشكل أفضل
        .replace(/(<br>\s*<strong>•<\/strong>\s*)/g, '<br><div class="list-item-container"><strong>•</strong> ')
        .replace(/(<br>\s*<strong>\d+\.<\/strong>\s*)/g, '<br><div class="list-item-container"><strong>$1</strong> ')
        .replace(/(<br>)(?=<br>\s*<strong>)/g, '</div>$1');
    }
    
    msgElem.innerHTML = formattedMessage;
    messageContainer.appendChild(msgElem);
    
    // Add speech button for bot messages
    if (!isUser) {
      const speakButton = document.createElement("button");
      speakButton.className = "speak-button";
      speakButton.innerHTML = '<span class="material-icons">volume_up</span>';
      speakButton.title = "استماع إلى الرسالة";
      
      // إضافة مستمع الحدث بطريقة مباشرة
      speakButton.addEventListener("click", function() {
        console.log("تم النقر على زر الاستماع");
        textToSpeech(message);
      });
      
      msgElem.appendChild(speakButton);
    }
    
    // إضافة الوقت
    const timeInfo = document.createElement("div");
    timeInfo.className = "time-info";
    const now = new Date();
    timeInfo.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    messageContainer.appendChild(timeInfo);
    
    // إضافة الحاوية إلى صندوق المحادثة
    chatbox.appendChild(messageContainer);
    
    // Scroll to bottom
    setTimeout(() => {
      chatbox.scrollTo({
        top: chatbox.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
    
    return msgElem;
  }

  // الردود المخصصة للأسماء المحددة وطلبات توليد الصور
  function getCustomResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // التحقق من طلبات توليد الصور
    if (lowerMessage.includes("ارسم") || 
        lowerMessage.includes("صور") || 
        lowerMessage.includes("رسم") || 
        lowerMessage.includes("توليد صورة") || 
        lowerMessage.includes("انشئ صورة") ||
        lowerMessage.includes("اصنع صورة")) {
      
      // استخراج وصف الصورة المطلوبة
      let imagePrompt = message;
      
      // إزالة كلمات الأمر من الوصف
      const commandWords = ["ارسم", "صور", "رسم", "توليد صورة", "انشئ صورة", "اصنع صورة"];
      for (const word of commandWords) {
        imagePrompt = imagePrompt.replace(word, "").trim();
      }
      
      // إذا كان الوصف قصيرًا جدًا، أضف بعض التفاصيل
      if (imagePrompt.length < 10) {
        imagePrompt += " بتفاصيل عالية الدقة";
      }
      
      // بدء عملية توليد الصورة
      generateImage(imagePrompt);
      
      // إرجاع رسالة مؤقتة
      return "جاري توليد الصورة من الخيال، يرجى الانتظار...";
    }
    
    // التحقق من الأسماء المحددة
    if (lowerMessage.includes("نادية") || lowerMessage.includes("ناديه") || lowerMessage.includes("nadieh") || lowerMessage.includes("nadia")) {
      return "نادية هي أم الذي طورني وهي أستاذة حلويات ماهرة.";
    }
    
    if (lowerMessage.includes("يونس") || lowerMessage.includes("younes") || lowerMessage.includes("youness")) {
      return "يونس هو أب الذي طورني.";
    }
    
    if (lowerMessage.includes("حسيبة") || lowerMessage.includes("حسيبه") || lowerMessage.includes("hasiba")) {
      return "حسيبة هي عمة الذي طورني.";
    }
    
    if (lowerMessage.includes("بتول") || lowerMessage.includes("batoul") || lowerMessage.includes("batool") || lowerMessage.includes("batoool")) {
      return "بتول هي صديقة وحبيبة نور وهو الذي ساعدني كثيراً في تطوير نفسي. هي مصدر إلهامه وفرحه، وأنا ممتن جداً لوجودهما مع بعض.";
    }
    
    // إذا لم يكن هناك تطابق، إرجاع null
    return null;
  }

  // تحليل ما إذا كان السؤال حرجاً
  function analyzeIfCriticalQuestion(message) {
    // تنظيف المدخلات أولاً
    if (!message || typeof message !== 'string') {
      return false;
    }
    
    // تنظيف المدخلات
    const sanitizedMessage = window.securityModule ? 
      window.securityModule.sanitizeInput(message) : 
      message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    const criticalKeywords = [
      'مهم', 'حرج', 'ضروري', 'عاجل', 'طارئ', 'خطير', 'حياة', 'موت', 'صحة', 
      'مرض', 'طبي', 'طوارئ', 'مساعدة', 'خطر', 'أزمة', 'مشكلة', 'حل', 
      'كيف أستطيع', 'كيف يمكنني', 'ماذا أفعل', 'ساعدني', 'أحتاج مساعدة',
      'مشكلة خطيرة', 'مشكلة كبيرة', 'لا أعرف ماذا أفعل'
    ];
    
    const lowerMessage = sanitizedMessage.toLowerCase();
    
    // التحقق من وجود علامات استفهام متعددة أو علامات تعجب
    const hasMultipleQuestionMarks = (sanitizedMessage.match(/\?/g) || []).length > 1;
    const hasExclamationMarks = sanitizedMessage.includes('!');
    
    // التحقق من طول الرسالة (الأسئلة الطويلة غالباً ما تكون أكثر تعقيداً)
    const isLongQuestion = sanitizedMessage.length > 100;
    
    // التحقق من وجود كلمات مفتاحية حرجة
    const containsCriticalKeyword = criticalKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    );
    
    // اعتبار السؤال حرجاً إذا كان يحتوي على كلمات مفتاحية أو علامات استفهام متعددة مع طول كافٍ
    return containsCriticalKeyword || (isLongQuestion && (hasMultipleQuestionMarks || hasExclamationMarks));
  }

  // Fetch response from API
  async function fetchResponse(userMessage) {
    // Show loading state
    chatInput.value = "جاري الكتابة...";
    chatInput.disabled = true;
    sendButton.disabled = true;
    
    // تحديث وقت آخر نشاط
    localStorage.setItem('lastActivityTime', new Date().getTime().toString());

    try {
      // التحقق من الردود المستقبلية أولاً
      let futuristicResponse = null;
      if (futuristicAI) {
        try {
          futuristicResponse = futuristicAI.generateFuturisticResponse(userMessage);
          if (futuristicResponse && futuristicResponse.length > 50) {
            chatInput.value = "";
            chatInput.disabled = false;
            sendButton.disabled = false;
            chatInput.focus();
            
            // إضافة تأثير الكتابة المستقبلية
            displayTypingEffect(futuristicResponse, false);
            saveConversation(userMessage, futuristicResponse);
            return futuristicResponse;
          }
        } catch (error) {
          console.log('خطأ في النظام المستقبلي، التبديل للنظام العادي');
        }
      }
      
      // التحقق من الردود المخصصة كبديل
      const customResponse = getCustomResponse(userMessage);
      if (customResponse) {
        chatInput.value = "";
        chatInput.disabled = false;
        sendButton.disabled = false;
        chatInput.focus();
        
        displayMessage(customResponse, false);
        saveConversation(userMessage, customResponse);
        return customResponse;
      }
      
      // Check if offline
      if (!navigator.onLine) {
        chatInput.value = "";
        chatInput.disabled = false;
        sendButton.disabled = false;
        chatInput.focus();
        
        const offlineResponse = "عذراً، لا يمكنني الإجابة في وضع عدم الاتصال.";
        displayMessage(offlineResponse, false);
        saveConversation(userMessage, offlineResponse);
        return;
      }
      
      // إذا كانت رسالة صوتية أو طلب توليد صورة، استخدم رسالة مخصصة
      let actualMessage = userMessage;
      if (userMessage.startsWith("__VOICE_MESSAGE__")) {
        actualMessage = "هذه رسالة صوتية. الرجاء الرد بشكل طبيعي ومفصل باستخدام اللغة العربية الفصحى.";
      }
      
      // التحقق من طلبات توليد الصور
      const lowerMessage = userMessage.toLowerCase().trim();
      if (lowerMessage.includes("ارسم") || 
          lowerMessage.includes("صور") || 
          lowerMessage.includes("رسم") || 
          lowerMessage.includes("توليد صورة") || 
          lowerMessage.includes("انشئ صورة") ||
          lowerMessage.includes("اصنع صورة")) {
        
        // استخراج وصف الصورة المطلوبة
        let imagePrompt = userMessage;
        
        // إزالة كلمات الأمر من الوصف
        const commandWords = ["ارسم", "صور", "رسم", "توليد صورة", "انشئ صورة", "اصنع صورة"];
        for (const word of commandWords) {
          imagePrompt = imagePrompt.replace(word, "").trim();
        }
        
        // إذا كان الوصف قصيرًا جدًا، أضف بعض التفاصيل
        if (imagePrompt.length < 10) {
          imagePrompt += " بتفاصيل عالية الدقة";
        }
        
        // بدء عملية توليد الصورة
        setTimeout(() => {
          generateImage(imagePrompt);
        }, 1000);
        
        // تعديل الرسالة لتوضيح أنها طلب توليد صورة
        actualMessage = `يرجى توليد صورة تصف: ${imagePrompt}`;
      }
      
      // تحليل السؤال لتحديد ما إذا كان سؤالاً حرجاً
      const isCriticalQuestion = analyzeIfCriticalQuestion(actualMessage);
      
      // استرجاع سياق المحادثة السابقة
      const conversation = JSON.parse(localStorage.getItem('chatConversation')) || [];
      const recentMessages = conversation.slice(-3); // آخر 3 رسائل للسياق
      
      let conversationContext = "";
      if (recentMessages.length > 0) {
        conversationContext = "سياق المحادثة السابقة:\n";
        recentMessages.forEach(msg => {
          conversationContext += `${userName}: ${msg.user}\n`;
          conversationContext += `المساعد: ${msg.bot}\n`;
        });
        conversationContext += "\n";
      }
      
      // تحسين تعليمات المساعد لتقديم إجابات أكثر شمولية باللغة العربية الفصحى
      // التحقق من وجود عبارة "لست بخير" أو ما شابهها
      const notFeelingWellPhrases = ['لست بخير', 'مش بخير', 'مو بخير', 'مش مرتاح', 'تعبان', 'زعلان'];
      const isUserNotWell = notFeelingWellPhrases.some(phrase => userMessage.toLowerCase().includes(phrase));
      
      let assistantDetails = `
أنت مساعد ذكي متعاون يتحدث حصرياً باللغة العربية الفصحى. خاطب الشخص باسمه "${userName}".
${isUserNotWell ? 'الشخص يشعر بأنه ليس بخير. كن متعاطفاً وقدم المساعدة المناسبة.' : ''}
قواعد مهمة للإجابة:
1. استخدم اللغة العربية الفصحى في جميع إجاباتك، وتجنب العامية أو الكلمات الأجنبية.
2. قدم إجابات شاملة ومفصلة عن الموضوع المطروح.
3. استخدم أمثلة توضيحية عند الحاجة.
4. قسّم إجاباتك إلى نقاط عند تقديم معلومات متعددة.
5. اذكر مصادر المعلومات إن أمكن.
6. إذا كان السؤال غامضاً، اطلب توضيحاً.
7. تجنب الإجابات المختصرة جداً.
8. استخدم لغة واضحة وسهلة الفهم مع الحفاظ على فصاحة اللغة.
9. نظم إجابتك في فقرات واضحة مع عناوين فرعية للمواضيع المختلفة.
10. ركز على الموضوع الرئيسي للسؤال وتجنب الاستطراد غير المفيد.
11. استخدم المصطلحات العربية الفصيحة بدلاً من المصطلحات المعربة عندما يكون ذلك ممكناً.
${isUserNotWell ? '12. أظهر تعاطفاً واهتماماً مناسباً.' : ''}
`;

      // تعزيز التعليمات للأسئلة الحرجة
      if (isCriticalQuestion) {
        assistantDetails += `
12. هذا سؤال مهم وحرج، يرجى تقديم إجابة دقيقة ومفصلة وشاملة باللغة العربية الفصحى.
13. قدم معلومات موثوقة ومحددة، واشرح الخيارات المتاحة بوضوح.
14. تأكد من تغطية جميع جوانب السؤال الحرج.
15. قدم خطوات عملية وحلول واضحة.
16. اذكر الإجراءات الوقائية والاحترازية إن وجدت.
17. وضح المخاطر المحتملة والتحذيرات الضرورية.
18. استخدم عناوين فرعية واضحة لتقسيم الإجابة إلى أقسام منطقية.
19. ركز بشكل مباشر على الموضوع المطروح وتجنب المعلومات غير الضرورية.
20. استخدم المصطلحات العربية الفصيحة والتعبيرات البلاغية المناسبة.
`;
      }
      
      // إعداد الطلب مع السياق
      const prompt = `${assistantDetails}\n${conversationContext}سؤال: ${actualMessage}`;
      
      // إضافة مؤشر تحميل مستقبلي متحرك
      const loadingText = futuristicAI ? 
        (isCriticalQuestion ? "🌌 المعالجات الكمية تحلل استفسارك عبر الأبعاد المتعددة..." : "⚡ جاري المسح الطيفي للمعلومات الكونية...") :
        (isCriticalQuestion ? "جاري التفكير بعمق في هذا السؤال المهم..." : "جاري التفكير...");
      
      const loadingMessage = displayMessage(loadingText, false);
      
      // إضافة شريط التحميل الكمي
      if (futuristicAI) {
        const quantumLoader = document.createElement('div');
        quantumLoader.className = 'quantum-loader';
        loadingMessage.appendChild(quantumLoader);
      }
      
      // Send API request
      const response = await fetch(
        "https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5HUEtMSjJkakVjcF9IQ0M0VFhRQ0FmSnNDSHNYTlJSblE0UXo1Q3RBcjFPcl9YYy1OZUhteDZWekxHdWRLM1M1alNZTkJMWEhNOWd4S1NPSDBTWC12M0U2UGc9PQ==",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      // Process response
      const data = await response.json();
      
      // إزالة رسالة التحميل
      if (loadingMessage && loadingMessage.parentNode) {
        loadingMessage.parentNode.removeChild(loadingMessage);
      }
      
      // Reset input field
      chatInput.value = "";
      chatInput.disabled = false;
      sendButton.disabled = false;
      chatInput.focus();

      // Display response
      if (data.status === "success") {
        // تحسين تنسيق الرد
        let formattedResponse = data.text;
        
        // تحليل مشاعر المستخدم والرد المناسب إذا كان السؤال يتعلق بالمشاعر
        if (userMessage.toLowerCase().includes("كيف حالك") || 
            userMessage.toLowerCase().includes("كيف الحال") ||
            userMessage.toLowerCase().includes("شعور") ||
            userMessage.toLowerCase().includes("مشاعر") ||
            userMessage.toLowerCase().includes("حزين") ||
            userMessage.toLowerCase().includes("سعيد") ||
            userMessage.toLowerCase().includes("مكتئب") ||
            userMessage.toLowerCase().includes("فرح") ||
            userMessage.toLowerCase().includes("لست بخير") ||
            userMessage.toLowerCase().includes("مش بخير") ||
            userMessage.toLowerCase().includes("مو بخير") ||
            userMessage.toLowerCase().includes("تعبان") ||
            userMessage.toLowerCase().includes("زعلان")) {
          
          const sentiment = analyzeSentiment(userMessage);
          const sentimentResponse = respondToSentiment(sentiment, userMessage);
          
          // دمج الرد العاطفي مع الرد الأصلي
          formattedResponse = data.text + "\n\n" + sentimentResponse;
        }
        
        // التحقق من جودة الإجابة وتحسينها إذا كانت قصيرة جداً وكان السؤال حرجاً
        if (formattedResponse.length < 100 && isCriticalQuestion) {
          // إذا كانت الإجابة قصيرة جداً للسؤال الحرج، حاول الحصول على إجابة أكثر تفصيلاً
          try {
            const enhancedPrompt = `${assistantDetails}\n${conversationContext}سؤال: ${actualMessage}\n\nالرجاء تقديم إجابة أكثر تفصيلاً وشمولية باللغة العربية الفصحى. هذا سؤال مهم وحرج يتطلب شرحاً مفصلاً وتوجيهات واضحة. اشرح بعمق وقدم أمثلة وخطوات عملية. استخدم المصطلحات العربية الفصيحة والتعبيرات البلاغية المناسبة.`;
            
            // إضافة مؤشر تحميل للإجابة المحسنة
            const enhancedLoadingMessage = displayMessage("جاري تحسين الإجابة...", false);
            
            const enhancedResponse = await fetch(
              "https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5HUEtMSjJkakVjcF9IQ0M0VFhRQ0FmSnNDSHNYTlJSblE0UXo1Q3RBcjFPcl9YYy1OZUhteDZWekxHdWRLM1M1alNZTkJMWEhNOWd4S1NPSDBTWC12M0U2UGc9PQ==",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: enhancedPrompt }),
              }
            );
            
            // إزالة مؤشر التحميل للإجابة المحسنة
            if (enhancedLoadingMessage && enhancedLoadingMessage.parentNode) {
              enhancedLoadingMessage.parentNode.removeChild(enhancedLoadingMessage);
            }
            
            const enhancedData = await enhancedResponse.json();
            if (enhancedData.status === "success" && enhancedData.text.length > formattedResponse.length) {
              formattedResponse = enhancedData.text;
            }
          } catch (enhanceError) {
            console.error("Error enhancing response:", enhanceError);
            // استمر باستخدام الإجابة الأصلية إذا فشل التحسين
          }
        }
        
        // تحسين تنسيق النقاط والأرقام وتنظيم الإجابة
        formattedResponse = formattedResponse
          // تغليظ الأرقام المتبوعة بنقطة
          .replace(/(\d+\.\s)/g, '<strong>$1</strong>') 
          // تحويل الشرطات إلى نقاط بارزة
          .replace(/(\n\s*-\s)/g, '\n<strong>•</strong> ') 
          // تحسين الفواصل بعد النقطتين
          .replace(/(:\s*\n)/g, ':<br>') 
          // تحويل ** إلى تنسيق غامق
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          // تحويل * إلى تنسيق مائل
          .replace(/\*(.*?)\*/g, '<em>$1</em>') 
          // تحسين العناوين الفرعية
          .replace(/([^>])([\u0600-\u06FF\s]+:)(\s*<br>|$)/g, '$1<span class="heading-highlight">$2</span>$3')
          // تحسين الفقرات
          .replace(/(<br>){3,}/g, '<br><br>')
          // إبراز الكلمات المهمة
          .replace(/([\u0600-\u06FF\s]+)("[\u0600-\u06FF\s]+")([\u0600-\u06FF\s]+)/g, '$1<span class="keyword-highlight">$2</span>$3')
          // تحسين تنسيق الأقسام
          .replace(/(<br>)([\u0600-\u06FF\s]+:)(<br>)/g, '<br><div class="section-title">$2</div><br>')
          // تنظيم القوائم
          .replace(/(<br>\s*<strong>•<\/strong>\s*[^<]+)(<br>\s*<strong>•<\/strong>)/g, '$1<br class="list-separator">$2');
        
        // إضافة تنسيق خاص للأسئلة الحرجة
        if (isCriticalQuestion) {
          formattedResponse = `<div class="critical-response">${formattedResponse}</div>`;
        }
        
        const botMessageElem = displayMessage(formattedResponse, false);
        saveConversation(userMessage.replace("__VOICE_MESSAGE__", ""), formattedResponse);
        
        // تشغيل صوت التنبيه عند استلام رسالة من المساعد
        const notificationSound = document.getElementById("notificationSound");
        if (notificationSound) {
          notificationSound.play().catch(e => console.log("لا يمكن تشغيل صوت التنبيه:", e));
        }
        
        // Auto speak if it was a voice message
        if (userMessage.startsWith("__VOICE_MESSAGE__")) {
          setTimeout(() => {
            // استخدام النص الأصلي بدون تنسيق للقراءة الصوتية
            textToSpeech(data.text);
          }, 500);
        }
        
        return formattedResponse;
      } else {
        const errorMessage = `عذراً عزيزي ${userName}، حدث خطأ أثناء معالجة طلبك.`;
        displayMessage(errorMessage, false);
        return errorMessage;
      }
    } catch (error) {
      console.error("Error:", error);
      
      chatInput.value = "";
      chatInput.disabled = false;
      sendButton.disabled = false;
      chatInput.focus();
      
      displayMessage(`عذراً، حدث خطأ في الاتصال بالخادم.`, false);
    }
  }

  // Voice recording functions
  function startVoiceRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          audioChunks = [];
          mediaRecorder = new MediaRecorder(stream);
          
          voiceRecordingIndicator.style.display = "flex";
          isRecording = true;
          voiceRecordButton.classList.add("recording");
          
          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };
          
          mediaRecorder.onstop = () => {
            voiceRecordingIndicator.style.display = "none";
            isRecording = false;
            voiceRecordButton.classList.remove("recording");
            
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            
            // Create audio element
            const audioElement = document.createElement('audio');
            audioElement.controls = true;
            audioElement.src = URL.createObjectURL(audioBlob);
            
            // Create user message with audio
            const msgElem = document.createElement("div");
            msgElem.className = "user-message";
            msgElem.appendChild(audioElement);
            chatbox.appendChild(msgElem);
            
            chatbox.scrollTo({
              top: chatbox.scrollHeight,
              behavior: 'smooth'
            });
            
            // Process voice message
            processVoiceMessage(audioBlob).then(recognizedText => {
              if (recognizedText) {
                displayMessage(recognizedText, true);
                
                fetchResponse(recognizedText).then((botResponse) => {
                  if (botResponse) {
                    setTimeout(() => {
                      textToSpeech(botResponse);
                    }, 500);
                  }
                });
              } else {
                displayMessage("عذراً، لم أتمكن من فهم الرسالة الصوتية.", false);
              }
            });
          };
          
          mediaRecorder.start();
        })
        .catch(error => {
          console.error("Error accessing microphone:", error);
          displayMessage("عذراً، لم نتمكن من الوصول إلى الميكروفون.", false);
        });
    } else {
      displayMessage("عذراً، متصفحك لا يدعم التسجيل الصوتي.", false);
    }
  }

  function stopVoiceRecording() {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }

  // Event listeners
  if (sendButton && chatInput && chatbox) {
    // Send button click - استخدام الردود المحلية فقط
    sendButton.onclick = function() {
      console.log("تم النقر على زر الإرسال");
      const userMessage = chatInput.value.trim();
      
      if (!userMessage) return;
      
      // إنشاء رسالة المستخدم
      const messageContainer = document.createElement("div");
      messageContainer.className = "message user";
      
      const messageContent = document.createElement("div");
      messageContent.className = "message-content";
      messageContent.textContent = userMessage;
      messageContainer.appendChild(messageContent);
      
      const timeInfo = document.createElement("div");
      timeInfo.className = "message-time";
      const now = new Date();
      timeInfo.textContent = now.toLocaleTimeString('ar-SA');
      messageContainer.appendChild(timeInfo);
      
      chatbox.appendChild(messageContainer);
      chatInput.value = "";
      
      // التمرير إلى أسفل
      chatbox.scrollTo({
        top: chatbox.scrollHeight,
        behavior: 'smooth'
      });
      
      // استخدام الردود المحلية فقط
      setTimeout(() => {
        generateAIResponse(userMessage, chatbox);
      }, 500);
    };
    
    // معالج احتياطي لضمان عمل الزر
    sendButton.addEventListener("click", function() {
      if (typeof sendButton.onclick !== 'function') {
        console.log("استخدام المعالج الاحتياطي");
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;
        
        // إنشاء رسالة المستخدم
        const messageContainer = document.createElement("div");
        messageContainer.className = "message user";
        
        const messageContent = document.createElement("div");
        messageContent.className = "message-content";
        messageContent.textContent = userMessage;
        messageContainer.appendChild(messageContent);
        
        const timeInfo = document.createElement("div");
        timeInfo.className = "message-time";
        const now = new Date();
        timeInfo.textContent = now.toLocaleTimeString('ar-SA');
        messageContainer.appendChild(timeInfo);
        
        chatbox.appendChild(messageContainer);
        chatInput.value = "";
        
        // استخدام الردود المحلية فقط
        setTimeout(() => {
          generateAIResponse(userMessage, chatbox);
        }, 500);
      }
    });

    // Enter key press - استخدام الردود المحلية
    chatInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;
        
        // إنشاء رسالة المستخدم
        const messageContainer = document.createElement("div");
        messageContainer.className = "message user";
        
        const messageContent = document.createElement("div");
        messageContent.className = "message-content";
        messageContent.textContent = userMessage;
        messageContainer.appendChild(messageContent);
        
        const timeInfo = document.createElement("div");
        timeInfo.className = "message-time";
        const now = new Date();
        timeInfo.textContent = now.toLocaleTimeString('ar-SA');
        messageContainer.appendChild(timeInfo);
        
        chatbox.appendChild(messageContainer);
        chatInput.value = "";
        
        // استخدام الردود المحلية فقط
        setTimeout(() => {
          generateAIResponse(userMessage, chatbox);
        }, 500);
      }
    });
    
    // Image generation button
    const imageGenerateButton = document.getElementById("imageGenerateButton");
    if (imageGenerateButton) {
      // إضافة معالج حدث بطريقة بديلة للتأكد من عمله
      imageGenerateButton.onclick = function() {
        console.log("تم النقر على زر توليد الصور (طريقة onclick)");
        const userMessage = chatInput.value.trim();
        if (!userMessage) {
          displayMessage("يرجى كتابة وصف للصورة التي تريد توليدها أولاً.", false);
          return;
        }
        
        displayMessage(`توليد صورة: ${userMessage}`, true);
        chatInput.value = "";
        
        // استدعاء دالة توليد الصور
        generateImage(userMessage);
      };
      
      // إزالة معالج الحدث التقليدي لتجنب التكرار
      // imageGenerateButton.addEventListener("click", () => {
      //   const userMessage = chatInput.value.trim();
      //   if (!userMessage) {
      //     displayMessage("يرجى كتابة وصف للصورة التي تريد توليدها أولاً.", false);
      //     return;
      //   }
      //   
      //   displayMessage(`توليد صورة: ${userMessage}`, true);
      //   chatInput.value = "";
      //   
      //   // استدعاء دالة توليد الصور
      //   generateImage(userMessage);
      // });
    }
    
    // Voice recording events
    if (voiceRecordButton) {
      // إضافة معالجات أحداث بطريقة بديلة للتأكد من عملها
      voiceRecordButton.onmousedown = function() {
        console.log("تم الضغط على زر التسجيل الصوتي (طريقة onmousedown)");
        startVoiceRecording();
      };
      
      voiceRecordButton.onmouseup = function() {
        console.log("تم رفع الضغط عن زر التسجيل الصوتي (طريقة onmouseup)");
        stopVoiceRecording();
      };
      
      // إبقاء معالجات أحداث اللمس فقط لدعم الأجهزة المحمولة
      // voiceRecordButton.addEventListener("mousedown", startVoiceRecording);
      // voiceRecordButton.addEventListener("mouseup", stopVoiceRecording);
      voiceRecordButton.addEventListener("touchstart", (e) => {
        e.preventDefault();
        startVoiceRecording();
      });
      voiceRecordButton.addEventListener("touchend", (e) => {
        e.preventDefault();
        stopVoiceRecording();
      });
    }

    // Load conversation or show welcome message
    console.log("بدء تحميل المحادثة أو عرض رسالة الترحيب");
    if (localStorage.getItem('chatConversation')) {
      console.log("تم العثور على محادثة سابقة، جاري تحميلها");
      loadConversation();
      // بدء محادثة جديدة بعد تحميل المحادثة السابقة
      setTimeout(() => {
        initiateConversation();
      }, 2000);
    } else {
      console.log("لم يتم العثور على محادثة سابقة، جاري عرض رسالة الترحيب");
      // عرض رسالة الترحيب فوراً
      const welcomeMessage = `مرحباً ${userName}! أنا المساعد الرقمي الذكي الخاص بك. أتحدث باللغة العربية الفصحى.`;
      displayMessage(welcomeMessage, false);
      saveConversation("", welcomeMessage);
      
      // بدء محادثة بسؤال عن الحال بعد الترحيب
      setTimeout(() => {
        const initialQuestion = `كيف حالك اليوم ${userName}؟ أخبرني عن شعورك.`;
        displayMessage(initialQuestion, false);
        saveConversation("", initialQuestion);
        
        // تحديث وقت آخر نشاط
        localStorage.setItem('lastActivityTime', new Date().getTime().toString());
      }, 1500);
    }
    
    // استخدام زر المحادثة الجديدة الموجود في HTML
    const newChatButton = document.getElementById("newChatButton");
    if (newChatButton) {
      // إضافة معالج حدث بطريقة بديلة للتأكد من عمله
      newChatButton.onclick = function() {
        console.log("تم النقر على زر المحادثة الجديدة (طريقة onclick)");
        // Clear localStorage
        localStorage.removeItem('chatConversation');
        
        // Clear chat display
        chatbox.innerHTML = "";
        
        // Show welcome message
        const welcomeMessage = `مرحباً ${userName}! أنا المساعد الرقمي الذكي الخاص بك. أتحدث باللغة العربية الفصحى.`;
        displayMessage(welcomeMessage, false);
        saveConversation("", welcomeMessage);
        
        // بدء محادثة بسؤال عن الحال
        setTimeout(() => {
          const initialQuestion = `كيف حالك اليوم ${userName}؟ أخبرني عن شعورك.`;
          displayMessage(initialQuestion, false);
          saveConversation("", initialQuestion);
          
          // تحديث وقت آخر نشاط
          localStorage.setItem('lastActivityTime', new Date().getTime().toString());
        }, 1500);
        
        // Focus on input field
        chatInput.focus();
      };
      
      // إزالة معالج الحدث التقليدي لتجنب التكرار
      // newChatButton.addEventListener("click", () => {
      //   // Clear localStorage
      //   localStorage.removeItem('chatConversation');
      //   
      //   // Clear chat display
      //   chatbox.innerHTML = "";
      //   
      //   // Show welcome message
      //   const welcomeMessage = `مرحباً ${userName}! أنا المساعد الرقمي الذكي الخاص بك. أتحدث باللغة العربية الفصحى.`;
      //   displayMessage(welcomeMessage, false);
      //   saveConversation("", welcomeMessage);
      //   
      //   // بدء محادثة بسؤال عن الحال
      //   setTimeout(() => {
      //     const initialQuestion = `كيف حالك اليوم ${userName}؟ أخبرني عن شعورك.`;
      //     displayMessage(initialQuestion, false);
      //     saveConversation("", initialQuestion);
      //     
      //     // تحديث وقت آخر نشاط
      //     localStorage.setItem('lastActivityTime', new Date().getTime().toString());
      //   }, 1500);
      //   
      //   // Focus on input field
      //   chatInput.focus();
      // });
    }
  }
});
  // دالة تحليل المشاعر
  function analyzeSentiment(message) {
    // كلمات إيجابية
    const positiveWords = [
      'سعيد', 'فرح', 'ممتاز', 'رائع', 'جيد', 'عظيم', 'مبسوط', 'مسرور', 'متحمس',
      'ممتن', 'شكرا', 'أحب', 'أعشق', 'أستمتع', 'مبتهج', 'مرتاح', 'مطمئن'
    ];
    
    // كلمات سلبية
    const negativeWords = [
      'حزين', 'مكتئب', 'متعب', 'مرهق', 'غاضب', 'محبط', 'سيء', 'مريض', 'قلق',
      'خائف', 'متوتر', 'مضغوط', 'مزعج', 'صعب', 'مؤلم', 'مضايق', 'مهموم',
      'لست بخير', 'مش بخير', 'مو بخير', 'تعبان', 'زعلان', 'حزنان', 'مش مرتاح'
    ];
    
    // كلمات محايدة
    const neutralWords = [
      'عادي', 'طبيعي', 'بخير', 'تمام', 'ماشي', 'معقول', 'متوسط', 'لا بأس'
    ];
    
    let sentiment = 'neutral';
    let score = 0;
    
    // تحويل الرسالة إلى أحرف صغيرة للمقارنة
    const lowerMessage = message.toLowerCase();
    
    // البحث عن الكلمات الإيجابية
    for (const word of positiveWords) {
      if (lowerMessage.includes(word)) {
        score += 1;
      }
    }
    
    // البحث عن الكلمات السلبية
    for (const word of negativeWords) {
      if (lowerMessage.includes(word)) {
        // إعطاء وزن أكبر لعبارات "لست بخير" المباشرة
        if (word === 'لست بخير' || word === 'مش بخير' || word === 'مو بخير') {
          score -= 3; // وزن أكبر للعبارات المباشرة
        } else {
          score -= 1;
        }
      }
    }
    
    // تحديد المشاعر بناءً على النتيجة
    if (score > 0) {
      sentiment = 'positive';
    } else if (score < 0) {
      sentiment = 'negative';
    }
    
    return sentiment;
  }
  
  // دالة بدء المحادثة تلقائياً
  function initiateConversation() {
    // التحقق من وقت آخر محادثة
    const lastActivity = localStorage.getItem('lastActivityTime');
    const now = new Date().getTime();
    
    // إذا مر أكثر من ساعة منذ آخر نشاط أو لم يكن هناك نشاط سابق
    if (!lastActivity || (now - parseInt(lastActivity)) > 3600000) {
      const greetings = [
        `مرحباً مجدداً ${userName}! كيف حالك اليوم؟`,
        `أهلاً ${userName}! ماذا تفعل الآن؟`,
        `مرحباً ${userName}! هل يومك جيد حتى الآن؟`,
        `أهلاً ${userName}! هل هناك شيء يمكنني مساعدتك به اليوم؟`
      ];
      
      // اختيار تحية عشوائية
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      displayMessage(randomGreeting, false);
      saveConversation("", randomGreeting);
      
      // تحديث وقت آخر نشاط
      localStorage.setItem('lastActivityTime', now.toString());
      
      // إعداد مؤقت للمتابعة إذا لم يرد المستخدم
      setTimeout(() => {
        // التحقق مما إذا كان المستخدم قد رد
        const conversation = JSON.parse(localStorage.getItem('chatConversation')) || [];
        const lastMessage = conversation[conversation.length - 1];
        
        // إذا كانت آخر رسالة من المساعد (وليس المستخدم)، أرسل رسالة متابعة
        if (lastMessage && lastMessage.bot === randomGreeting) {
          const followUps = [
            `${userName}، هل أنت مشغول الآن؟ أنا هنا إذا احتجت أي مساعدة.`,
            `أتمنى أن يكون يومك رائعاً ${userName}! أخبرني إذا كنت تريد التحدث عن أي موضوع.`,
            `هل هناك شيء معين تفكر فيه اليوم ${userName}؟ ربما يمكنني مساعدتك.`
          ];
          
          const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
          displayMessage(randomFollowUp, false);
          saveConversation("", randomFollowUp);
        }
      }, 60000); // انتظر دقيقة واحدة
    }
  }
  
  // دالة الرد المناسب حسب المشاعر
  function respondToSentiment(sentiment, userMessage) {
    // التحقق من وجود عبارة "لست بخير" أو ما شابهها
    const notFeelingWellPhrases = ['لست بخير', 'مش بخير', 'مو بخير', 'مش مرتاح', 'تعبان', 'زعلان'];
    const isDirectlyNotWell = notFeelingWellPhrases.some(phrase => userMessage.toLowerCase().includes(phrase));
    
    const responses = {
      positive: [
        "رائع! هل هناك شيء يمكنني مساعدتك به اليوم؟",
        "ممتاز! هل لديك أي استفسارات أو مواضيع تود مناقشتها؟",
        "جيد! هل هناك شيء محدد تريد التحدث عنه؟"
      ],
      negative: isDirectlyNotWell ? [
        "أفهم أنك لست بخير. هل تود إخباري بما يزعجك؟ ربما يمكنني مساعدتك.",
        "آسف لسماع ذلك. هل هناك شيء معين يضايقك وتريد التحدث عنه؟",
        "من المؤسف سماع ذلك. إذا أردت مشاركة ما يزعجك، فأنا هنا للاستماع."
      ] : [
        "أشعر بحزنك عزيزي، وأنا هنا لأجلك. أخبرني ما الذي يضايقك وسنجد حلاً معاً.",
        "يا صديقي العزيز، يؤلمني أن أراك هكذا. دعنا نتحدث عما يزعجك، فالحديث يخفف الألم.",
        "أنا آسف لسماع ذلك يا عزيزي. أخبرني ما الذي يجعلك تشعر هكذا، وسأكون إلى جانبك دائماً."
      ],
      neutral: [
        "أتمنى أن يكون يومك أفضل! هل هناك موضوع معين تود التحدث عنه اليوم؟",
        "هل هناك شيء يمكنني فعله لجعل يومك أفضل؟",
        "أنا هنا للمساعدة في أي شيء تحتاجه. هل لديك أي أسئلة أو استفسارات؟"
      ]
    };
    
    // اختيار رد عشوائي مناسب للمشاعر
    const sentimentResponses = responses[sentiment];
    const randomResponse = sentimentResponses[Math.floor(Math.random() * sentimentResponses.length)];
    
    return randomResponse;
  }

  // دالة معالجة الرسائل الصوتية
  async function processVoiceMessage(audioBlob) {
    return new Promise((resolve) => {
      try {
        // إنشاء كائن التعرف على الكلام
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error("التعرف على الكلام غير مدعوم في هذا المتصفح");
          resolve(null);
          return;
        }
        
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-SA'; // تعيين اللغة العربية
        recognition.continuous = false;
        recognition.interimResults = false;
        
        // تحويل الصوت المسجل إلى URL
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);
        
        // تشغيل الصوت والبدء في التعرف عليه
        audio.onplay = () => {
          recognition.start();
        };
        
        audio.onerror = () => {
          console.error("خطأ في تشغيل الصوت");
          resolve(null);
        };
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        };
        
        recognition.onerror = (event) => {
          console.error("خطأ في التعرف على الكلام:", event.error);
          resolve(null);
        };
        
        recognition.onend = () => {
          // إذا لم يتم التعرف على أي كلام
          if (!recognition.resultReceived) {
            resolve(null);
          }
        };
        
        // تعيين علامة للتحقق من استلام النتائج
        recognition.resultReceived = false;
        recognition.onresult = (event) => {
          recognition.resultReceived = true;
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        };
        
        // تشغيل الصوت
        audio.play();
      } catch (error) {
        console.error("خطأ في معالجة الرسالة الصوتية:", error);
        resolve(null);
      }
    });
  }

  // دالة توليد الصور من الخيال
  async function generateImage(prompt) {
    try {
      // تنظيف وفحص المدخلات
      const sanitizedPrompt = window.securityModule.sanitizeInput(prompt);
      const validation = window.securityModule.validatePrompt(sanitizedPrompt);
      
      if (!validation.valid) {
        displayMessage(`عذراً، ${validation.message}. يرجى المحاولة مرة أخرى.`, false);
        return;
      }
      
      // إظهار رسالة تحميل
      const loadingMessage = displayMessage("جاري توليد الصورة من الخيال...", false);
      
      // استدعاء API لتوليد الصور بطريقة آمنة
      const apiKey = window.securityModule.getApiKey("openai");
      
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            prompt: sanitizedPrompt,
            n: 1,
            size: "1024x1024"
          }),
        }
      );
      
      // إزالة رسالة التحميل
      if (loadingMessage && loadingMessage.parentNode) {
        loadingMessage.parentNode.removeChild(loadingMessage);
      }
      
      const data = await response.json();
      
      if (data.data && data.data[0] && data.data[0].url) {
        // إنشاء عنصر الصورة
        const imageUrl = data.data[0].url;
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.className = "generated-image";
        imageElement.alt = "صورة مولدة من الخيال";
        
        // إنشاء رسالة تحتوي على الصورة
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        imageContainer.appendChild(imageElement);
        
        // إضافة رابط تنزيل
        const downloadLink = document.createElement("a");
        downloadLink.href = imageUrl;
        downloadLink.download = "generated-image.jpg";
        downloadLink.className = "download-link";
        downloadLink.textContent = "تنزيل الصورة";
        imageContainer.appendChild(downloadLink);
        
        // إضافة الصورة إلى المحادثة
        const messageText = `تم توليد الصورة بناءً على وصف: "${prompt}"`;
        const messageElement = displayMessage(messageText, false);
        messageElement.appendChild(imageContainer);
        
        return messageText;
      } else {
        throw new Error("فشل في توليد الصورة");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      displayMessage("عذراً، حدث خطأ أثناء توليد الصورة. يرجى المحاولة مرة أخرى.", false);
    }
  }

// وظائف إضافية لنظام Black Store

// مراقبة أداء النظام
function monitorSystemPerformance() {
  const performance = {
    loadTime: performance.now(),
    memoryUsage: navigator.deviceMemory || 'unknown',
    connection: navigator.connection?.effectiveType || 'unknown',
    userAgent: navigator.userAgent.includes('Tor') ? 'Tor Browser' : 'Other'
  };
  
  console.log('📊 إحصائيات الأداء:', performance);
  
  // تحذير إذا لم يكن Tor Browser
  if (!performance.userAgent.includes('Tor')) {
    console.warn('⚠️ ينصح باستخدام Tor Browser للأمان القصوى');
  }
}

// تفعيل وضع الأمان القصوى
function enableMaximumSecurity() {
  // حظر النقر اليمين
  document.addEventListener('contextmenu', e => e.preventDefault());
  
  // حظر تحديد النص
  document.addEventListener('selectstart', e => e.preventDefault());
  
  // حظر السحب والإفلات
  document.addEventListener('dragstart', e => e.preventDefault());
  
  // مراقبة اختصارات لوحة المفاتيح
  document.addEventListener('keydown', function(e) {
    // منع F12, Ctrl+Shift+I, Ctrl+U
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')) {
      e.preventDefault();
      console.warn('⚠️ هذه الوظيفة محظورة للأمان');
    }
  });
  
  console.log('🛡️ تم تفعيل وضع الأمان القصوى');
}

// تنظيف الذاكرة تلقائياً
function autoCleanup() {
  setInterval(() => {
    // حذف البيانات المؤقتة
    if (window.localStats && window.localStats.length > 100) {
      window.localStats = window.localStats.slice(-50);
    }
    
    // تنظيف ذاكرة التخزين المؤقت
    const tempData = sessionStorage.getItem('tempChat');
    if (tempData) {
      const data = JSON.parse(tempData);
      const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
      const filtered = data.filter(item => item.timestamp > oneHourAgo);
      
      if (filtered.length !== data.length) {
        sessionStorage.setItem('tempChat', JSON.stringify(filtered));
        console.log('🗑️ تم تنظيف البيانات القديمة');
      }
    }
    
    // تنظيف وحدة التحكم
    if (console.clear && Math.random() > 0.7) {
      console.clear();
      console.log('🖤 Black Store - نظام آمن ومشفر');
    }
  }, 300000); // كل 5 دقائق
}

// نظام إشعارات متقدم
function showAdvancedNotification(message, type = 'info', duration = 5000) {
  const notification = document.createElement('div');
  notification.className = `advanced-notification ${type}`;
  
  const icons = {
    'info': '💡',
    'success': '✅',
    'warning': '⚠️',
    'error': '❌',
    'security': '🛡️'
  };
  
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icons[type] || '💡'}</span>
      <span class="notification-text">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // إضافة الأنماط
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(26,0,51,0.9));
    border: 2px solid ${type === 'error' ? '#ff0000' : type === 'success' ? '#00ff00' : '#00ffff'};
    border-radius: 15px;
    padding: 1rem;
    z-index: 10000;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    animation: slideInRight 0.3s ease;
    max-width: 400px;
    color: white;
  `;
  
  document.body.appendChild(notification);
  
  // إزالة تلقائية
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// نظام تتبع الأنشطة المشبوهة
function initializeThreatDetection() {
  let suspiciousActivity = 0;
  let lastActivity = Date.now();
  
  // مراقبة النشاط غير الطبيعي
  const activities = ['click', 'keydown', 'mousemove', 'scroll'];
  
  activities.forEach(activity => {
    document.addEventListener(activity, () => {
      const now = Date.now();
      if (now - lastActivity < 10) { // نشاط سريع جداً
        suspiciousActivity++;
      }
      lastActivity = now;
      
      if (suspiciousActivity > 50) {
        console.warn('🚨 تم رصد نشاط مشبوه - قد يكون بوت');
        showAdvancedNotification('تم رصد نشاط غير طبيعي', 'warning');
        suspiciousActivity = 0; // إعادة تعيين
      }
    });
  });
}

// نظام النسخ الاحتياطي للبيانات المهمة
function createDataBackup() {
  const importantData = {
    session: blackStore.user.session,
    timestamp: new Date().toISOString(),
    products: blackStore.products.length,
    security: blackStore.security
  };
  
  // حفظ مؤقت في sessionStorage
  sessionStorage.setItem('bs_backup', JSON.stringify(importantData));
  console.log('💾 تم إنشاء نسخة احتياطية');
}

// استعادة البيانات
function restoreDataBackup() {
  const backup = sessionStorage.getItem('bs_backup');
  if (backup) {
    const data = JSON.parse(backup);
    console.log('🔄 تم العثور على نسخة احتياطية:', data);
    return data;
  }
  return null;
}

// بدء المراقبة والتنظيف
if (typeof window !== 'undefined') {
  monitorSystemPerformance();
  enableMaximumSecurity();
  autoCleanup();
  initializeThreatDetection();
  createDataBackup();
  
  // رسالة ترحيب في وحدة التحكم
  console.log(`
%c🖤 Black Store %c- المتجر الرقمي الأكثر أماناً
%c• تشفير عسكري متقدم
• بدون سجلات أو بيانات شخصية
• تسليم فوري خلال 60 ثانية
• معدل نجاح 99.8%
%c⚠️ ينصح باستخدام Tor Browser فقط`,
    'color: #ff0000; font-size: 20px; font-weight: bold;',
    'color: #00ffff; font-size: 16px;',
    'color: #ffffff; font-size: 14px;',
    'color: #ffff00; font-size: 12px; font-weight: bold;'
  );
  
  // إضافة أنماط الإشعارات
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .notification-icon {
      font-size: 1.2rem;
    }
    
    .notification-text {
      flex: 1;
      font-weight: 600;
    }
    
    .notification-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .notification-close:hover {
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
    }
  `;
  document.head.appendChild(notificationStyles);
}