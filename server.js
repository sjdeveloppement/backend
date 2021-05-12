const http = require('http'); //import du package http, pour https cela requiert un certificat SSL service payant lors d'un achat de nom de domaine
const app = require('./app'); //import de app pour l'utiliser sur le serveur
// renvoi du port valide selon environnement
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// ajout du port de connection ou du écoute du port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// constante pour les appels serveur
const server = http.createServer(app);
//gestion des évent, lance le serveur et affiche le port ou gère l'erreur
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
// écoute du serveur définit
server.listen(port);
