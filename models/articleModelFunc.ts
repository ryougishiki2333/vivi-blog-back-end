import { STRING, INTEGER, BLOB } from "sequelize"

const articleModelFunc = (sequelize:any) => {
  const Article = sequelize.define("Article", {
    title: {
      type: STRING
    },
    content: {
      type: STRING
    },
    articleState: {
      type: INTEGER
    }
  });

  return Article;
};

export default articleModelFunc