var express = require("express");
var etudiantController = require("../controllers/etudiant-controller.js");

//const authorization = require('../middleware/authorization');

exports.router = (function () {
    var apiRouter = express.Router();

    apiRouter.route("/login").post(etudiantController.createUser);
    apiRouter.route("/log").post(etudiantController.login);
    apiRouter.route("/etudiant").post(etudiantController.createEtudiant);
    apiRouter.route("/etudiant").get(etudiantController.getAllEtudiant);
    apiRouter.route("/etudiant/:id").get(etudiantController.getById);
    apiRouter.route("/etudiant/:id").put(etudiantController.updateEtudiant);
    return apiRouter;
})();