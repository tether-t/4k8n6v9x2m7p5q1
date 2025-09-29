let currentReview = 0;
const totalReviews = 6;

function showReview(index) {
    const reviews = document.querySelectorAll('.review-item');
    reviews.forEach((review, i) => {
        review.style.display = i === index ? 'block' : 'none';
    });
}

function showNextReview() {
    currentReview = (currentReview + 1) % totalReviews;
    showReview(currentReview);
}

document.addEventListener('DOMContentLoaded', function() {
    showReview(0);
    setInterval(showNextReview, 5000);
});