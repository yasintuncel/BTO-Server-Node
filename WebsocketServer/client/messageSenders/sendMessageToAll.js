const sendMessageToAll = function (userClients, userClient, message) {
    for (userId in userClients) {
        let uc = userClients[userId];
        if (uc.userId !== userClient.userId)
            uc.socket.send(JSON.stringify(message));
    }
};
module.exports = sendMessageToAll;