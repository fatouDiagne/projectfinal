const etudiantService = require('../services/etudiant-service');
const Joi = require('joi');
const authorization = require("../middleware/authorization.js");
module.exports = {

    createUser: (req, res, next) => {
        etudiantService.createUser(req.body)
            .then(() => res.json({ message: 'user create' }))
            .catch(next);
    },
    login: (req,res, next) => {
        etudiantService.login(req.body)
            .then((user) => res.json(user))
        .catch(next);
    },

    getAllEtudiant: function (req, res, next) {
        const headersAuth = req.headers["accesss_token"];
        if (!headersAuth)
            return res.status(400).json({ error: "Token invalide !" });
        else{
            etudiantService.getAllEtudiant()
                .then(etudiants => res.json(etudiants))
                .catch(next);
        }
        
    },
    getById: (req, res, next) => {
        etudiantService.getById(req.params.id)
            .then(etudiant => res.json(etudiant))
            .catch(next);
    },
    createEtudiant: function  (req, res, next) {
        const headersAuth = req.headers["accesss_token"];
        if (!headersAuth)
            return res.status(400).json({ error: "Token invalide !" });
        else {
           etudiantService.createEtudiant(req.body)
               .then(() => res.json({ message: 'Insertion note réussi' })
                            //console.log('ok')         
               )
                .catch(next);
        }
        
    },
    updateEtudiant: (req, res, next) => {
        const headersAuth = req.headers["accesss_token"];
        if (!headersAuth)
            return res.status(400).json({ error: "Token invalide !" });
        else {
        etudiantService.updateEtudiant(req.params.id, req.body)
            .then(() => res.json({ message: 'mis à jour réussi' }))
            .catch(next);
        }
    },

    // schema function

     createSchema: (req, res, next) => {
         const schema = Joi.object({
             firstName: Joi.string().required(),
             lastName: Joi.string().required(),
             dateNaissance: Joi.string().required(),
             note1: Joi.string(),
             note2: Joi.string(),
             moyenne: Joi.string(),
         });
         validateRequest(req, res, schema);
    },
    updateSchema: (req, res, next) => {
        const schema = Joi.object({
            firstName: Joi.string().empty(''),
            lastName: Joi.string().empty(''),
            dateNaissance: Joi.string().empty(''),
            note1: Joi.string().empty(''),
            note2: Joi.string().empty(''),
            moyenne: Joi.string().empty(''),
        });
        validateRequest(req, res, schema);
     }

    
}