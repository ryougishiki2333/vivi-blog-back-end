import { STRING } from "sequelize"

const tagModelFunc = (sequelize:any) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: STRING
    }
  });

  return Tag;
};

export default tagModelFunc