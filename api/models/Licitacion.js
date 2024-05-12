const db = require('../config/db');

exports.getAllLicitaciones = async () => {
    const query = `
        SELECT 
            ID, REFERENCE, STATUS, CURRENCY, DOCDATE, DOCDUEDATE, 
            CARDCODE, SLPCODE, CONTACTID, FOLLOWINGMARK, INTEREST, 
            NOTES, CREATEDBY, CREATEDDATE
        FROM APPS_EXTERNAS.Licitaciones;`;
    
    let connection;
    try {
        connection = await db.connect();
        const results = await connection.exec(query);
        return results;
    } catch (error) {
        console.error('Database Query Error getAllLicitaciones:', error);
        throw new Error('Database Query Error');
    } finally {
        if (connection) {
            await db.disconnect(connection);  // Usamos disconnect para cerrar correctamente
        }
    }
};
exports.createLicitacion = async (licitacionData) => {
    const {
        reference, status, currency, docDate, docDueDate, cardCode,
        slpCode, contactId, followingMark, interest, notes, createdBy
    } = licitacionData;

    // Asegúrate de que slpCode es un entero
    const slpCodeInt = parseInt(slpCode, 10);
    if (isNaN(slpCodeInt)) {
        throw new Error('SLPCODE debe ser un número entero');
    }

    const insertQuery = `
        INSERT INTO APPS_EXTERNAS.Licitaciones
        (REFERENCE, STATUS, CURRENCY, DOCDATE, DOCDUEDATE, CARDCODE, SLPCODE, CONTACTID, FOLLOWINGMARK, INTEREST, NOTES, CREATEDBY, CREATEDDATE)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
    `;

    const connection = await db.connect();
    try {
        await connection.exec(insertQuery, [reference, status, currency, docDate, docDueDate, cardCode, slpCodeInt, contactId, followingMark, interest, notes, createdBy]);
        // Continúa con la obtención del ID o lo que necesites hacer después
        return { success: true };
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};



exports.getLicitacionById = async (id) => {
    const query = `
        SELECT *
        FROM APPS_EXTERNAS.Licitaciones
        WHERE ID = ?;`;
    const connection = await db.connect();
    try {
        const results = await connection.exec(query, [id]);
        return results[0];
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};

exports.deleteLicitacion = async (id) => {
    const query = `
        DELETE FROM APPS_EXTERNAS.Licitaciones
        WHERE ID = ?;`;
    const connection = await db.connect();
    try {
        await connection.exec(query, [id]);
    } finally {
        if (connection) {
            await db.disconnect(connection);
        }
    }
};