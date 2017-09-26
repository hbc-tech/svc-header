'use strict';

const fs = require('fs');
const path = require('path');
const Server = require('./server');
const pkg = require('./package.json');

const log = Server.log;
const server = new Server();

log.setLevel('trace');

function v (route) {
  const result = path.posix.join('/', pkg.version, '/', route);
  log.info('adding route', result);
  return result;
}

server.get(v('/header'), (ctx) => {
  ctx.body = fs.readFileSync(path.resolve('./fixtures/header.json'), 'utf-8');
});

server.start();
