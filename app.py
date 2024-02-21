from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit
import json

# Load users data
with open('users.json', 'r') as file:
    users_data = json.load(file)

# Load the chat history
with open('messages.json', 'r') as file:
    chat_history = json.load(file)

app = Flask(__name__)
app.secret_key = "your_secret_key_here"

socketio = SocketIO(app, cors_allowed_origins="*")

users = {
    "user1": "user1",
    "user2": "user2"
}


@app.route('/')
def login():
    return render_template('login.html')


@app.route('/chat', methods=['POST'])
def chat_page():
    username = request.form['username']
    password = request.form['password']

    user = next((user for user in users_data if user["username"] == username and user["password"] == password), None)

    if user:
        session['username'] = user['username']
        session['display_name'] = user['display_name']
        session['department'] = user['department']
        return render_template('chat.html', chat_history=chat_history)  # <-- Pass the chat_history here
    else:
        return "Invalid credentials! <a href='/'>Go back to login</a>"


@socketio.on('send_message')
def handle_message(data):
    emit('receive_message', data, broadcast=True)
    # Generate a unique message ID (could be a timestamp or another unique identifier)
    message_id = str(len(chat_history) + 1)
    # Store the new message in the chat history
    chat_history[message_id] = data
    # Save the updated chat history to the JSON file in a formatted way
    with open('messages.json', 'w') as file:
        json.dump(chat_history, file, indent=4)


if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
