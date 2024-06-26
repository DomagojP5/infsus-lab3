const { DataTypes } = require('sequelize');
const sequelize = require('../config/testdb');
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
    allowNull: false,
    references: {
      model: IzbornaJedinica,
      key: 'rednibrojizbjed',
    },
  },
  imepolitičkestranke: {
    type: DataTypes.STRING(100),
    references: {
      model: PolitickaStranka,
      key: 'imepolitičkestranke',
    },
  },
}, {
  tableName: 'zastupnik',
  timestamps: false,
});

module.exports = Zastupnik;