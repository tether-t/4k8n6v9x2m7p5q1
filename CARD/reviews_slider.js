// Reviews Slider Functionality
let currentSlide = 0;
const reviewsPerView = window.innerWidth > 768 ? 3 : 1;

function slideReviews(direction) {
    const slider = document.getElementById('reviewsSlider');
    const reviews = slider.children;
    const totalReviews = reviews.length;
    const maxSlide = Math.max(0, totalReviews - reviewsPerView);
    
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = maxSlide;
    } else if (currentSlide > maxSlide) {
        currentSlide = 0;
    }
    
    const slideWidth = reviews[0].offsetWidth + 25; // width + gap
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Auto-slide functionality
setInterval(() => {
    slideReviews(1);
}, 5000);