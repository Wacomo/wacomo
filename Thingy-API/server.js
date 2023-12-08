const app = require('./index');
const http = require('http');
const PORT = process.env.PORT || 3900;
const wss = require('./controller/thingyController');

const server = http.createServer(app); // Create an HTTP server from the Express app

// Attach the WebSocket server to the HTTP server
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

server.listen(PORT, () => {
    console.log(`HTTP and WebSocket server running on port ${PORT}`);
});

