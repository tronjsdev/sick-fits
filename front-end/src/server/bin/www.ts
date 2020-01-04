#!/usr/bin/env node

import https from 'http';
//import https from 'https';
import fs from 'fs';
import path from 'path';

import debug0 from 'debug';

import '../config/dotenv/load-dotenv';

import { appPromise } from '../app';

const debug = debug0('oauth2-server:server');

let server;

function normalizePort(val) {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

(async () => {
  const app = await appPromise();

  const port = normalizePort(process.env.PORT || '3001');
  app.set('port', port);

  server = https.createServer(
    {
      //key: fs.readFileSync(path.join(__dirname, '../certs/selfsigned.key')),
      //cert: fs.readFileSync(path.join(__dirname, '../certs/selfsigned.cert')),
    },
    app
  );

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    debug(`Listening on ${bind}`);
    console.log(`Listening on ${bind}`);
  }

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
})().catch(err => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});
