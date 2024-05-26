const PolitickaStranka = require('../models/PolitickaStranka');
const Zastupnik = require('../models/Zastupnik');

exports.getAllPolitickeStranke = async (req, res) => {
  try {
    const politickeStranke = await PolitickaStranka.findAll();
    if (!politickeStranke) {
      return res.status(404).json({ message: 'Political party not found' });
    }
    res.json(politickeStranke);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPolitickaStranka = async (req, res) => {
  const name = req.params.name;
  try {
    const politickaStranka = await PolitickaStranka.findByPk(name);
    if (!politickaStranka) {
      return res.status(404).json({ message: 'Political party not found' });
    }
    res.json(politickaStranka);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.putPolitickaStranka = async (req, res) => {
  const imepolitickestranke = req.params.imepolitickestranke;
  const kratkiopisstranke = req.params.kratkiopisstranke;
  const oznakavrstepolitickestranke = req.params.oznakavrstepolitickestranke;
  try {
    const politickaStranka = await PolitickaStranka.create({
      imepolitičkestranke: imepolitickestranke,
      kratkiopisstranke: kratkiopisstranke,
      oznakavrstepolitičkestranke:oznakavrstepolitickestranke
    })
    if (!politickaStranka) {
      return res.status(500).json();
    }
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

exports.updatePolitickaStranka = async (req, res) => {
  const { name } = req.params;
  const { novoIme, kratkiopisstranke, oznakavrstepolitičkestranke } = req.body;

  try {
    const novaStranka = await PolitickaStranka.findOne({ where: { imepolitičkestranke: name } });

    if (!novaStranka) {
      return res.status(404).json({ message: `Politicka stranka s imenom ${name} ne postoji.` });
    }

    await novaStranka.update({
      kratkiopisstranke: kratkiopisstranke,
      oznakavrstepolitičkestranke: oznakavrstepolitičkestranke,
    });

    const noviZastupnici = await Zastupnik.findAll({ where: { imepolitičkestranke: novoIme } });
    await Promise.all(
      noviZastupnici.map(async (zastupnik) => {
        zastupnik.imepolitičkestranke = novoIme;
        await zastupnik.save();
      })
    );

    res.json({ stranka: novaStranka, zastupnici: noviZastupnici });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};