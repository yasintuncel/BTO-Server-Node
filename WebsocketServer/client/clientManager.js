const onUserConnect = require('./user/onUserConnect');
const onUserDisconnect = require('./user/onUserDisconnect');

const clientManager = {
    handleClient: async function (socket, request) {
        const userId = request.user.id.toString();
        const connectionStatus = await onUserConnect(socket, userId);
        //
        if (!connectionStatus.isValidUser) return;
        //
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