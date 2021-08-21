import { get } from '@/utils/http';

export const getConfig = (code: string) => get(`/api/config/get/${code}`);
