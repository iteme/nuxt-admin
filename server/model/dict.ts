import { DataTypes, Model, Op } from 'sequelize';
import { getOffset } from '../util/page';
import db from '../lib/mysql';
import cache from '../lib/cache';

const DICT_SUFFIX = 'db:dict:';

interface DictModel extends Model {
  id: number;
  parent: string;
  code: string;
  nameCn: string;
  nameEn: string;
}

export interface DictQuery extends DictModel, BasePageQuery {}

const Dict = db.define<DictModel>('demo_dict', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
  parent: DataTypes.STRING(32),
  code: DataTypes.STRING(32),
  nameCn: DataTypes.STRING(64),
  nameEn: DataTypes.STRING(64),
  createTime: DataTypes.DATE,
  updateTime: DataTypes.DATE,
});

function buildQuery(query: DictQuery) {
  const where = {} as any;
  if (!query) {
    return where;
  }
  if (query.parent) {
    where.parent = query.parent;
  }
  return where;
}

async function queryAll(parent: string) {
  const cacheKey = DICT_SUFFIX + parent;
  const value = cache.get(cacheKey);
  if (value) {
    return value;
  }
  const result = await Dict.findAll({
    attributes: {
      exclude: ['createTime', 'updateTime'],
    },
    where: { parent },
    order: [['id', 'asc']],
  });
  cache.set(cacheKey, result);
  return result;
}

const dict = {
  ROOT: 'ROOT',
  /**
   * 分页查询
   */
  async listAndCount(query: DictQuery): Promise<{ rows: DictModel[]; count: number }> {
    const offset = getOffset(query);
    return await Dict.findAndCountAll({
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
   * 根据父编码查询全部
   */
  async listAll(parent: string): Promise<DictModel[]> {
    return await queryAll(parent);
  },

  /**
   * 查询全部
   */
  async listAllChild(): Promise<DictModel[]> {
    return await Dict.findAll({
      attributes: {
        exclude: ['createTime', 'updateTime'],
      },
      where: { parent: { [Op.ne]: dict.ROOT } },
      order: [['id', 'asc']],
    });
  },

  /**
   * 新增记录
   */
  async add(data: DictModel): Promise<DictModel> {
    const parent = data.parent || dict.ROOT;
    const result = await Dict.create({
      parent,
      code: data.code,
      nameCn: data.nameCn,
      nameEn: data.nameEn,
    });
    if (result) {
      cache.del(DICT_SUFFIX + parent);
    }
    return result;
  },
};

export default dict;
