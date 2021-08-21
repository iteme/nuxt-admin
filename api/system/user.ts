import { get, post } from '@/utils/http';
import { md5 } from '@/utils/crypto';
import { ListUserParams } from '@/types/model';

export const getUserInfo = () => get('/api/user/info');

export const listUser = (params: ListUserParams) => post('/api/user/list', params);

export const addUser = (params: any) => post('/api/user/add', params);

export const getUser = (id: number) => get(`/api/user/get/${id}`);

export const updateUser = (params: any) => post('/api/user/update', params);

export const deleteUser = (id: number) => get(`/api/user/delete/${id}`);

export const changeUserPassword = (params: any) =>
  post('/api/user/password', {
    password: md5(params.password),
    newPassword: md5(params.newPassword),
  });
