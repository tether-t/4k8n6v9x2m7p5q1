/**
 * CustomerReviewsManager - Professional Java class for managing customer reviews
 * Handles review navigation, modal interactions, and rating system
 */
public class CustomerReviewsManager {
    
    private int currentReview = 0;
    private int totalReviews = 3;
    private int selectedRating = 0;
    
    /**
     * Navigate to the next review with smooth animation
     */
    public void showNextReview() {
        executeJS(String.format(
            "var reviews = document.querySelectorAll('.review-item');" +
            "reviews[%d].style.display = 'none';" +
            "reviews[%d].style.opacity = '0';" +
            "setTimeout(() => {" +
                "reviews[%d].style.display = 'block';" +
                "reviews[%d].style.opacity = '1';" +
                "reviews[%d].style.transform = 'translateX(0)';" +
                "document.getElementById('reviewCounter').textContent = '%d / %d';" +
            "}, 300);",
            currentReview, currentReview, 
            getNextReviewIndex(), getNextReviewIndex(), getNextReviewIndex(),
            getNextReviewIndex() + 1, totalReviews
        ));
        currentReview = getNextReviewIndex();
    }
    
    /**
     * Navigate to the previous review with smooth animation
     */
    public void showPrevReview() {
        executeJS(String.format(
            "var reviews = document.querySelectorAll('.review-item');" +
            "reviews[%d].style.display = 'none';" +
            "reviews[%d].style.opacity = '0';" +
            "setTimeout(() => {" +
                "reviews[%d].style.display = 'block';" +
                "reviews[%d].style.opacity = '1';" +
                "reviews[%d].style.transform = 'translateX(0)';" +
                "document.getElementById('reviewCounter').textContent = '%d / %d';" +
            "}, 300);",
            currentReview, currentReview,
            getPrevReviewIndex(), getPrevReviewIndex(), getPrevReviewIndex(),
            getPrevReviewIndex() + 1, totalReviews
        ));
        currentReview = getPrevReviewIndex();
    }
    
    /**
     * Open review modal with professional animations
     */
    public void openReviewModal() {
        executeJS(
            "var modal = document.getElementById('reviewModal');" +
            "modal.style.display = 'flex';" +
            "modal.style.opacity = '0';" +
            "modal.style.transform = 'scale(0.8)';" +
            "setTimeout(() => {" +
                "modal.style.opacity = '1';" +
                "modal.style.transform = 'scale(1)';" +
                "modal.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';" +
            "}, 50);"
        );
    }
    
    /**
     * Close review modal with smooth exit animation
     */
    public void closeReviewModal() {
        executeJS(
            "var modal = document.getElementById('reviewModal');" +
            "modal.style.opacity = '0';" +
            "modal.style.transform = 'scale(0.8)';" +
            "setTimeout(() => {" +
                "modal.style.display = 'none';" +
                "document.getElementById('reviewText').value = '';" +
            "}, 300);"
        );
        selectedRating = 0;
        updateStars();
    }
    
    /**
     * Set rating with interactive star animation
     */
    public void setRating(int rating) {
        selectedRating = rating;
        updateStars();
        
        // Add pulse animation to selected stars
        executeJS(String.format(
            "var stars = document.querySelectorAll('#starRating span');" +
            "for(var i = 0; i < %d; i++) {" +
                "stars[i].style.animation = 'pulse 0.3s ease-in-out';" +
                "setTimeout(() => stars[i].style.animation = '', 300);" +
            "}",
            rating
        ));
    }
    
    /**
     * Update star display with smooth transitions
     */
    private void updateStars() {
        executeJS(String.format(
            "var stars = document.querySelectorAll('#starRating span');" +
            "stars.forEach((star, index) => {" +
                "star.style.transition = 'all 0.2s ease';" +
                "if (index < %d) {" +
                    "star.innerHTML = '★';" +
                    "star.style.color = '#ffd700';" +
                    "star.style.textShadow = '0 0 10px rgba(255,215,0,0.8)';" +
                    "star.style.transform = 'scale(1.1)';" +
                "} else {" +
                    "star.innerHTML = '☆';" +
                    "star.style.color = '#666';" +
                    "star.style.textShadow = 'none';" +
                    "star.style.transform = 'scale(1)';" +
                "}" +
            "});",
            selectedRating
        ));
    }
    
    /**
     * Add anonymous review with professional validation and animation
     */
    public void addAnonymousReview() {
        String reviewText = getElementValue("reviewText");
        
        if (reviewText.trim().isEmpty() || selectedRating == 0) {
            showNotification("Please provide both rating and review text.", "warning");
            return;
        }
        
        String userId = generateUserId();
        String starsHtml = generateStarsHtml(selectedRating);
        
        executeJS(String.format(
            "var newReview = document.createElement('div');" +
            "newReview.className = 'review-item';" +
            "newReview.style.cssText = 'background: rgba(0,0,0,0.7); border: 1px solid #333; border-radius: 15px; padding: 30px; margin-bottom: 20px; backdrop-filter: blur(10px); display: none; opacity: 0; transform: translateY(20px);';" +
            "newReview.innerHTML = `%s`;" +
            "document.getElementById('reviewsContainer').appendChild(newReview);" +
            "setTimeout(() => {" +
                "newReview.style.display = 'block';" +
                "newReview.style.opacity = '1';" +
                "newReview.style.transform = 'translateY(0)';" +
                "newReview.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';" +
            "}, 100);",
            createReviewHTML(userId, starsHtml, reviewText)
        ));
        
        totalReviews++;
        currentReview = totalReviews - 1;
        closeReviewModal();
        showNotification("Your review has been posted successfully!", "success");
    }
    
    /**
     * Initialize auto-slide functionality
     */
    public void initializeAutoSlide() {
        executeJS(
            "setInterval(() => {" +
                "if (!document.getElementById('reviewModal').style.display || " +
                "document.getElementById('reviewModal').style.display === 'none') {" +
                    "showNextReview();" +
                "}" +
            "}, 5000);"
        );
    }
    
    /**
     * Add hover effects to navigation buttons
     */
    public void initializeButtonEffects() {
        executeJS(
            "document.querySelectorAll('.carousel-btn').forEach(btn => {" +
                "btn.addEventListener('mouseenter', function() {" +
                    "this.style.transform = 'scale(1.1)';" +
                    "this.style.boxShadow = '0 8px 25px rgba(229,9,20,0.5)';" +
                "});" +
                "btn.addEventListener('mouseleave', function() {" +
                    "this.style.transform = 'scale(1)';" +
                    "this.style.boxShadow = '0 5px 15px rgba(229,9,20,0.3)';" +
                "});" +
                "btn.addEventListener('click', function() {" +
                    "this.style.transform = 'scale(0.95)';" +
                    "setTimeout(() => this.style.transform = 'scale(1.1)', 150);" +
                "});" +
            "});"
        );
    }
    
    // Helper methods
    private int getNextReviewIndex() {
        return (currentReview + 1) % totalReviews;
    }
    
    private int getPrevReviewIndex() {
        return (currentReview - 1 + totalReviews) % totalReviews;
    }
    
    private String generateUserId() {
        return "#" + java.util.UUID.randomUUID().toString().substring(0, 12);
    }
    
    private String generateStarsHtml(int rating) {
        StringBuilder stars = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.append("<i class=\"fas fa-star\" style=\"color: #e50914; font-size: 1rem;\"></i>");
            } else {
                stars.append("<i class=\"far fa-star\" style=\"color: #e50914; font-size: 1rem;\"></i>");
            }
        }
        return stars.toString();
    }
    
    private String createReviewHTML(String userId, String starsHtml, String reviewText) {
        return String.format(
            "<div style=\"display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;\">" +
                "<div style=\"display: flex; align-items: center; gap: 15px;\">" +
                    "<div style=\"width: 50px; height: 50px; background: #e50914; border-radius: 50%%; display: flex; align-items: center; justify-content: center;\">" +
                        "<i class=\"fas fa-ghost\" style=\"color: white; font-size: 1.2rem;\"></i>" +
                    "</div>" +
                    "<div>" +
                        "<h4 style=\"color: #fff; margin: 0; font-size: 1.1rem;\">ID: %s</h4>" +
                    "</div>" +
                "</div>" +
                "<div style=\"display: flex; gap: 3px;\">%s</div>" +
            "</div>" +
            "<p style=\"color: #ddd; font-size: 1rem; line-height: 1.6; margin: 0; font-style: italic;\">\"%s\"</p>" +
            "<div style=\"margin-top: 15px; display: flex; justify-content: space-between; align-items: center;\">" +
                "<span style=\"color: #00ff00; font-size: 0.85rem;\"><i class=\"fas fa-check-circle\"></i> Verified Purchase</span>" +
                "<span style=\"color: #888; font-size: 0.8rem;\">Just now</span>" +
            "</div>",
            userId, starsHtml, reviewText
        );
    }
    
    private void showNotification(String message, String type) {
        String color = type.equals("success") ? "#00ff00" : "#ff6600";
        executeJS(String.format(
            "var notification = document.createElement('div');" +
            "notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.9); color: %s; padding: 15px 25px; border-radius: 10px; border: 1px solid %s; z-index: 10000; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: translateX(100%%); transition: all 0.3s ease;';" +
            "notification.textContent = '%s';" +
            "document.body.appendChild(notification);" +
            "setTimeout(() => notification.style.transform = 'translateX(0)', 100);" +
            "setTimeout(() => {" +
                "notification.style.transform = 'translateX(100%%)';" +
                "setTimeout(() => document.body.removeChild(notification), 300);" +
            "}, 3000);",
            color, color, message
        ));
    }
    
    // Abstract methods to be implemented based on platform
    protected abstract void executeJS(String script);
    protected abstract String getElementValue(String elementId);
}