import type { Context } from 'koa';

import Config from '../model/config';

const config = {
  async list(ctx: Context) {
    const { rows, count } = await Config.listAndCount(ctx.request.body as any);
    ctx.success({ items: rows, total: count });
  },
  async add(ctx: Context) {
    await Config.add(ctx.request.body as any);
    ctx.success();
  },
  async get(ctx: Context) {
    const config = await Config.getConfig(ctx.params.code);
    ctx.success(config);
  },
};

export default config;
