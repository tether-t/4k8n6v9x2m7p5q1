let currentSlide = 0;
let isSliding = false;
const slideWidth = 320; // 300px + 20px gap
let autoSlideInterval;

function slideReviews(direction) {
    if (isSliding) return;
    
    const slider = document.getElementById('reviewsSlider');
    const totalSlides = slider.children.length;
    const maxSlides = Math.floor(slider.parentElement.offsetWidth / slideWidth);
    const maxPosition = Math.max(0, totalSlides - maxSlides);
    
    isSliding = true;
    
    // Update current slide position
    currentSlide -= direction;
    
    // Handle boundaries with smooth wrapping
    if (currentSlide < 0) {
        currentSlide = maxPosition;
    } else if (currentSlide > maxPosition) {
        currentSlide = 0;
    }
    
    // Apply smooth transform with hardware acceleration
    const translateX = (currentSlide * slideWidth);
    slider.style.transform = `translate3d(${translateX}px, 0, 0)`;
    
    // Add visual feedback to buttons
    const btn = direction > 0 ? document.getElementById('nextBtn') : document.getElementById('prevBtn');
    btn.style.transform = 'translateY(-50%) scale(0.95)';
    
    setTimeout(() => {
        btn.style.transform = 'translateY(-50%) scale(1)';
        isSliding = false;
    }, 150);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        slideReviews(1);
    }, 4000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('reviewsSlider');
    if (slider) {
        // Enable hardware acceleration
        slider.style.willChange = 'transform';
        slider.style.transform = 'translate3d(0, 0, 0)';
        
        // Touch support for mobile
        let startX = 0;
        let isDragging = false;
        
        slider.parentElement.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(autoSlideInterval);
        });
        
        slider.parentElement.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        slider.parentElement.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                slideReviews(diffX > 0 ? 1 : -1);
            }
            
            isDragging = false;
        });
    }
});