import { DataTypes, Model, Op } from 'sequelize';
import db from '../lib/mysql';
import { getOffset } from '../util/page';

interface UserModel extends Model {
  id: number;
  userId: string;
  name: string;
  alias: string;
  mobile: string;
  email: string;
  avatar: string;
  role: string | string[];
  status: number;
}

export interface UserQuery extends UserModel, BasePageQuery {}

const User = db.define<UserModel>('demo_user', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
  userId: DataTypes.STRING(64),
  name: DataTypes.STRING(64),
  alias: DataTypes.STRING(32),
  mobile: DataTypes.STRING(20),
  email: DataTypes.STRING(64),
  avatar: DataTypes.STRING(255),
  role: DataTypes.STRING(64),
  status: DataTypes.TINYINT,
  createTime: DataTypes.DATE,
  updateTime: DataTypes.DATE,
});

const user = {
  /**
   * 分页查询
   */
  async listAndCount(query: UserQuery): Promise<{ rows: UserModel[]; count: number }> {
    const offset = getOffset(query);
    return await User.findAndCountAll({
      attributes: {
        exclude: ['createTime', 'updateTime'],
      },
      order: [['id', 'desc']],
      limit: query.pageSize,
      offset,
      raw: true,
    });
  },

  /**
   * 根据id获取
   */
  async getById(id: number): Promise<UserModel | null> {
    return await User.findOne({
      attributes: {
        exclude: ['createTime', 'updateTime'],
      },
      where: { id, status: true },
      raw: true,
    });
  },

  /**
   * 新增记录
   */
  async add(data: UserModel): Promise<UserModel> {
    return await User.create({
      userId: data.userId,
      name: data.name,
      alias: data.alias,
      mobile: data.mobile,
      email: data.email,
      avatar: data.avatar,
      status: data.status,
    });
  },

  /**
   * 修改记录
   */
  async update(data: UserModel): Promise<void> {
    await User.update(
      {
        name: data.name,
        alias: data.alias,
        mobile: data.mobile,
        email: data.email,
        avatar: data.avatar,
        status: data.status,
      },
      { where: { userId: data.userId } }
    );
  },

  /**
   * 根据userId获取
   */
  async getByUserId(userId: string): Promise<UserModel | null> {
    return await User.findOne({
      attributes: {
        exclude: ['createTime', 'updateTime'],
      },
      where: { userId },
      raw: true,
    });
  },

  /**
   * 根据ids获取
   */
  async getUserId2NameMapByUserIds(userIds: string[]): Promise<Map<string, string>> {
    const map = new Map<string, string>();
    if (!userIds || userIds.length === 0) {
      return map;
    }
    const users = await User.findAll({
      attributes: ['userId', 'name'],
      where: { userId: { [Op.in]: userIds } },
    });
    if (users && users.length > 0) {
      users.forEach((user) => map.set(user.userId, user.name));
    }
    return map;
  },
};

export default user;
