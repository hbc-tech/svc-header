'use strict';

const Arcade = require('@hbc-tech/arcade-app');
const Transport = require('@hbc-tech/arcade-app/lib/transport');
const chalk = require('chalk');
const pkg = require('./package.json');

const log = Arcade.log.root.getLogger(pkg.name);

module.exports = class Server {
  constructor() {
    const Koa = require('koa');
    const koaLogger = require('koa-logger');
    const Router = require('koa-router');
    const port = this.port = 8080;

    const app = this.app = new Koa();
    const router = new Router();

    app.use(koaLogger());

    // attach router convenience methods to the app
    for (const fn of ['get', 'put', 'post', 'patch', 'delete', 'del', 'url']) {
      this[fn] = router[fn].bind(router);
    }

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
