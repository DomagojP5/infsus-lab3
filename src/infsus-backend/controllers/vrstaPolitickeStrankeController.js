const VrstaPolitickeStranke = require('../models/VrstaPolitickeStranke');

exports.getImeVrstePolitickeStranke = async (req, res) => {
    const oznakavrstepolitickestranke = req.params.id;
    try {
        const vrstePolitickeStranke = await VrstaPolitickeStranke.findByPk(oznakavrstepolitickestranke);
        res.json(vrstePolitickeStranke.imevrstepolitičkestranke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};