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

exports.putPolitickaStranka = async (req, res) => {
  const imepolitickestranke = req.params.imepolitickestranke;
  const kratkiopisstranke = req.params.kratkiopisstranke;
  try {
    const politickaStranka = await PolitickaStranka.create({
      imepolitičkestranke: imepolitickestranke,
      kratkiopisstranke: kratkiopisstranke,
      oznakavrstepolitičkestranke:oznakavrstepolitickestranke
    })
    res.json(politickaStranka);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePolitickaStranka = async (req, res) => {
  const imepolitickestranke = req.params.imepolitickestranke;
  try {
    const politickaStranka = await PolitickaStranka.destroy({
      where: {imepolitičkestranke: imepolitickestranke}
    })
    res.json(politickaStranka);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};