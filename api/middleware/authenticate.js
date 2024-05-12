const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log(token)
        return res.status(401).send({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Aquí se pasa todo el payload decodificado al req.user
        console.log(req.user); // Agrega esto para verificar que los datos se estén decodificando correctamente
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token.' });
    }
};
module.exports = authenticate;
