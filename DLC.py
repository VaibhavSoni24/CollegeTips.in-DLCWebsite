from flask import Flask, render_template, request, jsonify
import os
import sys
from pathlib import Path

# Add the project directory to the path so we can import from static folder
sys.path.append(str(Path(__file__).parent))

# Import DigiBot functionality
from static.digibot import model, SYSTEM_PROMPT

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tutorials')
def tutorials():
    return render_template('tutorials.html')

@app.route('/digibot')
def digibot():
    return render_template('digibot.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'response': 'Please enter a message.'}), 400
        
        # Create a new chat for each request
        chat = model.start_chat(history=[])
        response = chat.send_message(
            f"{SYSTEM_PROMPT}\n\nUser question: {user_message}"
        )
        
        return jsonify({'response': response.text.strip()})
    
    except Exception as e:
        return jsonify({'response': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)