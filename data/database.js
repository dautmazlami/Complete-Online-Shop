const mongodb = require('mongodb');
const { get } = require('../routes/auth.routes');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase(){
 const client = await MongoClient.connect('mongodb://127.0.0.1:27017')   
 database = client.db('online-shop');
}

function getDb(){
    if (!database) {
        throw new Error('Connection to Database failed');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,  
    getDb: getDb, 
}
