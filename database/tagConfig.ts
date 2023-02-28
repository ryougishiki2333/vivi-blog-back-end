
import { Sequelize, DataTypes } from "sequelize";

export default {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }