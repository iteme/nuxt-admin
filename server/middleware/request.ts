import { Context, Next } from 'koa';
import { isUnless, getAuthUser, cancelToken } from '../util/jwt';
import User from '../model/user';
import logger from '../lib/logger';

export default async (ctx: Context, next: Next) => {
  ctx.success = function (result, msg) {
    ctx.type = 'json';
    ctx.body = {
      code: 200,
      msg: msg || 'success',
      result,
    };
  };

  ctx.fail = function (msg, code) {
    ctx.type = 'json';
    ctx.body = {
      code: code || 500,
      msg: msg || 'fail',
    };
    logger.debug(ctx.body);
  };

  if (!isUnless(ctx)) {
    const authUser = getAuthUser(ctx);
    if (!authUser || !authUser.userId) {
      cancelToken(ctx);
      ctx.fail('登陆信息已过期', 401);
      return;
    }
    const user = await User.getByUserId(authUser.userId);
    if (!user) {
      cancelToken(ctx);
      ctx.fail('用户信息不存在', 401);
      return;
    }
    ctx.authUser = { ...user, role: [] };
  }

  await next();
};
