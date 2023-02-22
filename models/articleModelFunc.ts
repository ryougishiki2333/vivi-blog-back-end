import { STRING, INTEGER, BLOB, Sequelize } from "sequelize";
import { ArticleModel } from "../types/dataType";

const articleModelFunc = (sequelize: Sequelize) => {
  const Article = sequelize.define<ArticleModel>("Article", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER.UNSIGNED,
    },
    title: {
      type: STRING,
    },
    content: {
      type: STRING,
    },
    articleState: {
      type: INTEGER,
    },
  });

  return Article;
};

export default articleModelFunc;
