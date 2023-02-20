import mysqlObject from "../database/mysql";
import { Op } from "sequelize";
import { Request, Response } from "express";
const Article = mysqlObject.article;
// Create and Save a new Article
const create = (req: Request, res: Response) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Article
  const article = {
    title: req.body.title,
    content: req.body.content,
    articleState: req.body.articleState,
  };

  // Save Article in the database
  Article.create(article)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article.",
      });
    });
};

// Retrieve all Tutorials from the database.
const findAll = (req: Request, res: Response) => {
  const title = req.query.title;
  var condition = { title: { [Op.like]: `%${title}%` } }

  Article.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with id=${id}.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + id,
      });
    });
};

const update = (req: Request, res: Response) => {
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
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error updating Article with id=" + id,
      });
    });
};

const deleteT = (req: Request, res: Response) => {
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
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id,
      });
    });
};

const deleteAll = (req: Request, res: Response) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
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
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };

export {
  create,
  findAll,
  findOne,
  update,
  deleteT,
  deleteAll,
  // findAllPublished,
};
