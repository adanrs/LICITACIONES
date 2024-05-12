const Licitacion = require('../models/Licitacion');

exports.getLicitaciones = async (req, res) => {
    try {
        const licitaciones = await Licitacion.getAllLicitaciones();
        res.status(200).json(licitaciones);
    } catch (error) {
        res.status(500).send({ message: "Error al recuperar las licitaciones: " + error.message });
    }
};
