
import mysqlConfig from "./databaseConfig";
import { Sequelize, DataTypes } from "sequelize";
import articleConfig from "./articleConfig";
import tagConfig from "./tagConfig";
import userConfig from "./userConfig"
import replyConfig from "./replyConfig";
import { Article, Reply, Tag, User } from "../types/dataType";

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

User.init(
  userConfig,
  {
    sequelize,
    tableName: "users",
  }
);

Reply.init(
  replyConfig,
  {
    sequelize,
    tableName: "replys",
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
  user: User,
  reply: Reply
};

export default mysqlObject;
