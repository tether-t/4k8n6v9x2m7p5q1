// Review Modal Functions
function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'flex';
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
    document.getElementById('reviewText').value = '';
    resetStarRating();
}

let selectedRating = 0;

// Star rating functionality
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('#starRating span');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            updateStarDisplay();
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
    });
    
    document.getElementById('starRating').addEventListener('mouseleave', function() {
        updateStarDisplay();
    });
});

function highlightStars(rating) {
    const stars = document.querySelectorAll('#starRating span');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffd700';
            star.textContent = '★';
        } else {
            star.style.color = '#666';
            star.textContent = '☆';
        }
    });
}

function updateStarDisplay() {
    highlightStars(selectedRating);
}

function resetStarRating() {
    selectedRating = 0;
    updateStarDisplay();
}

function addAnonymousReview() {
    const reviewText = document.getElementById('reviewText').value.trim();
    
    if (selectedRating === 0) {
        alert('Please select a rating!');
        return;
    }
    
    if (reviewText === '') {
        alert('Please write your review!');
        return;
    }
    
    // Generate random user ID
    const userId = Math.floor(Math.random() * 9000) + 1000;
    const colors = ['#00ff00', '#ff6600', '#9d4edd', '#ffff00', '#00ffff', '#ff0000'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Create new review element
    const reviewsContainer = document.querySelector('.container h2').nextElementSibling;
    const newReview = document.createElement('div');
    newReview.style.cssText = `background: rgba(0,0,0,0.5); padding: 20px; border-radius: 15px; border-left: 4px solid ${randomColor};`;
    
    const stars = '★'.repeat(selectedRating);
    
    newReview.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="color: ${randomColor}; font-weight: 600;">👤 Anonymous User #${userId}</span>
            <div style="margin-left: auto; color: #ffd700;">
                ${stars}
            </div>
        </div>
        <p style="color: #ddd; font-style: italic;">"${reviewText}"</p>
    `;
    
    reviewsContainer.appendChild(newReview);
    
    closeReviewModal();
    alert('Your anonymous review has been posted successfully!');
}