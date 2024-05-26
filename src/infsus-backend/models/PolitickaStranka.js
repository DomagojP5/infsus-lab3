const { DataTypes } = require('sequelize');
const sequelize = require('../config/testdb');
const VrstaPolitickeStranke = require('./VrstaPolitickeStranke');

const PolitickaStranka = sequelize.define('PolitickaStranka', {
    imepolitičkestranke: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
    },
    kratkiopisstranke: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    oznakavrstepolitičkestranke: {
        type: DataTypes.INTEGER,
        references: {
            model: VrstaPolitickeStranke,
            key: 'oznakavrstepolitičkestranke',
          },
    }
}, {
    tableName: "politiČka_stranka",
    timestamps: false,
})

module.exports = PolitickaStranka;