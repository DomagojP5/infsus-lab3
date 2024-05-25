const IzbornaJedinica = require('../models/IzbornaJedinica');

exports.getAllIzborneJedinice = async (req, res) => {
  try {
    const izbornaJedinica = await IzbornaJedinica.findAll();
    res.json(izbornaJedinica);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.putIzbornaJedinica = async (req, res) => {
  const rednibrojizbjed = req.params.rednibrojizbjed;
  const opis = req.params.opis;
  const brojbiraca = req.params.brojbiraca;
  try {
    const izbornaJedinica = await IzbornaJedinica.create({
      rednibrojizbjed: rednibrojizbjed,
      opis: opis,
      brojbirača: brojbiraca
    })
    res.json(izbornaJedinica);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIzbornaJedinica = async (req, res) => {
  const rednibrojizbjed = req.params.rednibrojizbjed;
  try {
    const izbornaJedinica = await IzbornaJedinica.destroy({
      where: {rednibrojizbjed: rednibrojizbjed}
    })
    res.json(izbornaJedinica);
  } catch (error) {
    res.status(500).json({ message: req.params });
  }
};