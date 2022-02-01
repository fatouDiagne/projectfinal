const { DataTypes } = require("sequelize");
const etudiant = require("./etudiant");
const db = require("../config/db");

module.exports = prof;

function prof(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        /*idEtu: {
            type: DataTypes.INTEGER,allowNull:false, references: {
                model: db.Etudiant,
            key: 'idEtu'}
        }*/
    };
    /*const options = {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withHash: { attributes: {}, }
        }
   
    };*/
    return sequelize.define('Prof',attributes);
}