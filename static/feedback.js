// Feedback Form Handler

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const feedbackForm = document.getElementById('feedback-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    // Handle form submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleSubmit);
    }
    
    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    function handleSubmit(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Show loading state
        const submitBtn = feedbackForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(feedbackForm);
        
        // Convert to URL encoded string for web3forms
        const urlEncodedData = new URLSearchParams(formData).toString();
        
        // Send form data
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message
                feedbackForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form
                feedbackForm.reset();
                
                // Track successful submission (if analytics exists)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Feedback',
                        'event_label': 'Feedback Form Submission'
                    });
                }
            } else {
                // Show error message
                formError.style.display = 'block';
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                console.error('Form submission error:', data);
            }
        })
        .catch(error => {
            // Show error message
            formError.style.display = 'block';
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            console.error('Form submission error:', error);
        });
    }
    
    /**
     * Validate form before submission
     * @returns {boolean} - Whether form is valid
     */
    function validateForm() {
        let isValid = true;
        const requiredFields = feedbackForm.querySelectorAll('[required]');
        
        // Check each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                
                // Add error class
                field.classList.add('error');
                
                // Create error message if it doesn't exist
                let errorMsg = field.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.textContent = 'This field is required';
                    field.parentElement.appendChild(errorMsg);
                }
            } else {
                // Remove error class and message
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
        
        // Validate email format
        const emailField = feedbackForm.querySelector('[type="email"]');
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                isValid = false;
                
                // Add error class
                emailField.classList.add('error');
                
                // Create error message if it doesn't exist
                let errorMsg = emailField.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.textContent = 'Please enter a valid email address';
                    emailField.parentElement.appendChild(errorMsg);
                } else {
                    errorMsg.textContent = 'Please enter a valid email address';
                }
            }
        }
        
        return isValid;
    }
    
    /**
     * Add input event listeners for real-time validation
     */
    function initRealTimeValidation() {
        const inputs = feedbackForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Remove error class and message when user starts typing
                this.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
        });
    }
    
    // Initialize real-time validation
    if (feedbackForm) {
        initRealTimeValidation();
    }
});