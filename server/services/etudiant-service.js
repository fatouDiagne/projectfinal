//const dbConn = require('../models/etudiant.js');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const config = require('../config/dbConfig');
const jwt = require('jsonwebtoken');


module.exports = {
    getAllEtudiant,
    getById,
    createEtudiant,
    updateEtudiant,
    createUser,
    login
    //deleteEtudiant
};

async function createUser(params) {
    return await createLogin(params);
}

async function login(params) {
    return await verifiedLogin(params);
    //const user = await db.Prof.findOne({ where: { email: { params.email } }})
}

async function getAllEtudiant() {
    return await db.Etudiant.findAll();
}

async function getById(idEtu) {
    return await getEtudiant(idEtu);
}

async function createEtudiant(params) {
    const etudiant = new db.Etudiant(params);
    Object.assign(etudiant, params);
    await etudiant.save();
}

async function updateEtudiant(idEtu, params) {
    const etudiant = await getEtudiant(idEtu);

    Object.assign(etudiant, params);
    await etudiant.save();

}   
async function getEtudiant(idEtu) {
    const etudiant = await db.Etudiant.findByPk(idEtu)
    if (!etudiant) throw 'Etudiant not found';
        return etudiant;
}                           

async function createLogin(params) {
    if (await db.Prof.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already exist'
    }
    const user = new db.Prof(params);

    //user.password = await bcrypt.hash(params.password, 10);
    bcrypt.hash(params.password, 10, function (err, bcryptedPassword) {
        user.password = bcryptedPassword;
        user.save();
    })
    //await user.save();
}
async function verifiedLogin(params) {
    const user = await db.Prof.findOne({ where: { email: params.email } });
    const passwordhash = params.password;
    const result = '';
    //const password = 
    if (!user || !(await bcrypt.compare(passwordhash, user.password))) {
        
        throw 'password or email invalide'
    }

    
    else {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...(user.get()), token };
        
}
}

function  omitHash(user) {
    const { password, ...userwithoutHash } = user;
    return userwithoutHash;
}