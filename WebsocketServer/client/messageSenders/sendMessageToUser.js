const sendMessageToUser = function (userClient, message) {
    userClient.socket.send(JSON.stringify(message));
};
module.exports = sendMessageToUser;