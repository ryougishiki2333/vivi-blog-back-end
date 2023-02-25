// @ts-nocheck

import mysqlConfig from "./databaseConfig";
import { Sequelize, STRING, DataTypes } from "sequelize";
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
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    articleState: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "articles",
  }
);

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "tags",
  }
);

Article.belongsToMany(Tag, { through: "articleTag", as: "Tag" });
Tag.belongsToMany(Article, { through: "articleTag", as: "Article" });


const Foo = sequelize.define('Foo', { name: DataTypes.STRING });
const Bar = sequelize.define('Bar', { name: DataTypes.STRING });
Foo.belongsToMany(Bar, { through: 'FooBar' });
Bar.belongsToMany(Foo, { through: 'FooBar' });

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

(async () => {
  const foo = await Foo.create({ name: 'the-foo' });
  const bar1 = await Bar.create({ name: 'some-bar' });
  const bar2 = await Bar.create({ name: 'another-bar' });
  console.log(await foo.getBar()); // null
  await foo.setBar(bar1);
  console.log((await foo.getBar()).name); // 'some-bar'
  await foo.createBar({ name: 'yet-another-bar' });
  const newlyAssociatedBar = await foo.getBar();
  console.log(newlyAssociatedBar.name); // 'yet-another-bar'
  await foo.setBar(null); // Un-associate
  console.log(await foo.getBar()); // null
})();






const mysqlObject = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  article: Article,
  tag: Tag,
};

export default mysqlObject;
