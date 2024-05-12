const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js');
require('dotenv').config();

const checkRoleExists = async (roleId) => {
    const roleQuery = `SELECT RoleID FROM APPS_EXTERNAS.Roles WHERE RoleID = ?`;
    let conn;
    try {
        conn = await db.connect();
        const results = await conn.exec(roleQuery, [roleId]);
        return results.length > 0;
    } finally {
        if (conn) {
            await db.disconnect();
        }
    }
};

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM APPS_EXTERNAS.Users WHERE username = ?';
    let connection;
    try {
        connection = await db.connect();
        const result = await connection.exec(query, [username]);
        if (result.length > 0) {
            return result[0]; // Devuelve toda la información del usuario
        } else {
            return null; // No se encontró el usuario
        }
    } catch (error) {
        console.error('Database query error:', error);
        throw error; // Lanza el error para manejarlo más adelante
    } finally {
        if (connection) {
            await db.disconnect();
        }
    }
};

exports.createUser = async (req, res) => {
    const { username, password, email, roleID } = req.body;
    let connection;

    try {
        const roleIsValid = await checkRoleExists(roleID);
        if (!roleIsValid) {
            return res.status(400).send({ message: "Invalid RoleID provided." });
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        const insertQuery = `INSERT INTO APPS_EXTERNAS.Users (Username, Password, Email, RoleID) VALUES (?, ?, ?, ?)`;

        connection = await db.connect();
        await connection.exec(insertQuery, [username, passwordHash, email, roleID]);
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send({ message: error.message });
    } finally {
        if (connection) {
            await db.disconnect();
        }
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);
        console.log("User data retrieved:", user);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Asegúrate de que la contraseña del usuario exista antes de intentar verificarla
        if (!user.PASSWORD) { // Cambiado de user.Password a user.PASSWORD
            console.error("Password is undefined, check database field mappings.");
            return res.status(500).send({ message: "An internal error occurred." });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.PASSWORD); // Cambiado de user.Password a user.PASSWORD

        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }
        //console.log("Password is valid!");
        const token = jwt.sign({ id: user.USERID, roles: user.ROLEID }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.status(200).send({
            id: user.USERID, // Asegúrate de que las otras propiedades también sigan el mismo patrón de mayúsculas/minúsculas
            username: user.USERNAME,
            roles: user.ROLEID,
            accessToken: token
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



exports.getUsers = async (req, res) => {
    // Lógica para obtener y responder con todos los usuarios
    const query = 'SELECT * FROM APPS_EXTERNAS.Users';
    let connection;
    try {
        connection = await db.connect();
        const results = await connection.exec(query);
        res.send(results);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send({ message: error.message });
    } finally {
        if (connection) {
            await db.disconnect();
        }
    }
};
 

exports.updateUser = async (req, res) => {
    // Lógica para actualizar un usuario específico
    const { id } = req.params;
    const { username, password, email, roleID } = req.body;
    let connection;

    try {
        const roleIsValid = await checkRoleExists(roleID);
        if (!roleIsValid) {
            return res.status(400).send({ message: "Invalid RoleID provided." });
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        const updateQuery = `UPDATE APPS_EXTERNAS.Users SET Username = ?, Password = ?, Email = ?, RoleID = ? WHERE UserID = ?`;

        connection = await db.connect();
        await connection.exec(updateQuery, [username, passwordHash, email, roleID, id]);
        res.send(`Usuario con ID ${id} actualizado`);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send({ message: error.message });
    } finally {
        if (connection) {
            await db.disconnect();
        }
    }
};
 

exports.deleteUser = async (req, res) => {
    // Lógica para eliminar un usuario específico
    const { id } = req.params;
    let connection;

    try {
        const deleteQuery = `DELETE FROM APPS_EXTERNAS.Users WHERE UserID = ?`;

        connection = await db.connect();
        await connection.exec(deleteQuery, [id]);
        res.send(`Usuario con ID ${id} eliminado`);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send({ message: error.message });
    } finally {
        if (connection) {
            await db.disconnect();
        }
    }
};
