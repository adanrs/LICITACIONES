const db = require('./config/db'); // Asegúrate de ajustar la ruta al archivo db.js según donde esté ubicado

async function testDatabaseConnection() {
    try {
        console.log('Testing database connection...');
        await db.connect();
        console.log('Connection successful! Database is connected.');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    } finally {
        try {
            await db.disconnect();
            console.log('Disconnected from database.');
        } catch (disconnectError) {
            console.error('Failed to disconnect:', disconnectError);
        }
    }
}

testDatabaseConnection();