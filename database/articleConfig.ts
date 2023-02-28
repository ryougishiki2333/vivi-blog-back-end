
import { Sequelize, DataTypes } from "sequelize";

export default {
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
  }