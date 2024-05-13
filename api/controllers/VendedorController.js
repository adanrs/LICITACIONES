const VendedorModel = require('../models/VendedorModel');

exports.getVendedores = async (req, res) => {
    try {
        const vendedores = await VendedorModel.getAllVendedores();
        res.json(vendedores);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getVendedor = async (req, res) => {
    try {
        const slpCode = req.params.slpCode;
        const vendedor = await VendedorModel.getVendedorById(slpCode);
        if (!vendedor) {
            res.status(404).send('Vendedor no encontrado');
        } else {
            res.json(vendedor);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
