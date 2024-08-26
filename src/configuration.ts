import { Configuration, App } from '@midwayjs/core';
import { join } from 'path';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';
import * as orm from '@midwayjs/typeorm';

import { ReportMiddleware } from './middleware/report.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import { FormatMiddleware } from './middleware/format.middleware';

import { DefaultErrorFilter } from './filter/default.filter';
import { ValidateErrorFilter } from './filter/validate.filter';

@Configuration({
  imports: [koa, validate, jwt, passport, orm],
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
    this.app.useFilter([DefaultErrorFilter, ValidateErrorFilter]);
  }
}
