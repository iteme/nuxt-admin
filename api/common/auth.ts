import { get, post } from '@/utils/http';

import { md5 } from '@/utils/crypto';
import { AuthLoginParam, AuthQrLoginParam } from '@/types/model';

export const authLogin = (params: AuthLoginParam) =>
  post('/api/auth/login', {
    ...params,
    password: md5(params.password).toString(),
  });

export const authQrLogin = (params: AuthQrLoginParam) =>
  post('/api/auth/qrLogin', {
    ...params,
  });

export const authLogout = () => get('/api/auth/logout');

export const getQrUrl = () => get('/api/auth/qrUrl');
