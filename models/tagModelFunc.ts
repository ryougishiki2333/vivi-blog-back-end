import { Sequelize, INTEGER, STRING } from "sequelize"
import { TagModel } from "../types/dataType"

const tagModelFunc = (sequelize: Sequelize) => {
  const Tag = sequelize.define<TagModel>("Tag", {
    id: {
      primaryKey: true,
      type: INTEGER.UNSIGNED,
    },
    name: {
      type: STRING
    }
  });

  return Tag;
};

export default tagModelFunc