// Digital Literacy Course - Main JS File

// DOM Elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const fontIncrease = document.getElementById('font-increase');
const fontDecrease = document.getElementById('font-decrease');
const fontReset = document.getElementById('font-reset');
const filterButtons = document.querySelectorAll('.filter-btn');

// Variables
const baseFontSize = 16; // Base font size in pixels
let currentFontSize = 100; // Current font size as percentage of base
const maxFontSize = 150; // Maximum font size (150% of base)
const minFontSize = 80;  // Minimum font size (80% of base)
const fontStep = 10;     // Step for font size increase/decrease

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode from local storage
    initDarkMode();

    // Initialize font size from local storage
    initFontSize();

    // Initialize animations
    initAnimations();

    // Initialize tutorial filters
    initTutorialFilters();

    // Initialize any expanding elements
    initExpandables();
});

// Dark Mode Toggle
function initDarkMode() {
    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial state
    if (darkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle dark mode on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Update icon based on mode
            if (isDarkMode) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
}

// Font Size Controls
function initFontSize() {
    // Load saved font size or use default
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        updateFontSize(0); // Apply saved font size without changing it
    }
    
    // Add event listeners if elements exist
    if (fontIncrease) {
        fontIncrease.addEventListener('click', () => {
            updateFontSize(fontStep);
        });
    }
    
    if (fontDecrease) {
        fontDecrease.addEventListener('click', () => {
            updateFontSize(-fontStep);
        });
    }
    
    if (fontReset) {
        fontReset.addEventListener('click', () => {
            currentFontSize = 100; // Reset to 100%
            updateFontSize(0);
        });
    }
}

// Update font size by a given step
function updateFontSize(step) {
    // Update current size
    currentFontSize += step;
    
    // Apply constraints
    if (currentFontSize > maxFontSize) currentFontSize = maxFontSize;
    if (currentFontSize < minFontSize) currentFontSize = minFontSize;
    
    // Calculate actual pixel size
    const newSize = (baseFontSize * currentFontSize) / 100;
    
    // Apply to HTML element
    document.documentElement.style.fontSize = newSize + 'px';
    
    // Save to local storage
    localStorage.setItem('fontSize', currentFontSize);
}

// Initialize scroll animations
function initAnimations() {
    // Get all elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length) {
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If element is in viewport
                if (entry.isIntersecting) {
                    // Add animation class
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.animationPlayState = 'running';
                    // Stop observing after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });
        
        // Observe each element
        animatedElements.forEach(element => {
            observer.observe(element);
            
            // Set initial state
            element.style.opacity = 0;
            if (element.getAttribute('data-animate') === 'slide-up') {
                element.style.transform = 'translateY(20px)';
            }
        });
    }
}

// Tutorial category filtering
function initTutorialFilters() {
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter category
                const filterValue = button.getAttribute('data-filter');
                
                // Get all tutorial cards
                const cards = document.querySelectorAll('.tutorial-card');
                
                // Filter cards
                cards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        
                        // Add animation
                        setTimeout(() => {
                            card.style.opacity = 1;
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = 0;
                        card.style.transform = 'translateY(20px)';
                        
                        // Hide after transition
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Initialize expandable elements
function initExpandables() {
    // Add event listeners for tutorial cards
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    tutorialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded class
            this.classList.toggle('expanded');
            
            // Get steps element
            const steps = this.querySelector('.tutorial-steps');
            
            // Toggle visibility
            if (this.classList.contains('expanded')) {
                steps.style.display = 'block';
            } else {
                steps.style.display = 'none';
            }
        });
    });
}