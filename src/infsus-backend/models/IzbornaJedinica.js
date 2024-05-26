const { DataTypes } = require('sequelize');
const sequelize = require('../config/testdb');

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


module.exports = IzbornaJedinica;