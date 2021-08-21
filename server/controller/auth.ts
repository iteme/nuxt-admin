import type { Context } from 'koa';

import { ENV } from '../config';
import User from '../model/user';
import { signToken, cancelToken } from '../util/jwt';
import { getQrUrl, getUserId, getUser } from '../api/weixin';
import logger from '../lib/logger';
import { isAccessStatus } from '../enum/user';

const auth = {
  /**
   * 用户登出
   *
   * @param {*} ctx
   */
  logout(ctx: Context) {
    cancelToken(ctx);
    ctx.success();
  },

  /**
   * 获取扫码登录链接
   *
   * @param {*} ctx
   */
  qrUrl(ctx: Context) {
    ctx.success(getQrUrl());
  },

  /**
   * 扫码登录
   *
   * @param {*} ctx
   */
  async qrLogin(ctx: Context) {
    const body = ctx.request.body as any;

    let userId;
    if (ENV !== 'dev') {
      userId = await getUserId(body.code);
      if (!userId) {
        ctx.fail('无权访问');
        return;
      }
    } else {
      userId = body.code;
    }
    // const user = await getUser(userId);
    const user = await User.getByUserId(userId);
    if (user) {
      // const existUser = await User.getByUserId(userId);
      // if (existUser) {
      //   await User.update(user as any);
      // } else {
      //   await User.add(user as any);
      // }

      if (isAccessStatus(user.status)) {
        // 生成token
        const token = signToken(ctx, { userId: user.userId });
        ctx.success(token);
        logger.debug(`login userId=${user.userId}`);
      }
    }
  },
};

export default auth;
