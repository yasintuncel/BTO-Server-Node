const { User } = require('common/database/models/user');
const commandTypes = require("./commandTypes");
const onGlobalMessage = require('../commandFunctions/onGlobalMessage');
const onPrivateMessage = require('../commandFunctions/onPrivateMessage');

let commands = {};

const addCommand = function (cmd, fnc) {
    commands[cmd] = fnc;
};

const commandManager = {
    setCommands: function () {
        // add all commands
        addCommand(commandTypes.globalMessage, onGlobalMessage);
        addCommand(commandTypes.privateMessage, onPrivateMessage);
    },
    handleCommand: async function (userClients, userClient, message) {
        let data = message.data;
        let type = message.type;
        //
        userClient.user = await User.findById(userClient.userId);
        //
        try {

            await commands[type]({ userClients, userClient, data });
        }
        catch (err) {
            console.log('Command error. No command defined for ' + type + '.\n Error: ' + err);
        }
        console.log('User Action. User id: ' + userClient.userId + ' /  Action: ' + message.type);
    },
};

module.exports = commandManager;