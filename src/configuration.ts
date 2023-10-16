import { Configuration, App } from '@midwayjs/core';
import { join } from 'path';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';
import * as orm from '@midwayjs/typeorm';
import * as view from '@midwayjs/view-nunjucks';
import * as captcha from '@midwayjs/captcha';
import * as staticFile from '@midwayjs/static-file';
import * as ws from '@midwayjs/ws';
import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import { FormatMiddleware } from './middleware/FormatMiddleware';

@Configuration({
  imports: [
    koa,
    validate,
    jwt,
    passport,
    orm,
    view,
    captcha,
    staticFile,
    ws,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([
      ReportMiddleware,
      JwtPassportMiddleware,
      FormatMiddleware,
    ]);
    // add filter
    this.app.useFilter([DefaultErrorFilter]);
  }
}
