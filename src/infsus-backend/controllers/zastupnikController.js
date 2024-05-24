const Zastupnik = require('../models/Zastupnik');

exports.getAllZastupnici = async (req, res) => {
  try {
    const zastupnici = await Zastupnik.findAll();
    res.json(zastupnici);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};