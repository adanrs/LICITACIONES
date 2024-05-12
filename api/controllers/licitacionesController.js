const Licitacion = require('../models/Licitacion');  // Importa el modelo con un nombre consistente

exports.getLicitaciones = async (req, res) => {
    try {
        const licitaciones = await Licitacion.getAllLicitaciones();  // Usa Licitacion para llamar a la función
        res.status(200).json(licitaciones);
    } catch (error) {
        res.status(500).send({ message: "Error al recuperar las licitaciones: " + error.message });
    }
};

exports.createLicitacion = async (req, res) => {
    try {
        const result = await Licitacion.createLicitacion(req.body);  // Usa Licitacion aquí también
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getLicitacion = async (req, res) => {
    try {
        const result = await Licitacion.getLicitacionById(req.params.id);  // Correcto uso de Licitacion
        if (!result) {
            res.status(404).send('Licitación no encontrada');
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteLicitacion = async (req, res) => {
    try {
        await Licitacion.deleteLicitacion(req.params.id);  // Igualmente, usa Licitacion
        res.send('Licitación eliminada');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
