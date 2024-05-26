const IzbornaJedinica = require('../models/IzbornaJedinica');

exports.getAllIzborneJedinice = async (req, res) => {
  try {
    const izbornaJedinica = await IzbornaJedinica.findAll();
    if (!izbornaJedinica) {
      return res.status(404).json();
  }
    res.json(izbornaJedinica);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIzbornaJedinica = async (req, res) => {
  const id = req.params.id
  try {
    const izbornaJedinica = await IzbornaJedinica.findByPk(id);
    if (!izbornaJedinica) {
      return res.status(404).json();
    }
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

exports.updateIzbornaJedinica = async (req, res) => {

  try {
    const { rednibrojizbjed, opis, brojbirača} = req.body;
    const izbornaJedinica = await IzbornaJedinica.findByPk(rednibrojizbjed);
    if (!izbornaJedinica) {
      return res.status(404).json({ message: 'Izborna jedinica not found' });
    }

    izbornaJedinica.rednibrojizbjed = rednibrojizbjed;
    izbornaJedinica.opis = opis;
    izbornaJedinica.brojbirača = brojbirača;

    await izbornaJedinica.save();
    res.status(200).json(izbornaJedinica);
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
    if (!izbornaJedinica) return res.status(404).json({});
    return res.json(izbornaJedinica);
  } catch (error) {
    res.status(500).json({ message: req.params });
  }
};