# Internal LAN Chat System

## Overview
This proof of concept demonstrates an internal LAN chat system designed for efficient communication within a local network. Utilizing Flask and SocketIO, the system offers real-time messaging capabilities and a simple authentication mechanism.

## Features
- **User Authentication:** Login system based on a JSON file storing user credentials.
- **Real-Time Messaging:** Utilizes Flask-SocketIO for instant message broadcasting across the network.
- **Chat History:** Messages are stored and retrieved from a JSON file, ensuring that chat history is maintained.

## Installation
1. Ensure Python 3.x is installed.
2. Install required packages:
    ```
    pip install flask flask-socketio
    ```
3. Clone the repository and navigate to the project directory.

## Usage
1. Start the application:
    ```
    python app.py
    ```
2. Access the login page through a web browser within the LAN at `http://localhost:5000`.
3. Log in using credentials stored in `users.json`.
4. Begin chatting!

## Configuration
- **Users:** User credentials can be managed in the `users.json` file.
- **Messages:** Chat history is automatically saved in `messages.json`.

## Development
This project is a proof of concept. Further development can include features like enhanced security, user management interfaces, and scalability improvements.

## License
This project is open-sourced under the MIT License.
