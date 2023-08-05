
import { Sequelize, DataTypes } from "sequelize";

export default {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    replyUserId:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    articleId:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }