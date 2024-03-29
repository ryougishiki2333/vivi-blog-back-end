import mysqlObject from "../database/mysql";
import { Op } from "sequelize";
import { Request, response, Response } from "express";
const Article = mysqlObject.article;
const Tag = mysqlObject.tag;

const articleCreate = async (req: Request, res: Response) => {
  if (
    !req.body.title ||
    !req.body.content ||
    !req.body.synopsis
  ) {
    res.status(400).send({
      message: "Article items can not be empty!",
    });
    return;
  }
  const article = {
    title: req.body.title,
    content: req.body.content,
    articleState: 1,
    synopsis: req.body.synopsis,
  };
  const tag = req.body.tag;
  try {
    const newArticle = await Article.create(article);
    if (tag && tag.length > 0) {
      const newArticleInSQL = await Article.findByPk(newArticle.id, {
        include: "tag",
      });
      const tagId = tag.map((tagItem)=>{return tagItem.id})
      const condition = { id: { [Op.or]: tagId } };
      const tagInSQL = await Tag.findAll({where: condition});
      await newArticleInSQL.setTag(tagInSQL);
      const newArticleInSQLAgain = await Article.findByPk(newArticle.id, {
        include: "tag",
      });
      res.send(newArticleInSQLAgain);
    } else {
      res.send(newArticle);
    }
  } catch (err) {
    console.log(err);
    
    res.status(500).send({
      message: err.message || "Some error occurred while creating the article.",
    });
  }
};

const articleFindAll = (req: Request, res: Response) => {
  let condition = {};
  if (req.query) {
    condition = { ...req.query };
  }
  Article.findAll({ include: { model: Tag, as: "tag" }, where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};

const articleFindOne = (req: Request, res: Response) => {
  const id = req.params.id;
  Article.findByPk(id, { include: "Tag" })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find article with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving article with id=" + id + ".",
      });
    });
};

const articleUpdate = async (req: Request, res: Response) => {
  if (
    !req.body.title ||
    !req.body.content ||
    !req.body.synopsis
  ) {
    res.status(400).send({
      message: "Article items can not be empty!",
    });
    return;
  }
  const id = req.query.id as string;
  const article = {
    title: req.body.title,
    content: req.body.content,
    articleState: 1,
    synopsis: req.body.synopsis
  };
  const tag = req.body.tag;
  try {
    const articleUpdateAfter = await Article.update(article, {
      where: { id: parseInt(id) },
    });
    if (tag && tag.length > 0) {
      const newArticleInSQL = await Article.findByPk(parseInt(id), {
        include: "tag",
      });
      const tagId = tag.map((tagItem)=>{return tagItem.id})
      const condition = { id: { [Op.or]: tagId } };
      const tagInSQL = await Tag.findAll({where: condition});
      await newArticleInSQL.setTag(tagInSQL);
      const newArticleInSQLAgain = await Article.findByPk(parseInt(id), {
        include: "tag",
      });
      res.send(newArticleInSQLAgain);
    } else {
      res.send(articleUpdateAfter);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating article with id=" + id + ".",
    });
  }
};

const articleDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  // 这里应该有删除关联表的部分
  Article.destroy({
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete article with id=${id}. Maybe article was not found!`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id + ".",
      });
    });
};

const articleDeleteAll = (req: Request, res: Response) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles.",
      });
    });
};

export {
  articleCreate,
  articleFindAll,
  articleFindOne,
  articleUpdate,
  articleDelete,
  articleDeleteAll,
};
