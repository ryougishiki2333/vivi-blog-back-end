import {
  Association,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  Model,
  ModelDefined,
  Optional,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";
export class Article extends Model<
  InferAttributes<Article>,
  InferCreationAttributes<Article>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare articleState: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getTags: BelongsToManyGetAssociationsMixin<Tag>;
  declare addTag: BelongsToManyAddAssociationMixin<Tag, number>;
  declare addTags: BelongsToManyAddAssociationsMixin<Tag, number>;
  declare setTags: BelongsToManySetAssociationsMixin<Tag, number>;
  declare removeTag: BelongsToManyRemoveAssociationMixin<Tag, number>;
  declare removeTags: BelongsToManyRemoveAssociationsMixin<Tag, number>;
  declare hasTag: BelongsToManyHasAssociationMixin<Tag, number>;
  declare hasTags: BelongsToManyHasAssociationsMixin<Tag, number>;
  declare countTags: BelongsToManyCountAssociationsMixin;

  declare tags?: NonAttribute<Tag[]>;

  declare static associations: {
    tags: Association<Article, Tag>;
  };
}

export class Tag
  extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {

  declare id: CreationOptional<number>;
  declare name: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getArticles: BelongsToManyGetAssociationsMixin<Article>;
  declare addArticle: BelongsToManyAddAssociationMixin<Article, number>;
  declare addArticles: BelongsToManyAddAssociationsMixin<Article, number>;
  declare setArticles: BelongsToManySetAssociationsMixin<Article, number>;
  declare removeArticle: BelongsToManyRemoveAssociationMixin<Article, number>;
  declare removeArticles: BelongsToManyRemoveAssociationsMixin<Article, number>;
  declare hasArticle: BelongsToManyHasAssociationMixin<Article, number>;
  declare hasArticles: BelongsToManyHasAssociationsMixin<Article, number>;
  declare countArticles: BelongsToManyCountAssociationsMixin;

  declare articles?: NonAttribute<Article[]>;

  declare static associations: {
    tags: Association<Tag, Article>;
  };
}
