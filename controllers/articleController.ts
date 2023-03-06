import mysqlObject from "../database/mysql";
import { Op } from "sequelize";
import { Request, response, Response } from "express";
const Article = mysqlObject.article;
const Tag = mysqlObject.tag;
// Create and Save a new Article
const articleCreate = async (req: Request, res: Response) => {
  // Validate request
  if (!req.body.title || !req.body.content || !req.body.articleState) {
    res.status(400).send({
      message: "Article items can not be empty!",
    });
    return;
  }

  // Create a Article
  const article = {
    title: req.body.title,
    content: req.body.content,
    articleState: req.body.articleState,
  };

  const tag = req.body.tag;
  const newArticle = await Article.create(article);
  try {
    if (tag && tag.length > 0) {
      const condition = { name: { [Op.or]: tag } };
      const tagInSQL = await Tag.findAll({ where: condition });
      await newArticle.setTag(tagInSQL);
      const newArticleInSQL = await Article.findByPk(newArticle.id, {
        include: "Tag",
      });
      res.send(newArticleInSQL);
    } else {
      res.send(newArticle);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the article.",
    });
  }
};

// Retrieve all articles from the database.
const articleFindAll = (req: Request, res: Response) => {
  let condition = {};
  if (req.query) {
    condition = { ...req.query };
  }
  Article.findAll({ include: "Tag", where: condition })
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
        message: "Error retrieving article with id=" + id,
      });
    });
};

const articleUpdate = (req: Request, res: Response) => {
  const id = req.params.id;
  const article = {
    title: req.body.title,
    content: req.body.content,
    articleState: req.body.articleState,
  };
  const tag = req.body.tag;
  // 这里应该有编辑tag的部分
  Article.update(article, {
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update article with id=${id}. Maybe article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error updating article with id=" + id,
      });
    });
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
        message: "Could not delete Article with id=" + id,
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
