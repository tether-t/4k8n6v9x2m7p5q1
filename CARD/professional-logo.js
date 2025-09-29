/**
 * Professional Logo Manager for SecurePay Pro
 * Handles logo animations, interactions, and dynamic effects
 */

class ProfessionalLogo {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            size: options.size || 'large', // 'small', 'medium', 'large'
            animated: options.animated !== false,
            interactive: options.interactive !== false,
            glowEffect: options.glowEffect || false,
            pulseEffect: options.pulseEffect || false,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createLogo();
        this.setupEventListeners();
        this.startAnimations();
    }
    
    createLogo() {
        const logoHTML = this.generateLogoHTML();
        this.container.innerHTML = logoHTML;
        this.logoElement = this.container.querySelector('.professional-logo');
    }
    
    generateLogoHTML() {
        const sizeClass = this.getSizeClass();
        const effectClasses = this.getEffectClasses();
        
        return `
            <div class="professional-logo ${sizeClass} ${effectClasses}">
                <div class="professional-logo-content">
                    ${this.generateSVGLogo()}
                </div>
            </div>
        `;
    }
    
    generateSVGLogo() {
        const size = this.getSVGSize();
        
        return `
            <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="professional-logo-svg">
                <defs>
                    <linearGradient id="logoGradient${this.getUniqueId()}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#0080ff;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ff00ff;stop-opacity:1" />
                    </linearGradient>
                    <filter id="glow${this.getUniqueId()}">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <circle cx="16" cy="16" r="12" fill="url(#logoGradient${this.getUniqueId()})" opacity="0.2"/>
                <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="url(#logoGradient${this.getUniqueId()})" filter="url(#glow${this.getUniqueId()})"/>
                <path d="M14 16L20 10L26 16L20 22L14 16Z" fill="url(#logoGradient${this.getUniqueId()})" opacity="0.7" filter="url(#glow${this.getUniqueId()})"/>
                <circle cx="16" cy="16" r="2" fill="#ffffff" filter="url(#glow${this.getUniqueId()})"/>
            </svg>
        `;
    }
    
    getSizeClass() {
        switch (this.options.size) {
            case 'small': return 'professional-logo-small';
            case 'medium': return '';
            case 'large': return '';
            default: return '';
        }
    }
    
    getEffectClasses() {
        let classes = [];
        if (this.options.glowEffect) classes.push('glow');
        if (this.options.pulseEffect) classes.push('pulse');
        return classes.join(' ');
    }
    
    getSVGSize() {
        switch (this.options.size) {
            case 'small': return 20;
            case 'medium': return 28;
            case 'large': return 32;
            default: return 32;
        }
    }
    
    getUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    setupEventListeners() {
        if (!this.options.interactive) return;
        
        this.logoElement.addEventListener('mouseenter', () => {
            this.onHover();
        });
        
        this.logoElement.addEventListener('mouseleave', () => {
            this.onLeave();
        });
        
        this.logoElement.addEventListener('click', () => {
            this.onClick();
        });
    }
    
    onHover() {
        this.logoElement.style.transform = 'translateY(-2px) scale(1.05)';
        this.logoElement.style.boxShadow = `
            0 20px 40px rgba(0,0,0,0.7),
            0 0 35px rgba(0,255,255,0.5),
            inset 0 2px 0 rgba(255,255,255,0.2)
        `;
    }
    
    onLeave() {
        this.logoElement.style.transform = '';
        this.logoElement.style.boxShadow = '';
    }
    
    onClick() {
        this.playClickAnimation();
        if (this.options.onClick) {
            this.options.onClick();
        }
    }
    
    playClickAnimation() {
        this.logoElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.logoElement.style.transform = '';
        }, 150);
    }
    
    startAnimations() {
        if (!this.options.animated) return;
        
        // Start rotation animation
        this.startRotationAnimation();
        
        // Add random glow pulses
        if (this.options.glowEffect) {
            this.startGlowPulse();
        }
    }
    
    startRotationAnimation() {
        // Animation is handled by CSS
    }
    
    startGlowPulse() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.logoElement.classList.add('glow');
                setTimeout(() => {
                    this.logoElement.classList.remove('glow');
                }, 1000);
            }
        }, 3000);
    }
    
    // Public methods
    enableGlow() {
        this.logoElement.classList.add('glow');
    }
    
    disableGlow() {
        this.logoElement.classList.remove('glow');
    }
    
    enablePulse() {
        this.logoElement.classList.add('pulse');
    }
    
    disablePulse() {
        this.logoElement.classList.remove('pulse');
    }
    
    setSize(size) {
        this.options.size = size;
        this.createLogo();
        this.setupEventListeners();
    }
    
    destroy() {
        if (this.logoElement) {
            this.logoElement.remove();
        }
    }
}

// Utility function to create logos easily
function createProfessionalLogo(selector, options = {}) {
    const container = document.querySelector(selector);
    if (!container) {
        console.error(`Logo container not found: ${selector}`);
        return null;
    }
    
    return new ProfessionalLogo(container, options);
}

// Auto-initialize logos with data attributes
document.addEventListener('DOMContentLoaded', () => {
    const logoContainers = document.querySelectorAll('[data-professional-logo]');
    
    logoContainers.forEach(container => {
        const options = {
            size: container.dataset.size || 'large',
            animated: container.dataset.animated !== 'false',
            interactive: container.dataset.interactive !== 'false',
            glowEffect: container.dataset.glow === 'true',
            pulseEffect: container.dataset.pulse === 'true'
        };
        
        new ProfessionalLogo(container, options);
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProfessionalLogo, createProfessionalLogo };
}