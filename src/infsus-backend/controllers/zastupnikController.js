const Zastupnik = require('../models/Zastupnik');

exports.getAllZastupnici = async (req, res) => {
  try {
    const zastupnici = await Zastupnik.findAll();
    if (!zastupnici) {
      return res.status(404).json();
    }
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
    if (!zastupnici) {
      return res.status(404).json();
  }
    res.json(zastupnici);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getZastupnikById = async (req, res) => {
  try {
    const { id } = req.params;
    const zastupnik = await Zastupnik.findByPk(id);

    if (!zastupnik) {
      return res.status(404).json({ message: 'Zastupnik not found' });
    }
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

    try {
      zastupnik.imezastupnika = imezastupnika;
      zastupnik.godinezastupnika = godinezastupnika;
      zastupnik.spolzastupnika = spolzastupnika;
      zastupnik.rednibrojizbjed = rednibrojizbjed;
      zastupnik.imepolitickestranke = imepolitickestranke;
      await zastupnik.save();
    } catch (error) {
      return res.status(400).json({});
    }
    return res.status(200).json(zastupnik);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createZastupnik = async (req, res) => {
    try {
        const { imezastupnika, godinezastupnika, spolzastupnika, rednibrojizbjed, imepolitičkestranke } = req.body;
        let newZastupnik;
        try {
          newZastupnik = await Zastupnik.create({
              imezastupnika: imezastupnika,
              godinezastupnika: godinezastupnika, 
              spolzastupnika: spolzastupnika,
              rednibrojizbjed: rednibrojizbjed,
              imepolitičkestranke: imepolitičkestranke
          });
        } catch (error) {
          return res.status(400).json({});
        }

        return res.status(201).json(newZastupnik);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteZastupnik = async (req, res) => {
  const { imezastupnika, imepolitickestranke } = req.params;
  try {
    const zastupnik = await Zastupnik.destroy({
      where: {
        imezastupnika: imezastupnika,
        imepolitičkestranke: imepolitickestranke
      }
    });
    if (!zastupnik) return res.status(404).json({})
    return res.json(zastupnik);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}