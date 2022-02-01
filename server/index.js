const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const apiRouter = require('./routes/apiRouter').router;
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(function (req, res, next) {
    //accés
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,PATCH,DELETE,PUT,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});



app.get('/', function (req,res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon server</h1>');
});

app.use('/', apiRouter);
app.listen(8080, (err) => {
    if (!err)
        console.log('le serveur écoute sur le port 8080');
    else
        console.log('erreur');
})
console.log(process.env.database);