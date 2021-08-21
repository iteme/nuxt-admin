import { DataTypes, Model } from 'sequelize';

import { getOffset } from '../util/page';
import db from '../lib/mysql';
import cache from '../lib/cache';

const DICT_SUFFIX = 'db:config:';

interface ConfigModel extends Model {
  id: number;
  code: string;
  config: string;
}

export interface ConfigQuery extends ConfigModel, BasePageQuery {}

const Config = db.define<ConfigModel>('demo_config', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
  code: DataTypes.STRING(32),
  config: DataTypes.STRING(3000),
  createTime: DataTypes.DATE,
  updateTime: DataTypes.DATE,
});

function buildQuery(query?: ConfigQuery) {
  const where = {} as any;
  if (!query) {
    return where;
  }
  if (query.code) {
    where.code = query.code;
  }
  return where;
}

const dict = {
  /**
   * 分页查询
   */
  async listAndCount(query: ConfigQuery): Promise<{ rows: ConfigModel[]; count: number }> {
    const offset = getOffset(query);
    return await Config.findAndCountAll({
      attributes: {
        exclude: ['createTime', 'updateTime'],
      },
      where: buildQuery(query),
      order: [['id', 'desc']],
      limit: query.pageSize,
      offset,
    });
  },

  /**
   * 根据code获取
   */
  async getConfig(code: string): Promise<any> {
    const cacheKey = DICT_SUFFIX + code;
    const value = cache.get(cacheKey);
    if (value) {
      return value;
    }
    const result = await Config.findOne({
      attributes: {
        exclude: ['createTime', 'updateTime'],
      },
      where: { code },
      order: [['id', 'asc']],
    });
    if (result) {
      const config = JSON.parse(result.config);
      cache.set(cacheKey, config);
      return config;
    }
  },

  /**
   * 新增记录
   */
  async add(data: ConfigModel): Promise<ConfigModel> {
    const result = await Config.create({
      code: data.code,
      config: data.config,
    });
    if (result) {
      cache.del(DICT_SUFFIX + parent);
    }
    return result;
  },
};

export default dict;
