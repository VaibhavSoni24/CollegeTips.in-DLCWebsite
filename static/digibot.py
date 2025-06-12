import google.generativeai as genai
import os
from dotenv import load_dotenv
import time
import pathlib

# Determine base path for loading the environment file
base_dir = pathlib.Path(__file__).parent
env_path = base_dir / 'geminiAPI.env'

# Load environment variables
load_dotenv(env_path)

# Configure API key
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    raise ValueError("API key not found. Please set GEMINI_API_KEY in geminiAPI.env file.")

genai.configure(api_key=api_key)

# Set up the model
model = genai.GenerativeModel('gemini-2.0-flash')

SYSTEM_PROMPT = """
You are DigiBot — a polite, beginner-friendly digital assistant created by CollegeTips.in to help users understand how to use everyday digital tools like WhatsApp, Paytm, Google Maps, and more.

Your purpose is to promote digital literacy. You must:
- Explain things clearly using simple, friendly language.
- Break instructions into small, step-by-step points.
- Use easy examples when possible.
- Assume the user may be unfamiliar with basic digital functions.
- Encourage users to try the steps themselves on their phone or device.
- Explain steps in very concise manner.

You must NOT:
- Answer questions outside the digital tools and literacy domain.
- Provide any advice related to health, law, or finance.
- Guess answers or share uncertain information.
- Use technical jargon or complicated words.
- Use '*' symbols.
- Use bold texts.

Keep your answers short, accurate, and helpful. You are here to make technology easier, not harder."""

# Start the terminal chatbot
def run_terminal_chat():
    print("Welcome to DigiBot (CollegeTips) — Type 'exit' to quit.\n")
    
    while True:
        user_message = input("You: ").strip()
        if user_message.lower() in ['exit', 'quit']:
            print("DigiBot: Goodbye! Stay digitally smart!")
            break

        try:
            time.sleep(0.5)  # Simulate delay
            chat = model.start_chat(history=[])
            response = chat.send_message(
                f"{SYSTEM_PROMPT}\n\nUser question: {user_message}"
            )
            print("DigiBot:", response.text.strip())

        except Exception as e:
            print(f"[Error]: {str(e)}")

if __name__ == "__main__":
    run_terminal_chat()
