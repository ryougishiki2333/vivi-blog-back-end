import mysqlConfig from "./databaseConfig"
import { Sequelize, STRING, DataTypes } from "sequelize"
import { Article, Tag } from "../types/dataType";

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

Article.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    articleState:{
      type: DataTypes.INTEGER.UNSIGNED,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'articles'
  })

Tag.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'tags'
  })

Article.belongsToMany(Tag, { through: 'articleTag', as: 'Tag' });
Tag.belongsToMany(Article, { through: 'articleTag', as: 'Article' });

sequelize.sync({alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

await Tag.create({name:'23333'})

const mysqlObject = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  article: Article,
  tag: Tag
};

export default mysqlObject



