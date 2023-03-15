
import mysqlConfig from "./databaseConfig";
import { Sequelize, DataTypes } from "sequelize";
import articleConfig from "./articleConfig";
import tagConfig from "./tagConfig";
import { Article, Tag } from "../types/dataType";

const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.user,
  mysqlConfig.password,
  {
    host: mysqlConfig.host,
    dialect: "mysql",

    pool: {
      max: mysqlConfig.pool.max,
      min: mysqlConfig.pool.min,
      acquire: mysqlConfig.pool.acquire,
      idle: mysqlConfig.pool.idle,
    },
  }
);

Article.init(
  articleConfig,
  {
    sequelize,
    tableName: "articles",
  }
);

Tag.init(
  tagConfig,
  {
    sequelize,
    tableName: "tags",
  }
);

Article.belongsToMany(Tag, { through: "articleTag", as: "Tag" });
Tag.belongsToMany(Article, { through: "articleTag", as: "Article" });


sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


const mysqlObject = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  article: Article,
  tag: Tag,
};

export default mysqlObject;
