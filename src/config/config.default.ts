import { MidwayConfig } from '@midwayjs/core';
import path = require('node:path');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1696900682149_1457',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
  passport: {
    session: false,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: path.join(__dirname, '../../test.sqlite'),
        synchronize: true,
        logging: true,
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
  validate: {
    validationOptions: {
      stripUnknown: true,
    },
  },
} as MidwayConfig;
