const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');// import du controller
const authenticationLimiter = require('../middleware/authentificationLimiter');// securiser le nombre de connexion contre le brut force.

router.post('/signup', userCtrl.signup);
router.post('/login', authenticationLimiter, userCtrl.login);

module.exports= router;