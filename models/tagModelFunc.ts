import { STRING, INTEGER, BLOB } from "sequelize"

const tagModelFunc = (sequelize:any) => {
  const Tag = sequelize.define("Article", {
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

  return Tag;
};

export default tagModelFunc