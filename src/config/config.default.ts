import { MidwayConfig } from '@midwayjs/core';

export default {
  koa: {
    // use for cookie sign key, should change to your own and keep security
    keys: ['1696900682149_1457'],
    port: 7001,
    globalPrefix: 'api',
  },

  midwayLogger: {},

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
        type: 'mysql',
        username: 'root',
        password: 'ly123',
        database: 'midway',
        host: '127.0.0.1',
        port: 3306,
        // synchronize: true,
        // dropSchema: true,
        logging: true,
        timezone: '+08:00',
        entities: ['**/entity/*.entity{.ts,.js}'],
        migrations: ['**/migration/*.ts'],
      },
    },
  },
} as MidwayConfig;
