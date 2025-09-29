// JavaScript للتصميم الجديد

// تأثير التمرير للهيدر
window.addEventListener('scroll', function() {
    const header = document.querySelector('.modern-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// تبديل القائمة المحمولة
function toggleMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileToggle.classList.toggle('active');
    
    if (mainNav.style.display === 'flex') {
        mainNav.style.display = 'none';
    } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '100%';
        mainNav.style.left = '0';
        mainNav.style.right = '0';
        mainNav.style.background = 'rgba(0, 0, 0, 0.95)';
        mainNav.style.padding = '1rem';
        mainNav.style.borderTop = '1px solid rgba(255, 0, 0, 0.2)';
        mainNav.style.zIndex = '1000';
    }
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(e) {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mobileToggle.classList.remove('active');
        if (window.innerWidth <= 992) {
            mainNav.style.display = 'none';
        }
    }
});

// تأثيرات الدروب داون
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');
    
    dropdown.addEventListener('mouseenter', () => {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
    });
    
    dropdown.addEventListener('mouseleave', () => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-10px)';
    });
});

// تأثير البحث
const searchInput = document.querySelector('.search-input');
const searchBox = document.querySelector('.search-box');

if (searchInput) {
    searchInput.addEventListener('focus', () => {
        searchBox.style.transform = 'scale(1.05)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchBox.style.transform = 'scale(1)';
    });
}

// تأثيرات البطاقات المتحركة
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
        card.style.transform = 'translateY(-20px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '';
        card.style.transform = '';
    });
});

// تأثير الأزرار
document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        const shine = btn.querySelector('.btn-shine');
        if (shine) {
            shine.style.left = '100%';
        }
    });
    
    btn.addEventListener('mouseleave', () => {
        const shine = btn.querySelector('.btn-shine');
        if (shine) {
            shine.style.left = '-100%';
        }
    });
});

// عداد الإحصائيات المتحرك
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('K')) {
                counter.textContent = Math.floor(current / 1000) + 'K+';
            } else if (counter.textContent.includes('%')) {
                counter.textContent = current.toFixed(1) + '%';
            } else {
                counter.textContent = Math.floor(current) + '/7';
            }
        }, 20);
    });
}

// تشغيل العداد عند التمرير
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// تأثير الجسيمات المتحركة
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#00ffff';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.7';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    // تحريك الجسيم
    let posY = y;
    const speed = Math.random() * 2 + 1;
    
    const animate = () => {
        posY -= speed;
        particle.style.top = posY + 'px';
        
        if (posY < -10) {
            particle.remove();
        } else {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
    
    // إزالة الجسيم بعد 5 ثوان
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 5000);
}

// إنشاء جسيمات بشكل دوري
setInterval(createParticle, 500);

// تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تأثير الكتابة المتحركة
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// تطبيق تأثير الكتابة على العنوان
window.addEventListener('load', () => {
    const titleBrand = document.querySelector('.title-brand');
    if (titleBrand) {
        const originalText = titleBrand.textContent;
        typeWriter(titleBrand, originalText, 150);
    }
});

// تأثير الماوس للبطاقات
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// تأثير النقر على الأزرار
document.querySelectorAll('button, .hero-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// إضافة CSS للتأثيرات
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .floating-card {
        transition: transform 0.3s ease;
    }
    
    .hero-btn {
        transition: all 0.3s ease;
    }
    
    .search-box {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// تحسين الأداء
window.addEventListener('resize', () => {
    const mainNav = document.querySelector('.main-nav');
    if (window.innerWidth > 992) {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'row';
        mainNav.style.position = 'static';
        mainNav.style.background = 'none';
        mainNav.style.padding = '';
        mainNav.style.border = 'none';
    } else {
        mainNav.style.display = 'none';
    }
});

console.log('🚀 Black Store - التصميم الجديد تم تحميله بنجاح!');