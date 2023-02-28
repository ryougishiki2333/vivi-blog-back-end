
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

// 测试代码
// const Foo = sequelize.define('Foo', { name: DataTypes.STRING });
// const Bar = sequelize.define('Bar', { name: DataTypes.STRING });
// Foo.belongsToMany(Bar, { through: 'FooBar' });
// Bar.belongsToMany(Foo, { through: 'FooBar' });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
    // 测试代码
    // (async () => {
    //   const foo = await Foo.create({ name: 'the-foo' });
    //   const bar1 = await Bar.create({ name: 'some-bar' });
    //   const bar2 = await Bar.create({ name: 'another-bar' });
    //   console.log(await foo.getBars(), 777777777); // null
    //   await foo.setBars(bar1);
    //   console.log((await foo.getBars()).name); // 'some-bar'
    //   await foo.createBar({ name: 'yet-another-bar' });
    //   const newlyAssociatedBar = await foo.getBars();
    //   console.log(newlyAssociatedBar.name); // 'yet-another-bar'
    //   await foo.setBars(null); // Un-associate
    //   console.log(await foo.getBars()); // null
    // })();
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
