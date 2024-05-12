
const hanaClient = require('@sap/hana-client');
 
const config = {
    serverNode: process.env.SERVER_NODE,
    uid: process.env.UID,
    pwd: process.env.PWD,
    encrypt: process.env.HANA_ENCRYPT ,  // Convierte la cadena 'false' en un booleano
    sslValidateCertificate: process.env.HANA_SSL_VALIDATE   // Convierte la cadena 'false' en un booleano
};


const connection = hanaClient.createConnection();

 

const connect = () => {
    console.log("Connecting to SAP HANA...");
    return new Promise((resolve, reject) => {
        connection.connect(config, err => {
            if (err) {
                console.error("Error connecting to SAP HANA:", err);
                return reject(err);
            }
            console.log("Successfully connected to SAP HANA.");
            resolve(connection);
        });
    });
};

const disconnect = () => {
    return new Promise((resolve, reject) => {
        connection.disconnect(err => {
            if (err) {
                console.error("Error disconnecting from SAP HANA:", err);
                return reject(err);
            }
            console.log("Successfully disconnected from SAP HANA.");
            resolve();
        });
    });
};

module.exports = {
    connect,
    disconnect
};