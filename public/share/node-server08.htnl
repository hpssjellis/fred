const http = require('http');
const WebSocket = require('ws');
const os = require('os');
const url = require('url');

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

const PORT = 3000;
const clients = new Map(); // Map of WebSocket -> clientName

// Serve dynamic HTML for named clients
const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const name = parsed.query.name || 'Anonymous';

  if (req.url.startsWith('/chat')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Chat - ${name}</title></head>
      <body>
        <h2>Welcome, ${name}!</h2>
        <div id="chat" style="height:200px;overflow:auto;border:1px solid #ccc;"></div>
        <input id="msg" placeholder="Type a message..." />
        <button onclick="send()">Send</button>
        <script>
          const ws = new WebSocket('ws://' + location.host);
          const chat = document.getElementById('chat');
          ws.onopen = () => ws.send(JSON.stringify({ type: 'join', name: '${name}' }));
          ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const line = document.createElement('div');
            line.textContent = data.name + ': ' + data.message;
            chat.appendChild(line);
            chat.scrollTop = chat.scrollHeight;
          };
          function send() {
            const msg = document.getElementById('msg').value;
            ws.send(JSON.stringify({ type: 'message', message: msg }));
            document.getElementById('msg').value = '';
          }
        </script>
      </body>
      </html>
    `);
  } else {
    res.writeHead(302, { Location: '/chat?name=Guest' });
    res.end();
  }
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.type === 'join') {
        clients.set(ws, data.name);
      } else if (data.type === 'message') {
        const name = clients.get(ws) || 'Anonymous';
        const payload = JSON.stringify({ name, message: data.message });
        for (const client of wss.clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
          }
        }
      }
    } catch (err) {
      console.error('Invalid message:', msg);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

// Start server
server.listen(PORT, () => {
  const ip = getLocalIP();
  console.log(`🟢 Chat server running at: http://${ip}:${PORT}/chat?name=YourName`);
});
