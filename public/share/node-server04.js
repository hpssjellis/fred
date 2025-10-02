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
    let filePath = '.' + r
