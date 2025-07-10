const Server = require('./server');
const { connectDB } = require('./config/db');

connectDB();
const server = new Server();
server.listen();
