import { get, post } from '@/utils/http';

export const childDict = (parent: string) => get(`/api/dict/child/${parent}`);
export const allDict = () => get('/api/dict/all');
export const listDict = (params: any) => post('/api/dict/list', params);
export const addDict = (params: any) => post('/api/dict/add', params);
