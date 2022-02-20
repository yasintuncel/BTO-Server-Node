const mongoConnector = require('common/database/mongoConnector');
const config = require('./config');
const createWebsocketServer = require('./createWebsocketServer');
//
const start = async function () {
    console.log('Starting Websocket Server... ');
    let dbStatus = await mongoConnector(config.mongoUri);
    console.log(dbStatus.message);
    //
    if (dbStatus.isConnected) {
        createWebsocketServer(config.websocketPort);
    }
    else {
        console.log('Exiting now!');
        process.exit(1);
    }
};

start();