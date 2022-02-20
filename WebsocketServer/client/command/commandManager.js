const commandTypes = require("./commandTypes");

const commandManager = {
    commands: {},
    addCommands: function (command, func) {
        commandManager.commands[command] = func;
    },
    setCommands: function () {
        commandManager.addCommands(commandTypes.globalMessage, onGlobalMessage);
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