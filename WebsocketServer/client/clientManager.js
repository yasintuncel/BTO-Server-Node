const { User } = require('common/database/models/user');

const clientManager = {
    handleClient: async function (socket, request) {
        const userId = request.user.id.toString();
        let user = await User.findById(userId);
        console.log(userId + ' connected. Nickname: ' + user.nickName);
        //
        socket.on('message', function incoming(message) {
            console.log(user.nickName + '>_ ' + message);
        });
        //
        socket.on('close', function (code) {
            console.log(userId + ' disconnected. Nickname: ' + user.nickName + ' Code: ' + code);
        });
    },
};
module.exports = clientManager;