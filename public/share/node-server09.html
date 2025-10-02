const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;
const clients = new Map(); // Map socket.id to username

// Get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Serve HTML client
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WiFi Chat</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background: #1a1a2e;
      color: #eee;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    #login-screen {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    #login-box {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      text-align: center;
    }
    #login-box h1 {
      color: #333;
      margin-bottom: 1.5rem;
    }
    #username {
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      width: 250px;
      margin-bottom: 1rem;
    }
    #join-btn {
      padding: 0.75rem 2rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    #join-btn:hover { background: #5568d3; }
    #chat-screen { display: none; flex-direction: column; height: 100vh; }
    #header {
      background: #16213e;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    #header h2 { color: #667eea; }
    #online-count { color: #aaa; font-size: 0.9rem; }
    #messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      background: #0f3460;
    }
    .message {
      margin-bottom: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      background: #16213e;
      max-width: 70%;
      animation: slideIn 0.3s;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .message.own {
      margin-left: auto;
      background: #667eea;
    }
    .message-sender {
      font-weight: bold;
      margin-bottom: 0.25rem;
      color: #aaa;
    }
    .message.own .message-sender { color: #fff; }
    .system-message {
      text-align: center;
      color: #aaa;
      font-style: italic;
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
    #input-area {
      display: flex;
      padding: 1rem;
      background: #16213e;
      gap: 0.5rem;
    }
    #message-input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #0f3460;
      border-radius: 5px;
      background: #0f3460;
      color: #eee;
      font-size: 1rem;
    }
    #send-btn {
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s;
    }
    #send-btn:hover { background: #5568d3; }
  </style>
</head>
<body>
  <div id="login-screen">
    <div id="login-box">
      <h1>💬 WiFi Chat</h1>
      <input type="text" id="username" placeholder="Enter your name" maxlength="20">
      <br>
      <button id="join-btn">Join Chat</button>
    </div>
  </div>

  <div id="chat-screen">
    <div id="header">
      <h2>WiFi Chat</h2>
      <div id="online-count">0 online</div>
    </div>
    <div id="messages"></div>
    <div id="input-area">
      <input type="text" id="message-input" placeholder="Type a message...">
      <button id="send-btn">Send</button>
    </div>
  </div>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    let username = '';

    const loginScreen = document.getElementById('login-screen');
    const chatScreen = document.getElementById('chat-screen');
    const usernameInput = document.getElementById('username');
    const joinBtn = document.getElementById('join-btn');
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const onlineCount = document.getElementById('online-count');

    joinBtn.addEventListener('click', joinChat);
    usernameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') joinChat();
    });

    function joinChat() {
      username = usernameInput.value.trim();
      if (username) {
        socket.emit('join', username);
        loginScreen.style.display = 'none';
        chatScreen.style.display = 'flex';
        messageInput.focus();
      }
    }

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
      const msg = messageInput.value.trim();
      if (msg) {
        socket.emit('message', msg);
        messageInput.value = '';
      }
    }

    socket.on('message', (data) => {
      const div = document.createElement('div');
      div.className = 'message' + (data.username === username ? ' own' : '');
      div.innerHTML = \`
        <div class="message-sender">\${data.username}</div>
        <div>\${escapeHtml(data.message)}</div>
      \`;
      messagesDiv.appendChild(div);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });

    socket.on('system', (msg) => {
      const div = document.createElement('div');
      div.className = 'system-message';
      div.textContent = msg;
      messagesDiv.appendChild(div);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });

    socket.on('userCount', (count) => {
      onlineCount.textContent = count + ' online';
    });

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  </script>
</body>
</html>
  `);
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('join', (username) => {
    clients.set(socket.id, username);
    console.log(`${username} joined the chat`);
    
    socket.broadcast.emit('system', `${username} joined the chat`);
    io.emit('userCount', clients.size);
  });

  socket.on('message', (msg) => {
    const username = clients.get(socket.id);
    if (username) {
      console.log(`${username}: ${msg}`);
      io.emit('message', { username, message: msg });
    }
  });

  socket.on('disconnect', () => {
    const username = clients.get(socket.id);
    if (username) {
      console.log(`${username} left the chat`);
      clients.delete(socket.id);
      socket.broadcast.emit('system', `${username} left the chat`);
      io.emit('userCount', clients.size);
    }
  });
});

// Start server
server.listen(PORT, () => {
  const localIP = getLocalIP();
  console.log('\n🚀 WiFi Chat Server Started!\n');
  console.log('📱 Connect from any device on this network:');
  console.log(`\n   http://${localIP}:${PORT}`);
  console.log(`   http://localhost:${PORT} (this computer only)\n`);
  console.log('💡 Share the first URL with others on your hotspot!\n');
});
