import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export interface ArticleModel
  extends Model<
    InferAttributes<ArticleModel>,
    InferCreationAttributes<ArticleModel>
  > {
  id: CreationOptional<number>;
  title: string;
  content: string;
  articleState: string;
}

export interface TagModel
  extends Model<
    InferAttributes<TagModel>,
    InferCreationAttributes<TagModel>
  > {
  id: CreationOptional<number>;
  name: string;

}
