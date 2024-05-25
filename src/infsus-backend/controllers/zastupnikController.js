const Zastupnik = require('../models/Zastupnik');

exports.getAllZastupnici = async (req, res) => {
  try {
    const zastupnici = await Zastupnik.findAll();
    res.json(zastupnici);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getZastupnici = async (req, res) => {
  const name = req.params.name;
  try {
    const zastupnici = await Zastupnik.findAll({
      where: { imepolitičkestranke: name }
    });
    res.json(zastupnici);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getZastupnikById = async (req, res) => {
  try {
    console.log(`Received request for zastupnik with ID: ${req.params.id}`);
    const { id } = req.params;
    const zastupnik = await Zastupnik.findByPk(id);

    if (!zastupnik) {
      return res.status(404).json({ message: 'Zastupnik not found' });
    }
    console.log(`dobio sam zastupnika u getbyid`)
    res.json(zastupnik)
  } catch (error) {
    console.error('Error fetching zastupnik by ID:', error);
  }
};

exports.updateZastupnik = async (req, res) => {
  try {
    const { id } = req.params;
    const { imezastupnika, godinezastupnika, spolzastupnika, rednibrojizbjed, imepolitickestranke } = req.body;
    
    const zastupnik = await Zastupnik.findByPk(id);
    if (!zastupnik) {
      return res.status(404).json({ message: 'Zastupnik not found' });
    }

    zastupnik.imezastupnika = imezastupnika;
    zastupnik.godinezastupnika = godinezastupnika;
    zastupnik.spolzastupnika = spolzastupnika;
    zastupnik.rednibrojizbjed = rednibrojizbjed;
    zastupnik.imepolitickestranke = imepolitickestranke;

    await zastupnik.save();
    res.status(200).json(zastupnik);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};