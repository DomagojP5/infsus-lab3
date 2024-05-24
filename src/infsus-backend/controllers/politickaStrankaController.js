const PolitickaStranka = require('../models/PolitickaStranka');

exports.getAllPolitickeStranke = async (req, res) => {
  try {
    const politickeStranke = await PolitickaStranka.findAll();
    res.json(politickeStranke);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};