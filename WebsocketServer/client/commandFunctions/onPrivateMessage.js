const commandTypes = require("../command/commandTypes");
const userForMessage = require("../../mappers/userForMessage");
const sendMessageToUser = require("../messageSenders/sendMessageToUser");
/*
{
    "type": "PRIVATE_MESSAGE",
    "data": {
        "to": "620f5187aad357123b49a429",
        "message":"herkese selamlar"
    }
}
*/
const onPrivateMessage = function ({ userClients, userClient, data }) {
    if (data.message && data.message !== '') {
        let message = {
            type: commandTypes.privateMessage,
            data: {
                from: userForMessage(userClient.user),
                message: data.message
            }
        };
        sendMessageToUser(userClients[data.to], message);
        //
        message.type = commandTypes.privateMessageResponse;
        sendMessageToUser(userClient, message);
    }
    else {
        sendMessageToUser(userClient, { type: commandTypes.messageNotValid });
    }
};

module.exports = onPrivateMessage;