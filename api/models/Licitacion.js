const db = require('../config/db');  // Asumiendo que db es el módulo donde gestionas el pool de conexiones.

exports.getAllLicitaciones = async () => {
    const query = `
        SELECT 
            ID, REFERENCE, STATUS, CURRENCY, DOCDATE, DOCDUEDATE, 
            CARDCODE, SLPCODE, CONTACTID, FOLLOWINGMARK, INTEREST, 
            NOTES, CREATEDBY, CREATEDDATE
        FROM APPS_EXTERNAS.Licitaciones;`;
    
    try {  
        const connection = await db.connect();  // Obtiene una conexión del pool

        const results = await connection.exec(query);  // Ejecuta la consulta

        db.disconnect();  // Libera la conexión de vuelta al pool
        console.log("Connection released back to the pool.");

        return results;  // Devuelve los resultados
    } catch (error) {
        console.error('Database Query Error getAllLicitaciones:', error);
        throw new Error('Database Query Error');  // Lanza un error con un mensaje más genérico
    }
};