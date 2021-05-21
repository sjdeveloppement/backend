const mongoose = require('mongoose');// plugin mongoose qui permet de standardiser les données outil de modélisation d'objets

const uniqueValidator = require('mongoose-unique-validator');// package qui valide l'unicité de l'email

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// ajout l'argument unique validator qui empeche un utilisateur de s'inscrire plusieur fois avec le même mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);