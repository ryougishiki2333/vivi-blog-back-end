import mysqlConfig from "./databaseConfig"
import { Sequelize } from "sequelize"
import articleModelFunc from "../models/articleModelFunc"
import tagModelFunc from "../models/tagModelFunc"

const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  dialect: 'mysql',

  pool: {
    max: mysqlConfig.pool.max,
    min: mysqlConfig.pool.min,
    acquire: mysqlConfig.pool.acquire,
    idle: mysqlConfig.pool.idle
  }
});

const article = articleModelFunc(sequelize)
const tag = tagModelFunc(sequelize)
article.belongsToMany(tag, { through: 'articleTag' });
tag.belongsToMany(article, { through: 'articleTag' });

const mysqlObject = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  article: article,
  tag: tag
};

export default mysqlObject



