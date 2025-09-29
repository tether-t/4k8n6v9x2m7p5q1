// MasterCard Reviews Auto System - 6 seconds interval
var currentSlide = 0;
var totalSlides = 6;

function autoSlideReviews() {
    var slider = document.getElementById('reviewsSlider');
    if (!slider) return;
    
    currentSlide = (currentSlide + 1) % totalSlides;
    var slideWidth = 375; // 350px + 25px gap
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Initialize auto-slide
document.addEventListener('DOMContentLoaded', function() {
    setInterval(autoSlideReviews, 6000);
});