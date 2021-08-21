import type { Context } from 'koa';
import Dict from '../model/dict';

const dict = {
  async list(ctx: Context) {
    const body = ctx.request.body as any;
    body.parent = Dict.ROOT;
    const { rows, count } = await Dict.listAndCount(body);
    ctx.success({ items: rows, total: count });
  },
  async add(ctx: Context) {
    await Dict.add(ctx.request.body as any);
    ctx.success();
  },
  async child(ctx: Context) {
    const items = await Dict.listAll(ctx.params.parent);
    ctx.success(items);
  },
  async all(ctx: Context) {
    const result = {} as any;
    const items = await Dict.listAllChild();
    items.forEach((item) => {
      result[item.parent] = result[item.parent] || [];
      result[item.parent].push(item);
    });
    ctx.success(result);
  },
};

export default dict;
