const userForMessage = require("../../mappers/userForMessage");
const commandTypes = require("../command/commandTypes");
const sendMessageToAll = require("../messageSenders/sendMessageToAll");
const sendMessageToUser = require("../messageSenders/sendMessageToUser");

/*
{
    "type" : "GLOBAL_MESSAGE",
    "data" : {
        "from": "61321056478e245d14a7c251",
        "message": "selam Z"
    }
}
*/
const onGlobalMessage = function ({ userClients, userClient, data }) {
    if (data.message && data.message !== '') {
        let message = {
            type: commandTypes.globalMessage,
            data: {
                from: userForMessage(userClient.user),
                message: data.message
            }
        };
        sendMessageToAll(userClients, userClient, message);
        //
        message.type = commandTypes.globalMessageResponse;
        sendMessageToUser(userClient, message);
    }
    else {
        sendMessageToUser(userClient, { type: commandTypes.messageNotValid });
    }
};
module.exports = onGlobalMessage;