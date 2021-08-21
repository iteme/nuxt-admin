import { Context, Next } from 'koa';
import logger from '../lib/logger';

export default async (ctx: Context, next: Next) => {
  const start = new Date().getTime();
  const param = JSON.stringify(ctx.request.body);
  await next();
  const ms = new Date().getTime() - start;

  const ignore = ctx.path.startsWith('/dict') || ctx.path.startsWith('/world');

  const remoteAddress =
    ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips || (ctx.socket && ctx.socket.remoteAddress);
  const logText = `${remoteAddress} ${ms}ms ${ctx.method} ${ctx.status} ${ctx.url} param=${param} ${
    ignore ? '' : 'result=' + JSON.stringify(ctx.body)
  }`;
  logger.info(logText);
};
