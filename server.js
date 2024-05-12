const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' });

console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();
app.use(express.json());
// Middleware básico

const licitacionesRoutes = require('./api/routes/licitacionesRoutes');

app.use('/api/licitaciones', licitacionesRoutes);
// Importar rutas
const usersRoutes = require('./api/users/users.routes');

// Configuración de rutas
app.use('/api/users', usersRoutes); // Rutas para la gestión de usuarios

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
