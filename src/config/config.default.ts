import { MidwayConfig } from '@midwayjs/core';
import path = require('node:path');
// import { CasbinRule, createAdapter } from '@midwayjs/casbin-typeorm-adapter';

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
      // casbin: {
      //   type: 'sqlite',
      //   synchronize: true,
      //   database: path.join(__dirname, '../../test.sqlite'),
      //   entities: [CasbinRule],
      // },
    },
  },
  validate: {
    validationOptions: {
      stripUnknown: true,
    },
  },
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
      },
    },
  },
  casbin: {
    modelPath: path.join(__dirname, '../auth/basic_model.conf'),
    policyAdapter: path.join(__dirname, '../auth/basic_policy.csv'),
    // policyAdapter: createAdapter({ dataSourceName: 'casbin' }),
    usernameFromContext: ctx => 'root', // 超级用户
  },
  redis: {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      db: 0,
    },
  },
  codeDye: {
    matchQueryKey: 'codeDye',
  },
} as MidwayConfig;
