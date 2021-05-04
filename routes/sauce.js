const express = require('express');
const router = express.Router();



const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* Routes */
//CRUD
// post sauce et enregistrement des sauces dans la bdd 'Create'
router.post('/', auth, multer, sauceCtrl.createSauce);
 
 // modification sauce 'update'
 router.put('/:id', auth, multer, sauceCtrl.modifySauce);
 
 // supprimer une sauce 'delete'
 router.delete('/:id', auth, sauceCtrl.deleteSauce);
 
 // récuperer les données de la sauce. 'Read'
 router.get('/:id', auth, sauceCtrl.getOneSauce);
 
 // route all sauces
 router.get('/', auth, sauceCtrl.getAllSauces);

 module.exports = router;