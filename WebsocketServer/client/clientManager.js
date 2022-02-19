const { WebSocket } = require('ws');
const onUserConnect = require('./user/onUserConnect');
const onUserDisconnect = require('./user/onUserDisconnect');

let userClients = {};

const clientManager = {
    handleClient: async function (socket, request) {
        const userId = request.user.id.toString();
        const connectionStatus = await onUserConnect(socket, userId);

        if (!connectionStatus.isValidUser)
            return;
        let user = connectionStatus.user;

        let userClient = {
            userId: userId,
            user: user,
            socket: socket,
            isAlive: true,
        };
        userClients[userId] = userClient;

        socket.on('message', function incoming(message) {
            console.log(user.nickName + '>_ ' + JSON.parse(message).message);
        });
        //
        socket.on('close', async function (code) {
            await onUserDisconnect(socket, userId, code);
        });
    },
};
module.exports = clientManager;