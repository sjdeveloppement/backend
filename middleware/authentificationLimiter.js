const rateLimit = require("express-rate-limit"); //import du package rate limiter

const authenticationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limite les requêtes d'authentification à 30 toutes les 15 minutes
  message:
    "Vous avez dépassé la limite autorisée de 30 requêtes, veuillez attendre 15 minutes",
});

module.exports = authenticationLimiter;