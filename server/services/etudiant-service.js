//const dbConn = require('../models/etudiant.js');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const config = require('../config/dbConfig');
const jwt = require('jsonwebtoken');
/*module.exports = {

    prof: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        if (email === null, password === null)
            console.log("Donner les paramètres");
        {

        }
    },

    login: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        if (email==null && password==null) {
            console.log("donner les paramètres");
        }
        dbConn.query("select * from prof where email= ?", [email], (err, rows) => {
            try {
                if (!err) {
                    if (rows[0].password === password) {
                        console.log("connecxion réussit")
                    }
                    else
                        console.log("password invalide")
                }
            }
            catch (err) {
                console.log("email invalide")
            }
        })
    },

    etudiant: (req, res) => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const dateNaiss = req.body.dateNaissance;
        const note = req.body.note1;

        if (firstName===null, lastName===null,dateNaiss===null, note===null)
            console.log("donner les paramètre");
        {
            dbConn.query("insert into etudiant (firstName, lastName, dateNaissance, note1) values(?,?,?,?)", [firstName, lastName, dateNaiss, note], (err, rows) => {
                if (!err)
                    res.send("insertion réussit")
                else
                    console.log(err);
            })
        }
    },
    getAllEtudiant: (req, res) => {
        dbConn.query('select * from etudiant', (err, rows) => {
            if (!!err)
                console.log("suppression réussi");
            else
                console.log(err)
        })
    },
    updateEtudiant: async (req, res) => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const dateNaiss = req.body.dateNaissance;
        const note1 = req.body.note1;
        const note2 = req.body.note2;
        const moyenne = req.body.moyenne;
        //const id = req.params.id;

       await dbConn.query('update etudiant set firstName=?, lastName=?, dateNaissance=?, note1=?, note2=?, moyenne=? where idEtu=?',[firstName, lastName, dateNaiss, note1, note2, moyenne, req.params.id], (err, result) => {
            if (err)
                console.log(err);
           res.json({
                message: "Mis a jour effectué"
            });
        })
         
    }
}*/

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
        //function(err, res){
        /*if (res) {
            return'connexion réussi';
        }
        else {
            throw 'password invalide';
        }*/
        throw 'password or email invalide'
    }

    //});
    //return result
    else {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...(user.get()), token };
        //return 'connexion réussit';
}
}

function  omitHash(user) {
    const { password, ...userwithoutHash } = user;
    return userwithoutHash;
}