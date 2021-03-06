const jwt = require('jsonwebtoken');

module.exports = (req, res ,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId ){
            throw 'User ID non valable !';
        } else {
            next();
            //console.log(decodedToken.userId);
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};