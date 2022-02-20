const commandManager = require('./command/commandManager');
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
            try {
                commandManager.handleCommand(userClients, userClient, JSON.parse(message.toString()));
            }
            catch (err) {
                console.log('User Action. User id: ' + userClient.userId + ' /  Error: ' + err);
                userClient.socket.send(JSON.stringify({
                    error: err,
                }));
            }
        });
        //
        socket.on('close', async function (code) {
            await onUserDisconnect(userClient, code);
            if (userId in userClients)
                delete userClients[userId];
        });
    },
};
module.exports = clientManager;