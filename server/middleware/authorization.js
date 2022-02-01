const jwt = require('express-jwt');
const { secret } = require('../config/dbConfig');
const db = require('../config/db');

module.exports = {

authorization:function authorization(req, res, next) {
    /*return [
        jwt({ secret, algorithms: ['HS256'] }),

        async (req, res, next) => {
            const user = await db.Prof.findByPk(req.user.sub);

            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });
            else {
                req.user = user.get();
                next;
            }
        }
    ]*/
    try {
        const token = req.headers["access_token"];
        //const user = await db.Prof.findByPk(req.user.sub);
        if (!token) {
            res.status(401).json('Invalid user id');
        }
        else {
            
            var jwtToken = jwt.verify(token, secret);
            if (jwtToken)
                //return jwtToken.id;
                return 'ok'
            next();
        }
    }
    catch {
        res.status(401).json({
            error: new Error('Invalid request!')
          });
    }
}
}