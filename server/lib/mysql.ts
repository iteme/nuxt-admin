import { Sequelize } from 'sequelize';
import { mysqlConfig } from '../config';
import logger from './logger';

const db = new Sequelize(mysqlConfig.url, {
  dialect: 'mysql',
  username: mysqlConfig.username,
  password: mysqlConfig.password,
  logging: (msg: string) => logger.debug(msg),
  pool: {
    max: 30,
    idle: 10000,
  },
  define: {
    // 驼峰转换
    underscored: true,
    freezeTableName: true,
    // 开启createAt和updateAt
    timestamps: false,
    charset: 'utf8mb4',

    hooks: {
      beforeCreate: (instance: any) => {
        const timestamp = Math.floor(Date.now() / 1000);
        instance.createTime = timestamp;
        instance.updateTime = timestamp;
      },
      beforeUpdate: (instance: any) => {
        instance.updateTime = Math.floor(Date.now() / 1000);
      },
      beforeBulkUpdate: (instance: any) => {
        instance.fields.push('updateTime');
        instance.attributes.updateTime = Math.floor(Date.now() / 1000);
      },
      beforeBulkCreate: (instances: any[]) => {
        const timestamp = Math.floor(Date.now() / 1000);
        instances.forEach((instance: any) => {
          instance.createTime = timestamp;
          instance.updateTime = timestamp;
        });
      },
    },
  },
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
});

db.authenticate()
  .then(() => {
    logger.info('数据库连接成功!');
  })
  .catch((err: any) => {
    logger.error('数据库连接出错:', err);
  });

export default db;
