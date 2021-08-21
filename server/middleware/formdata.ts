import { Context, Next } from 'koa';
import { IncomingForm, Options } from 'formidable';

const option: Options = {
  multiples: true,
  keepExtensions: true,
};

export default async (ctx: Context, next: Next) => {
  if (ctx.is('multipart/form-data')) {
    const form = new IncomingForm(option);
    await new Promise<void>((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          ctx.request.body = fields;
          ctx.request.files = files;
          resolve();
        }
      });
    });
  }
  await next();
};
