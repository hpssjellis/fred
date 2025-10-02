// ===============================================================
// WebSocket + HTTP Chat Server
// - Runs WebSocket server on port 3000
// - Runs HTTP static server on port 8080 (serves chat.html)
// - Prints host IP addresses (LAN / hotspot / Wi-Fi)
// - Tags each client with an ID for clearer chat
// ===============================================================

const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const path = require('path');
const os = require('os');

const myWsPort = 3000;
const myHttpPort = 8080;

// -------------------------------
// WebSocket Chat Server
// -------------------------------
const myWsServer = new WebSocket.Server({ port: myWsPort });
let myClients = [];
let myClientIdCounter = 1;

myWsServer.on('connection', (socket) => {
    socket.myId = "Client" + myClientIdCounter++;
    myClients.push(socket);

    console.log(`${socket.myId} connected. Total clients: ${myClients.length}`);

    socket.send(`Welcome ${socket.myId}! You are connected.`);

    socket.on('message', (msg) => {
        console.log(`${socket.myId} says: ${msg.toString()}`);
        // Broadcast with sender ID
        myClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${socket.myId}: ${msg.toString()}`);
            }
        });
    });

    socket.on('close', () => {
        console.log(`${socket.myId} disconnected`);
        myClients = myClients.filter(c => c !== socket);
    });
});


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


// -------------------------------
// Print Local IPs for User
// -------------------------------
function myPrintNetworkAddresses() {
    const nets = os.networkInterfaces();
    console.log("WebSocket server available at:");
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                console.log(`  ws://${net.address}:${myWsPort}`);
                console.log(`  http://${net.address}:${myHttpPort}`);
            }
        }
    }
}
myPrintNetworkAddresses();
