const { DataTypes } = require('sequelize');
const sequelize = require('../config/testdb');
//const Zastupnik = require('./Zastupnik');

const IzbornaJedinica = sequelize.define('IzbornaJedinica', {
  rednibrojizbjed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  opis: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  brojbirača: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'izborna_jedinica',
  timestamps: false,
});

//IzbornaJedinica.hasMany(Zastupnik);

module.exports = IzbornaJedinica;