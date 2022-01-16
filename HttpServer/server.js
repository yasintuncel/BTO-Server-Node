const mongoConnector = require('common/database/mongoConnector');
const config = require('./config');
const createHttpServer = require('./createHttpServer');
const userSeeder = require('./seeders/userSeeder');
//
const start = async function () {
    console.log('Starting new Server... ');
    let dbStatus = await mongoConnector(config.mongoUri);
    console.log(dbStatus.message);
    //
    if (dbStatus.isConnected) {
        await userSeeder();
        createHttpServer(config.httpPort);
    }
    else {
        console.log('Exiting now!');
        process.exit(1);
    }
};

start();