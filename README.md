# Digital Literacy Course Website

A website designed to empower parents and elderly users to easily learn digital tools, developed for CollegeTips.in.

## Features

1. **Engaging Home Page**
   - Information about the Digital Literacy Course program
   - Accessibility features built-in

2. **Detailed Tutorials**
   - Step-by-step guides for WhatsApp, Paytm, Google Maps, etc.
   - Category filtering for easier navigation

3. **DigiBot AI Assistant**
   - Powered by Google's Gemini AI
   - Answers questions about digital tools and technology

4. **Feedback System**
   - Web form for user suggestions and feedback
   - Connected to web3forms for easy submission

5. **Accessibility Features**
   - Adjustable font sizes
   - Light/dark mode toggle
   - Mobile-responsive design

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/digital-literacy-course.git
   cd digital-literacy-course
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Configure the Gemini API:
   - Ensure the API key is correctly set in `static/geminiAPI.env`
   - Format: `GEMINI_API_KEY=your_api_key_here`

## Running the Application

Run the Flask application:
```
python DLC.py
```

The website will be accessible at `http://127.0.0.1:5000/`

## Project Structure

- `DLC.py`: Main Flask application
- `templates/`: HTML templates for all pages
- `static/`: 
  - `style.css`: Main stylesheet
  - `script.js`: General JavaScript functionality
  - `digibot.py`: Python backend for DigiBot
  - `digibot.js`: Front-end JavaScript for DigiBot
  - `feedback.js`: Form handling for feedback page

## 🤝 Contribution

This project was created by Vaibhav Soni as part of an internship task for CollegeTips.in.
Feel free to fork or clone for learning and inspiration.

## 📄 License

This project is open for learning and showcasing. Commercial use or redistribution without permission is not allowed.

## Acknowledgments

- CollegeTips.in for the initiative
- Google Gemini API for powering the DigiBot
- Web3Forms for the feedback form backend
