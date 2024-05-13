const db = require('../config/db');

exports.getAllVendedores = async () => {
    const query = 'SELECT "SlpCode", "SlpName" FROM "SBOTRIDM"."OSLP";';
    const connection = await db.connect();
    try {
        const results = await connection.exec(query);
        return results;
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};

exports.getVendedorById = async (slpCode) => {
    const query = 'SELECT "SlpCode", "SlpName" FROM "SBOTRIDM"."OSLP" WHERE "SlpCode" = ?;';
    const connection = await db.connect();
    try {
        const results = await connection.exec(query, [slpCode]);
        return results[0];
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};
