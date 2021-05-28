const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('../node_modules/maskdata'); //utilisation de maskdata pour masquer l'email 
const CryptoJS = require('crypto-js');

// option maskdata
const emailMask2Options={
    maskWith:"*",
    unmaskedStartCharactersBeforeAt: 2,
    unmaskedEndCharactersAfterAt: 3,
    maskAtTheRate: false
};

const User = require('../models/User');
// sécurisation du mdp via un schema restrictif lors de l'inscription
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
.is().min(8) // min 8 caractères
.has().digits(1) // min 1 chiffre
.has().uppercase(1) // min 1 caractère majuscule
.has().lowercase(1) // min 1 caractère minuscule
.has().symbols(1) // min 1 symbole
.has().not().spaces(); // ne doit pas contenir d'espace

//  signup : on regarde si le schema du mdp est respecté si ok -> cryptage du password, créer l'utilisateur avec le mdp crypté et le mail, puis l'enregistre dans la bdd
exports.signup = (req, res, next) => {
    if(!schema.validate(req.body.password)){
        res.status(401).json({message: "Mot de passe incomplet, il doit contenir au moins 8 caractères, un chiffre, une majuscule, une minuscule, un symbole et pas d'espace !"});
        return false;
    }
    bcrypt.hash(req.body.password, 10)
    // hash de l'email
    //bcrypt.hash(req.body.email, 10)
    // crypto js
    //const emailCryptoJs = cryptojs.HmacSHA512(req.body.email,`${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`).toString();
    .then(hash => {
       const user = new User({
           email: req.body.email,//hash //MaskData.maskEmail2(req.body.email, emailMask2Options), //email masked
           password: hash
       });
       user.save()
       .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
// fonction login : recupère l'utilisateur dans la base on regarde si il existe et on compare les identitifiants,  on regarde le hash dans la bdd si c'est bon on lui renvoi son UserId et un token
exports.login = (req, res , next) => {
    User.findOne({ email: req.body.email })/*MaskData.maskEmail2(req.body.email, emailMask2Options)*///bcrypt.compare(req.body.email, user.email)
    .then(user => {
        if (!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect !'});  
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: '24h' }
                ),
            });
        })
        .catch(error => status(500).json({ error }));
    })
    .catch(error => status(500).json({ error }));
};