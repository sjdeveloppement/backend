// on utilise le package mongoose-validator afin de vérifier les entées de l'utilisateur lors de l'ajout des sauces avec du regex
const validate = require('mongoose-validator');

// validation du format du nom  de la sauce et de sa longueur
exports.nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3,40],
        message: 'Le nom de la sauce doit contenir entre 3 et 40 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: ' Le nom doit contenir des chiffres et des lettres seulement',
    }),
];
// validation du format du fabricant de la sauce et de sa longueur
exports.manufacturerValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 30], // Manufacturer doit contenir entre 3 et 40 caratères
        message: 'Le nom du fabricant doit contenir entre 3 et 30 caractères',
      }),
      validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i, // Regex pour restreindre le type de symboles pour le manufacturer
        message: 'Le nom doit contenir des chiffres et des lettres seulement',
      }),
];
//validation de la description
exports.descriptionValidator = [
    validate({
        validator: 'isLength',
        arguments: [10, 150],
        message: 'La description de la sauce doit contenir entre 10 et 150 caractères',
      }),
      validate({
        validator: 'matches',
        arguments: /^[a-zéèù\d\-_\s]+$/i, // Regex pour restreindre le type de symboles pour la description de la sauce
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour la description de la sauce",
      }),
];
exports.pepperValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 20], 
        message: 'Le principal ingrédient doit contenir entre 3 et 20 caractères',
      }),
      validate({
        validator: 'matches', 
        arguments: /^[a-zéèù\d\-_\s]+$/i,
        message: 'Vous ne pouvez utiliser que des chiffres et des lettres',
      }),
]
