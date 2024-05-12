const SBOModel = require('../models/SBOModel');

exports.getItems = async (req, res) => {
    try {
        const items = await SBOModel.getAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const item = await SBOModel.getItemById(req.params.itemCode);
        if (!item) {
            res.status(404).send('Item no encontrado');
        } else {
            res.json(item);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getClientsAndSuppliers = async (req, res) => {
    try {
        const clientsAndSuppliers = await SBOModel.getAllClientsAndSuppliers();
        res.json(clientsAndSuppliers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getClient = async (req, res) => {
    try {
        const item = await SBOModel.getClientById(req.params.clientCode);
        if (!item) {
            res.status(404).send('Cliente no encontrado');
        } else {
            res.json(item);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

 

exports.searchItems = async (req, res) => {
    try {
        const items = await SBOModel.searchItemsByDescription(req.query.description);
        res.json(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchClients = async (req, res) => {
    try {
        const clients = await SBOModel.searchClientsByName(req.query.clientName);
        res.json(clients);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

 
exports.searchItemsByText = async (req, res) => {
    try {
        const searchText = req.query.searchText;
        const items = await SBOModel.searchItemsByText(searchText);
        res.json(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
