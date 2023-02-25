import mysqlObject from "../database/mysql";
import { Op } from "sequelize";
import { Request, Response } from "express";
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

  // const tag = req.body.tag
  // if (tag && tag.length > 0) {
    
  // }
  // const newArticle = await Article.create(article)
  // console.log(Article);
  
  
  // Save Article in the database
  Article.create(article)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the article.",
      });
    });
};

// Retrieve all articles from the database.
const articleFindAll = (req: Request, res: Response) => {
  const title = req.query.title ? req.query.title: '';
  const condition = { title: { [Op.like]: `%${title}%` } }
  Article.findAll({where: condition, include: Tag})
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};

const articleFindOne = (req: Request, res: Response) => {
  const id = req.params.id;
  Article.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find article with id=${id}.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error retrieving article with id=" + id,
      });
    });
};

const articleUpdate = (req: Request, res: Response) => {
  const id = req.params.id;

  Article.update(req.body, {
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

// const findAllPublished = (req: Request, res: Response) => {
//   Article.findAll({ where: { published: true } })
//     .then((data: any) => {
//       res.send(data);
//     })
//     .catch((err: Error) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving articles.",
//       });
//     });
// };

export {
  articleCreate,
  articleFindAll,
  articleFindOne,
  articleUpdate,
  articleDelete,
  articleDeleteAll,
  // findAllPublished,
};
