import { resolve } from 'path';

export const ENV = 'dev';

export const mysqlConfig = {
  url: 'mysql://localhost:3306/demo',
  username: 'root',
  password: 'root',
};

export const cacheConfig = {
  prefix: 'demo:',
};

export const logConfig = {
  path: resolve(__dirname, '../../logs/app.log'),
  level: 'warn',
};

export const jwtConfig = {
  secret: 'xxxx',
  maxAge: 7200000,
  allowList: [/^\/auth/, /^\/open/],
};

export const emailConfig = {
  noreplyPassword: '',
};

export const ossConfig = {
  endPoint: '',
  port: 9000,
  accessKey: 'root',
  secretKey: 'root',
  productBucket: 'test',
  domain: '',
};

export const weixinConfig = {
  corpId: '',
  agentId: '',
  redirectUri: '',
  corpSecret: '',
};
