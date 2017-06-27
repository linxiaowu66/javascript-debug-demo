import { Server } from 'http'
import app from './services/express'
import apiRouter from './routes/'

apiRouter(app)

global.Promise = require('bluebird');

const server = new Server(app);

server.listen(3000, (err) => {
  if (err) {
    console.error(err.stack || err);
    process.exit(0);
  }
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', '127.0.0.1', 3000);
});


process.on('uncaughtException', (e) => {
  console.error(e.stack)
});
