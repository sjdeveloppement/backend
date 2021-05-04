const Sauce = require('../models/Sauce');
// Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs');
//Logique métier
//'Create'
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then(() => res.status(201).json({
        message: 'Objet enregistré !'
    }))
    .catch(error => res.status(400).json({ error }));
    next();
 
 };
// 'Update' 
exports.modifySauce = (req, res, next) =>{
   // test si il y a une image ou pas traitement différent
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     } : { ...req.body };
   Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
   .then(() => res.status(200).json({ message: 'Objet modifié ! '}))
   .catch(error => res.status(400).json({ error }));
};
// 'Delete' // on recupère l'objet dasn la bdd, on extrait le nom du fichier à supp et on le supp avec fs.unlink,
// dans le callback on supp l'objet dans la base puis on renvoi la rep si cela à fonctionné ou pas.
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimé ! '}))
            .catch(error => res.status(400).json({ error }));

        });
    })
    .catch(error => res.status(400).json({ error }));
    
  };
// 'Read one'
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
    next();
};
// 'Read all'
exports.getAllSauces = (req, res)=>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    
    .catch(error => res.status(400).json({ error }));
    
};