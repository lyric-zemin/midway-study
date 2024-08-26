import { MidwayConfig } from '@midwayjs/core';
import path = require('node:path');

export default {
  koa: {
    // use for cookie sign key, should change to your own and keep security
    keys: ['1696900682149_1457'],
    port: 7001,
    globalPrefix: 'api',
  },

  validate: {
    validationOptions: {
      stripUnknown: true,
    },
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
} as MidwayConfig;
