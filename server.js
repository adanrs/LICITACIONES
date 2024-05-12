const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' });

console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();
app.use(express.json());
// Middleware básico



// Importar rutas
const usersRoutes = require('./api/routes/users.routes');
const licitacionesRoutes = require('./api/routes/licitacionesRoutes');
const SBORoutes = require('./api/routes/SBORoutes');

// Configuración de rutas
app.use('/api/users', usersRoutes); // Rutas para la gestión de usuarios
app.use('/api/licitaciones', licitacionesRoutes); // Rutas para licitaciones
app.use('/api/sbo', SBORoutes); // Rutas para SAP Business One, nombre ajustado para claridad

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});