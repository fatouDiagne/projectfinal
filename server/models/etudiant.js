/*const mysql = require("mysql");
const dbConfig = require('../config/dbConfig.js');

const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

conn.connect(err => {
    if (err) throw er
    console.log("Successfully connected to database");
});

module.exports = conn*/

const { DataTypes } = require("sequelize");
module.exports = etudiant;

/*module.exports = (sequelize) => {
    class Etudiant extends Model {
        static associate(db) {
            Etudiant.belongsTo(db.Prof, {
                foreignKey: {
                    allowNull: false
                }
            })
        }
    }
    Etudiant.init({
        firstName:  DataTypes.STRING, allowNull: false,
        lastName:  DataTypes.STRING, allowNull: false,
        dateNaissance:  DataTypes.STRING, allowNull: false,
        note1:  DataTypes.FLOAT, allowNull: true,
        note2:  DataTypes.FLOAT, allowNull: true,
        moyenne:  DataTypes.FLOAT, allowNull: true,
        
    }, {
        sequelize,
        modelName: 'Etudiant',
    });
    return Etudiant;
};*/

function etudiant(sequelize) {
    const attributes = {
        idEtu: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING, allowNull: false
        },
        lastName: {
            type: DataTypes.STRING, allowNull: false
        },
        dateNaissance: {
            type: DataTypes.STRING, allowNull: false
        },
        note1: {
            type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0
        },
        note2: {
            type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0
        },
        moyenne: {
            type: DataTypes.DOUBLE, allowNull: true
        }
    };
    

    return sequelize.define('Etudiant',attributes);
}