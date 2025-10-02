// ===============================================================
// Simple Chat Server with WebSocket + HTTP (NodeJS + ws)
// ===============================================================
// Prerequisites: `npm install ws`
//
// This script runs both:
// 1. WebSocket server (chat) on port 3000
// 2. HTTP static server on port 8080 (serves chat.html)
//
// ===============================================================
// HOW TO ACTIVATE A HOTSPOT:
// ===============================================================
// --- Windows (PowerShell / CMD) ---
// netsh wlan set hostednetwork mode=allow ssid=MyHotspot key=MyPassword
// netsh wlan start hostednetwork
//
// Windows will give the host machine IP 192.168.137.1 by default.
// Clients connect to this Wi-Fi and then to ws://192.168.137.1:3000
//
// --- macOS ---
// Create hotspot via GUI: System Settings > Sharing > Internet Sharing.
//   - Share from: Ethernet or Other Interface
//   - To computers using: Wi-Fi
//   - Set SSID + Password
// mac will usually default to 192.168.2.1
//
// --- Linux (using nmcli) ---
// nmcli dev wifi hotspot ifname wlan0 ssid MyHotspot password MyPassword
// Host gets IP like 10.42.0.1
//
// ===============================================================

const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const path = require('path');

const myWsPort = 3000;
const myHttpPort = 8080;

// -------------------------------
// WebSocket Chat Server
// -------------------------------
const myWsServer = new WebSocket.Server({ port: myWsPort });
let myClients = [];

myWsServer.on('connection', (socket) => {
    myClients.push(socket);
    console.log('New client connected. Total:', myClients.length);

    socket.on('message', (msg) => {
        console.log('Received:', msg.toString());
        // Broadcast message to all connected clients
        myClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
        myClients = myClients.filter(c => c !== socket);
    });
});

console.log(`WebSocket server running on ws://0.0.0.0:${myWsPort}`);


// -------------------------------
// HTTP Static File Server
// -------------------------------
const myHttpServer = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './chat.html';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            let ext = path.extname(filePath).toLowerCase();
            let type = 'text/html';
            if (ext === '.js') type = 'application/javascript';
            if (ext === '.css') type = 'text/css';
            res.writeHead(200, { 'Content-Type': type });
            res.end(data, 'utf-8');
        }
    });
});

myHttpServer.listen(myHttpPort, () => {
    console.log(`HTTP server running on http://0.0.0.0:${myHttpPort}`);
});
