import type { Context, DefaultState } from 'koa';

import Router from '@koa/router';
import cache from '../lib/cache';
import auth from './auth';
import config from './config';
import dict from './dict';
import user from './user';

const router = new Router<DefaultState, Context>();

const OPEN_REQUEST_LIMIT_KEY = 'open_request_limit_';

router.use('/open', async (ctx, next) => {
  const key = OPEN_REQUEST_LIMIT_KEY + ctx.ip;
  const val = cache.get(key);
  if (val && val > 60) {
    ctx.fail('请稍后再试');
    return;
  }
  if (!val) {
    cache.set(key, 0, 60);
  } else {
    cache.set(key, val + 1, 60);
  }
  await next();
});

router.post('/auth/qrLogin', auth.qrLogin);
router.get('/auth/logout', auth.logout);
router.get('/auth/qrUrl', auth.qrUrl);

router.get('/user/info', user.info);
router.get('/user/get/:id', user.get);
router.post('/user/list', user.list);

router.post('/config/add', config.add);
router.post('/config/list', config.list);
router.get('/config/get/:code', config.get);

router.post('/dict/add', dict.add);
router.post('/dict/list', dict.list);
router.get('/dict/child/:parent', dict.child);
router.get('/dict/all', dict.all);

export default router;
