document.addEventListener('DOMContentLoaded', function() {
    // Create chat widget HTML
    const chatWidgetHTML = `
        <div class="chat-widget">
            <div class="chat-button">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chat-window">
                <div class="chat-header">
                    <h3><i class="fas fa-robot"></i> CMC Assistant</h3>
                    <span class="chat-close"><i class="fas fa-times"></i></span>
                </div>
                <div class="chat-messages"></div>
                <div class="chat-input">
                    <input type="text" placeholder="Nhập tin nhắn của bạn...">
                    <button><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;

    // Create style element
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        :root {
            --primary-color: #4a90e2;
            --secondary-color: #2c3e50;
            --accent-color: #e74c3c;
            --background-light: #f8f9fa;
        }

        .chat-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
        }

        .chat-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease;
        }

        .chat-button:hover {
            transform: scale(1.1);
        }

        .chat-button i {
            color: white;
            font-size: 24px;
        }

        .chat-window {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
        }

        .chat-window.active {
            display: flex;
        }

        .chat-header {
            background: var(--primary-color);
            padding: 15px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .chat-header h3 {
            margin: 0;
            font-size: 16px;
        }

        .chat-close {
            cursor: pointer;
            font-size: 20px;
        }

        .chat-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
        }

        .chat-input {
            padding: 15px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
        }

        .chat-input input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
        }

        .chat-input button {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .chat-window {
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                border-radius: 0;
            }
        }
    `;

    // Add chat widget HTML to body
    document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);
    // Add styles to head
    document.head.appendChild(styleElement);

    // Initialize chat functionality
    const chatButton = document.querySelector('.chat-button');
    const chatWindow = document.querySelector('.chat-window');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatWindow.classList.add('active');
        if (!chatMessages.innerHTML) {
            addMessage('bot', 'Xin chào! Tôi là trợ lý ảo của CMC University. Tôi có thể giúp gì cho bạn?');
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';
            // Simulate bot response
            setTimeout(() => {
                addMessage('bot', 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!');
            }, 1000);
        }
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.style.marginBottom = '10px';
        messageDiv.style.padding = '10px';
        messageDiv.style.borderRadius = '10px';
        messageDiv.style.maxWidth = '80%';
        messageDiv.style.alignSelf = type === 'user' ? 'flex-end' : 'flex-start';
        messageDiv.style.background = type === 'user' ? '#4a90e2' : '#f1f1f1';
        messageDiv.style.color = type === 'user' ? 'white' : 'black';

        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle support button click
    const supportBtn = document.querySelector('.support-btn');
    if (supportBtn) {
        supportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            chatWindow.classList.add('active');
            if (!chatMessages.innerHTML) {
                addMessage('bot', 'Xin chào! Tôi là trợ lý ảo của CMC University. Tôi có thể giúp gì cho bạn?');
            }
        });
    }
});