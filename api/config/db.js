// En tu módulo db si estás usando SAP HANA Client y manejas un pool
const hanaClient = require('@sap/hana-client');

const config = {
    serverNode: process.env.SERVER_NODE,
    uid: process.env.UID,
    pwd: process.env.PWD,
    encrypt: process.env.HANA_ENCRYPT === 'true',
    sslValidateCertificate: process.env.HANA_SSL_VALIDATE === 'true'
};

const pool = hanaClient.createPool(config);

module.exports = {
    connect: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });
    },
    disconnect: (connection) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.disconnect((err) => {  // Aquí usamos disconnect en lugar de release
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();  // No connection to disconnect
            }
        });
    }
};
