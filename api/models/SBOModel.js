const db = require('../config/db');

exports.getAllItems = async () => {
    const query = 'SELECT * FROM SBOTRIDM.OITM;';
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

exports.getItemById = async (itemCode) => {
    const query = 'SELECT * FROM SBOTRIDM.OITM WHERE "ItemCode" = ?;';
    const connection = await db.connect();
    try {
        const results = await connection.exec(query, [itemCode]);
        return results[0];
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};
//estos hay que corregirlos
exports.getAllClientsAndSuppliers = async () => {
    const query = 'SELECT * FROM SBOTRIDM.OCRD;';
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


exports.getClientById = async (itemCode) => {
    const query = 'SELECT "CardCode", "CardName" FROM "SBOTRIDM"."OCRD"  WHERE "CardCode" = ?;';
    const connection = await db.connect();
    try {
        const results = await connection.exec(query, [itemCode]);
        return results[0];
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};
//esto hay que ver el tema de indices completos.

exports.searchItemsByDescription = async (description) => {
    const query = `
    SELECT "ItemCode", "ItemName"
    FROM "SBOTRIDM"."OITM"
    WHERE CONTAINS("ItemName", ?, FUZZY(0.8, 'textSearch=compare'));
    
    `;
    const connection = await db.connect();
    try {
        const results = await connection.exec(query, [description]);
        return results;
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};

exports.searchClientsByName = async (clientName) => {
    const query = `
        SELECT CardCode, CardName, CardType, Address FROM SBOTRIDM.OCRD
        WHERE CONTAINS(CardName, ?, FUZZY(0.8, 'similarCalculationMode=compare,exactSearchOptimization=off'));
    `;
    const connection = await db.connect();
    try {
        const results = await connection.exec(query, [clientName]);
        return results;
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};


exports.searchItemsByText = async (searchText) => {
    const query = `
    SELECT "ItemCode", "ItemName"
    FROM "SBOTRIDM"."OITM"
    WHERE "ItemName" LIKE '%' || ? || '%';
    `;
    const connection = await db.connect();
    try {
        console.log('Searching for items with text:', searchText);
        const results = await connection.exec(query, [searchText]);
        return results;
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};
