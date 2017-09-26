'use strict';

const logger = require('@hbc-tech/arcade-app').log; // eslint-disable-line
const chalk = require('chalk');
const pkg = require('./package.json');

const log = logger.root.getLogger(pkg.name);

module.exports = class Server {
  constructor() {
    const Koa = require('koa');
    const koaLogger = require('koa-logger');
    const Router = require('koa-router');
    const port = 8090;

    const app = new Koa();
    const router = new Router();

    app.use(koaLogger());

    // attach router convenience methods to the app
    for (const fn of ['get', 'put', 'post', 'patch', 'delete', 'del', 'url']) {
      this[fn] = router[fn].bind(router);
    }

    this.app = app;
    this.port = port;
    this.router = router;
  }

  static get log() {
    return log;
  }

  start() {
    this.app
      .use(this.router.routes())
      .use(this.router.allowedMethods());

    this.app.listen(this.port);

    log.info(chalk`{green ☉}  listening on port {green ${this.port}}`);
  }
};
