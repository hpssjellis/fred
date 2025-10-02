// Simple WebSocket Chat Server
const WebSocket = require('ws');

// Pick a port (must match client, e.g. 3000)
const myPort = 3000;
const myServer = new WebSocket.Server({ port: myPort });

let myClients = [];

myServer.on('connection', (socket) => {
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

console.log("WebSocket server running on ws://localhost:" + myPort);
