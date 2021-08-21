import { post } from '@/utils/http';

export const uploadProduct = (file: any) => {
  const params = new FormData();
  params.append('file', file);
  return post(`/api/oss/upload/product`, params, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
