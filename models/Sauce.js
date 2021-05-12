const mongoose = require('mongoose');
const app = require('../app');

const sauceValidator = require('../middleware/sauceValidator');
const sauceSchema = mongoose.Schema({
    userId: { 
        type: String, required: true
    },
    name:{
        type: String, required: true, validate: sauceValidator.nameValidator
    },
    manufacturer:{
        type: String, required: true, validate: sauceValidator.manufacturerValidator
    },
    description:{
        type: String, required: true, validate: sauceValidator.descriptionValidator
    },
    mainPepper:{
        type: String, required: true, validate: sauceValidator.pepperValidator
    },
    heat:{
        type: Number, required: true
    },
    imageUrl:{
        type: String, required: true
    },
    likes:{
        type: Number, required: true
    },
    dislikes:{
        type: Number, required: true
    },
    usersLiked:{
        type: [String], required: true
    },
    usersDisliked:{
        type: [String], required: true
    }
});



module.exports = mongoose.model('Sauce', sauceSchema);
