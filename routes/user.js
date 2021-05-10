const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authenticationLimiter = require('../middleware/authentificationLimiter');

router.post('/signup', userCtrl.signup);
router.post('/login', authenticationLimiter, userCtrl.login);

module.exports= router;