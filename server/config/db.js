const config = require('./dbConfig.js');
//const { connection } = require('mongoose');
const mysql = require("mysql2/promise");
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    //create db if not exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query('CREATE DATABASE IF NOT EXISTS \`${database}\`;');

    //connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' },{omitNull: true});

    //init models db
    db.Etudiant = require('../models/etudiant')(sequelize);
    db.Prof = require('../models/professeur')(sequelize);

    await sequelize.sync({ alter: true });
}