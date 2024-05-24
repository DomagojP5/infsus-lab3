const PolitickaStranka = require('../models/PolitickaStranka');

exports.getAllPolitickeStranke = async (req, res) => {
  try {
    const politickeStranke = await PolitickaStranka.findAll();
    res.json(politickeStranke);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPolitickaStranka = async (req, res) => {
  const name = req.params.name;
  try {
    const politickaStranka = await PolitickaStranka.findByPk(name);
    res.json(politickaStranka);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};