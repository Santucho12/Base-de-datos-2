const Server = require('./server');
const { connectDB } = require('./config/db');

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

connectDB();
const server = new Server();
server.listen();

console.log('Backend iniciado. Esperando conexiones...');
