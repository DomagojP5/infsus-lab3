const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
//const Zastupnik = require('./Zastupnik');

const PolitickaStranka = sequelize.define('PolitickaStranka', {
    imepolitičkestranke: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
    },
    kratkiopisstranke: {
        type: DataTypes.STRING(200),
        allowNull: false,
    }
}, {
    tableName: "politiČka_stranka",
    timestamps: false,
})

//PolitickaStranka.hasMany(Zastupnik);

module.exports = PolitickaStranka;