const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 8);
};

exports.verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

/*exports.generateToken = (user) => {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
};*/

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
  

exports.generateToken = (user) => {
    return jwt.sign(
        { id: user.id, ROLEID: user.ROLEID }, // Asegúrate de que estás utilizando la misma clave aquí como se espera en otros lugares
        console.log("Generate Token",user.ROLEID),
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};