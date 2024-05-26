const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize("testDatabase", process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
});

module.exports = sequelize;