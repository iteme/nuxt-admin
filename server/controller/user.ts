import type { Context } from 'koa';

import User from '../model/user';

const user = {
  /**
   * 获取用户基本信息
   *
   * @param {*} ctx
   * @param {*} next
   */
  async info(ctx: Context) {
    const user = await User.getByUserId(ctx.authUser.userId);
    if (user) {
      ctx.success(user);
    } else {
      ctx.fail('用户不存在');
    }
  },

  async list(ctx: Context) {
    const { rows, count } = await User.listAndCount(ctx.request.body as any);
    ctx.success({ items: rows, total: count });
  },

  async get(ctx: Context) {
    const id = ctx.params.id;
    const result = await User.getById(id);
    ctx.success(result);
  },
};

export default user;
