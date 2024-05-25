const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VrstaPolitickeStranke = sequelize.define('VrstaPolitickeStranke', {
    oznakavrstepolitičkestranke: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    imevrstepolitičkestranke: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: "vrsta_politiČke_stranke",
    timestamps: false,
})

module.exports = VrstaPolitickeStranke;