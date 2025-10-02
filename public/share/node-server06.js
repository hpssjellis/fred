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
const os = require('os');

const server = new WebSocket.Server({ port: 3000 });

let clients = new Map(); // socket -> nickname

server.on('connection', (ws) => {
    // default nickname
    clients.set(ws, "Client" + Math.floor(Math.random() * 1000));

    ws.on('message', (message) => {
        let text = message.toString().trim();

        // If message starts with "NICKNAME:" update nickname
        if (text.startsWith("NICKNAME:")) {
            let newName = text.replace("NICKNAME:", "").trim();
            if (newName.length > 0) {
                clients.set(ws, newName);
                ws.send("✅ Nickname set to " + newName);
            }
        } else {
            // Broadcast message with nickname
            let sender = clients.get(ws);
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(sender + ": " + text);
                }
            });
        }
    });

    ws.on('close', () => {
        let name = clients.get(ws);
        clients.delete(ws);
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("🚪 " + name + " has left the chat");
            }
        });
    });
});

console.log("WebSocket server running on ws://localhost:3000");

// Display local IP addresses for easier connection
const nets = os.networkInterfaces();
console.log("Local IP addresses for connecting clients:");
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
            console.log(`👉 ws://${net.address}:3000`);
            console.log(`👉 http://${net.address}:8080`);
        }
    }
}
