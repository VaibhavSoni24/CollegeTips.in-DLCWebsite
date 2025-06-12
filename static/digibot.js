// DigiBot - JavaScript Interface

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    
    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initialize Sample Question buttons
    window.askSampleQuestion = function(question) {
        userInput.value = question;
        sendMessage();
    };

    // Check if chat history exists in sessionStorage and restore it
    restoreChatHistory();
    
    /**
     * Send user message to backend and display response
     */
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        // Display user message
        displayMessage(message, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Send to backend
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Display bot response
            displayMessage(data.response, 'bot');
            
            // Save chat history
            saveChatHistory();
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Display error message
            displayMessage('Sorry, I encountered an error. Please try again later.', 'bot');
            
            // Save chat history
            saveChatHistory();
        });
    }
    
    /**
     * Display a message in the chat box
     * @param {string} message - The message to display
     * @param {string} sender - Either 'user' or 'bot'
     */
    function displayMessage(message, sender) {
        // Create message elements
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('bot-message');
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        const icon = document.createElement('i');
        if (sender === 'user') {
            icon.classList.add('fas', 'fa-user');
        } else {
            icon.classList.add('fas', 'fa-robot');
        }
        
        const textDiv = document.createElement('div');
        textDiv.classList.add('message-text');
        
        // Format and set message content
        const formattedMessage = formatMessage(message);
        textDiv.innerHTML = formattedMessage;
        
        // Assemble message structure
        contentDiv.appendChild(icon);
        contentDiv.appendChild(textDiv);
        messageDiv.appendChild(contentDiv);
        
        // Add to chat box
        chatBox.appendChild(messageDiv);
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    /**
     * Format message to handle different content types
     * @param {string} message - Raw message text
     * @return {string} - Formatted HTML
     */
    function formatMessage(message) {
        // Convert URLs to links
        message = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        
        // Convert line breaks to paragraph tags
        const paragraphs = message.split('\n\n');
        if (paragraphs.length > 1) {
            return paragraphs
                .filter(p => p.trim() !== '')
                .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
                .join('');
        }
        
        // If no paragraphs, just wrap in a single p tag
        return `<p>${message.replace(/\n/g, '<br>')}</p>`;
    }
    
    /**
     * Show typing indicator in chat
     */
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('message', 'bot-message', 'typing-indicator');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-robot');
        
        const textDiv = document.createElement('div');
        textDiv.classList.add('message-text');
        textDiv.innerHTML = '<p>Thinking<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>';
        
        contentDiv.appendChild(icon);
        contentDiv.appendChild(textDiv);
        indicator.appendChild(contentDiv);
        
        chatBox.appendChild(indicator);
        scrollToBottom();
        
        // Animate dots
        let dotIndex = 0;
        const dots = indicator.querySelectorAll('.dot');
        
        const dotAnimation = setInterval(() => {
            dots.forEach((dot, i) => {
                if (i === dotIndex) {
                    dot.style.opacity = 1;
                } else {
                    dot.style.opacity = 0.2;
                }
            });
            
            dotIndex = (dotIndex + 1) % dots.length;
        }, 300);
        
        // Store animation interval ID for later removal
        indicator.dataset.animationId = dotAnimation;
    }
    
    /**
     * Remove typing indicator from chat
     */
    function removeTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        
        if (indicator) {
            // Clear the animation interval
            clearInterval(parseInt(indicator.dataset.animationId));
            
            // Remove the element
            indicator.remove();
        }
    }
    
    /**
     * Scroll chat to bottom
     */
    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    /**
     * Save chat history to session storage
     */
    function saveChatHistory() {
        sessionStorage.setItem('digibotChatHistory', chatBox.innerHTML);
    }
    
    /**
     * Restore chat history from session storage
     */
    function restoreChatHistory() {
        const history = sessionStorage.getItem('digibotChatHistory');
        
        if (history) {
            chatBox.innerHTML = history;
            scrollToBottom();
        }
    }
});