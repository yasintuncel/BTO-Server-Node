const { User } = require('common/database/models/user');
const commandTypes = require("./commandTypes");

let commands = {},



const commandManager = {
    addCommands: function (cmd, fnc) {
        commands[cmd] = fnc;
    },
    setCommands: function () {
        // add all commands
        // commandManager.addCommands(commandTypes.globalMessage, onGlobalMessage);
    },
    handleCommand: async function (userClients, userClient, message) {
        let data = message.data;
        let type = message.type;
        //
        userClient.user = await User.findById(userClient.userId);
        //
        try {
            commands[type]({ userClients, userClient, data });
        }
        catch (err) {
            console.log('Command error. No command defined for ' + type);
        }
        console.log('User Action. User id: ' + userClient.userId + ' /  Action: ' + message.type);
    },
};

module.exports = commandManager;