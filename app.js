const express = require('express');
const helmet = require('helmet'); //protection xss filtre les script intersites dans le navigateur web
const bodyParser = require('body-parser'); //extrait les objets JSON des requêtes POST
const mongoose = require('mongoose'); //plugin de connection pour Mongodb
const mongoSanitize = require('express-mongo-sanitize'); // import du plugin qui sert à contrer l'injection dans les champs utilisateurs
const path = require('path'); // accès aux chemins des fichiers

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();

mongoose.connect(process.env.DB_URI,
  { useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true })
    
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express();



// Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// utilisation de helmet pour sécuriser les cookies
app.use(helmet());

app.use(bodyParser.json());

// utilisation de sanitize pour proteger les champs des injections avec des . ou des $
app.use(mongoSanitize());

//gestion statique des ressources image dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes des sauces
app.use('/api/sauces', sauceRoutes);

//routes dediées aux users
app.use('/api/auth', userRoutes);
  
module.exports = app;