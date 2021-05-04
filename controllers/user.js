const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
//  signup : cryptage du password, créer l'utilisateur avec le mdp crypté et le mail, puis l'enregistre dans la bdd
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
       const user = new User({
           email: req.body.email,
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
    User.findOne({ email: req.body.email })
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
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => status(500).json({ error }));
    })
    .catch(error => status(500).json({ error }));
};