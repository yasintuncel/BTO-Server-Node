const WebSocketServer = require('ws').Server;
const clientManager = require('./client/clientManager');
const websocketMiddleware = require('./middlewares/websocketMiddleware');

const createWebsocketServer = function (port) {
    const wss = new WebSocketServer({
        port: port,
        verifyClient: websocketMiddleware
    },
        () => {
            console.log('Websocket Server started: Port: ' + port);
        });

    wss.on('connection', clientManager.handleClient);
};

module.exports = createWebsocketServer;