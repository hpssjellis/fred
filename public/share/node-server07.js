// server.js
// Run with: node server.js
// Requires: npm install ws

// ===============================================================
// WebSocket + HTTP Chat Server
// - Runs WebSocket server on port 3000
// - Runs HTTP static server on port 8080 (serves chat.html)
// - Prints host IP addresses for clients
// - Handles client nicknames
// ===============================================================

// ===========================
// HOTSPOT COMMANDS REFERENCE
// ===========================

// --- Windows ---
// Start hotspot:
// netsh wlan set hostednetwork mode=allow ssid MyHotspot key MyPassword123
// netsh wlan start hostednetwork
//
// Stop hotspot:
// netsh wlan stop hostednetwork
//
// Check hotspot status:
// netsh wlan show hostednetwork

// --- macOS ---
// Start hotspot:
// System Settings > Network > Wi-Fi > Internet Sharing (GUI)
//
// Stop hotspot:
// System Settings > Network > Wi-Fi > Internet Sharing (toggle off)
//
// Command-line partial stop (turn off Wi-Fi, effectively stopping sharing):
// sudo networksetup -setairportpower en0 off

// --- Linux (NetworkManager / nmcli) ---
// Start hotspot:
// nmcli dev wifi hotspot ifname wlan0 ssid MyHotspot password MyPassword123
//
// Stop hotspot:
// nmcli connection down Hotspot
//
// List connections:
// nmcli connection show

// ===============================================================


const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// --- WebSocket Chat Server ---
const wsServer = new WebSocket.Server({ port: 3000 });
let clients = new Map(); // ws -> nickname

wsServer.on('connection', (ws) => {
    clients.set(ws, "Client" + Math.floor(Math.random() * 1000));

    ws.on('message', (msg) => {
        const text = msg.toString().trim();
        if (text.startsWith("NICKNAME:")) {
            const newName = text.replace("NICKNAME:", "").trim();
            if (newName.length > 0) {
                clients.set(ws, newName);
                ws.send("✅ Nickname set to " + newName);
            }
        } else {
            const sender = clients.get(ws);
            wsServer.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(sender + ": " + text);
                }
            });
        }
    });

    ws.on('close', () => {
        const name = clients.get(ws);
        clients.delete(ws);
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("🚪 " + name + " has left the chat");
            }
        });
    });
});

console.log("✅ WebSocket server running on ws://localhost:3000");

// --- HTTP Server to serve chat.html ---
const httpPort = 8080;
const htmlFile = path.join(__dirname, "chat.html");

const httpServer = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/chat.html") {
        fs.readFile(htmlFile, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading chat.html");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

httpServer.listen(httpPort, () => {
    console.log(`✅ HTTP server running at http://localhost:${httpPort}/`);
});

// --- Show local IPs ---
const nets = os.networkInterfaces();
console.log("\nClients can connect using one of these:");
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
            console.log(`👉 http://${net.address}:${httpPort}/ (chat page)`);
            console.log(`👉 ws://${net.address}:3000 (websocket)`);
        }
    }
}
