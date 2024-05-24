const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const IzbornaJedinica = require('./IzbornaJedinica');
const PolitickaStranka = require('./PolitickaStranka');

const Zastupnik = sequelize.define('Zastupnik', {
  idzastupnika: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  imezastupnika: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  godinezastupnika: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spolzastupnika: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  rednibrojizbjed: {
    type: DataTypes.INTEGER,
    references: {
      model: IzbornaJedinica,
      key: 'redniBrojIzbJed',
    },
  },
  imepolitičkestranke: {
    type: DataTypes.STRING(100),
    references: {
      model: PolitickaStranka,
      key: 'imePolitičkeStranke',
    },
  },
}, {
  tableName: 'zastupnik',
  timestamps: false,
});

//Zastupnik.belongsTo(IzbornaJedinica, { foreignKey: 'rednibrojizbjed' });
//IzbornaJedinica.hasMany(Zastupnik);
//Zastupnik.belongsTo(PolitickaStranka, { foreignKey: 'imepolitičkestranke' });
//PolitickaStranka.hasMany(Zastupnik);

module.exports = Zastupnik;