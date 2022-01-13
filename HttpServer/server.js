const mongoConnector = require('common/mongoConnector');
const config = require('./config');
const createHttpServer = require('./createHttpServer');
const jwt = require('jsonwebtoken');
//
const start = async function () {
    console.log('Starting new Server... ');
    let dbStatus = await mongoConnector(config.mongoUri);
    console.log(dbStatus.message);
    //
    if (dbStatus.isConnected) {
        createHttpServer(config.httpPort);
    }
    else {
        console.log('Exiting now!');
        process.exit(1);
    }
    console.log(jwt.sign({ userId: 'bubirpayload' }, config.apiScreetKey, { expiresIn: '3m' }));
};

start();