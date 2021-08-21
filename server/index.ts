import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import { jwtConfig } from './config';
import loggerMiddleware from './middleware/log4js';
import requestMiddleware from './middleware/request';
import formdataMiddleware from './middleware/formdata';
import router from './controller';

require('dotenv').config({ path: '../.env' });

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Accept, X-Requested-With, token'
  );
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  if (ctx.request.method.toLowerCase() === 'options') {
    ctx.body = 'ok';
  } else {
    await next();
  }
});

app.use(bodyParser());

app.use(formdataMiddleware);

app.use(helmet());
app.use(
  jwt({
    secret: jwtConfig.secret,
    getToken(ctx) {
      return ctx.header.token as string;
    },
  }).unless({
    path: jwtConfig.allowList,
  })
);
app.use(loggerMiddleware);
app.use(requestMiddleware);

app.use(router.routes()).use(router.allowedMethods());

export default app.callback();
