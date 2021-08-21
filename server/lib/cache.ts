import NodeCache from 'node-cache';
import { cacheConfig } from '../config';
import logger from './logger';

const PREFIX = cacheConfig.prefix;

const nodeCache = new NodeCache();

const cache = {
  get(key: string): any {
    const data = nodeCache.get(PREFIX + key) as string;
    logger.debug(`cache get key=${key}, value=${data}`);
    return data ? JSON.parse(data) : null;
  },
  /**
   *
   *
   * @param {*} key
   * @param {*} value
   * @param {*} ttl 失效时间 秒
   * @return {*}
   */
  set(key: string, value?: any, ttl?: number): boolean {
    value = JSON.stringify(value);
    logger.debug(`cache set key=${key}, value=${value}, ttl=${ttl}`);
    return nodeCache.set(PREFIX + key, value, ttl || -1);
  },
  del(key: string): number {
    logger.debug(`cache del key=${key}`);
    return nodeCache.del(PREFIX + key);
  },
};

export default cache;
