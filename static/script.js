const socket = io.connect('http://' + document.domain + ':' + location.port);
const messageInput = document.getElementById('messageInput');
let currentDepartment = 'marketing';  // default department

// Function to handle the sending of messages
function sendMessage() {
    let message = messageInput.value.trim();
    if (message) {
        socket.emit('send_message', {
            'message': message,
            'username': userDisplayName,
            'display_name': userDisplayName,
            'department': currentDepartment
        });
        messageInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.tab');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(innerTab) {
                innerTab.classList.remove('active');
            });
            tab.classList.add('active');

            // Handle logic of switching chat messages based on department
            var department = tab.getAttribute('data-department');
            currentDepartment = department;
            switchDepartmentChat(department);
        });
    });
});

function switchDepartmentChat(department) {
    let chatMessagesDivs = document.querySelectorAll('.chat-messages');
    chatMessagesDivs.forEach(div => {
        if (div.getAttribute('data-department') === department) {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });
}

// Event listener for receiving a message
socket.on('receive_message', function(data) {
    let chatWindow = document.querySelector(`.chat-messages[data-department="${data['department']}"]`);
    chatWindow.innerHTML += '<div class="message"><p><strong>' + data['display_name'] + ' - ' + data['department'] + ':</strong> ' + data['message'] + '</p></div>';
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

// Event listener for "Send" button
document.querySelector('.chat-input button').addEventListener('click', function(e) {
    e.preventDefault();
    sendMessage();
});

// Event listener for pressing "Enter" key in the textarea
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey && this.value.trim() !== '') {
        event.preventDefault();
        sendMessage();
    }
});
