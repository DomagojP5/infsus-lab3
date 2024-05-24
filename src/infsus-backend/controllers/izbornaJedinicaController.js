const IzbornaJedinica = require('../models/IzbornaJedinica');

exports.getAllIzborneJedinice = async (req, res) => {
  try {
    const izbornaJedinica = await IzbornaJedinica.findAll();
    res.json(izbornaJedinica);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};