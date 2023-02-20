import mysqlObject from "../database/mysql";
import { Op } from "sequelize"
const Article = mysqlObject.article;
// Create and Save a new Article
const create = (req: any, res: any) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Article
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Article in the database
  Article.create(tutorial)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article.",
      });
    });
};

// Retrieve all Tutorials from the database.
const findAll = (req: any, res: any) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

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

const findOne = (req:any, res:any) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then((data:any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with id=${id}.`
        });
      }
    })
    .catch((err:any) => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + id
      });
    });
};

const update = (req:any, res:any) => {
  const id = req.params.id;

  Article.update(req.body, {
    where: { id: id }
  })
    .then((num:any) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
        });
      }
    })
    .catch((err:any) => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });
};

const deleteT = (req:any, res:any) => {
  const id = req.params.id;

  Article.destroy({
    where: { id: id }
  })
    .then((num:any) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
        });
      }
    })
    .catch((err:any) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id
      });
    });
};

const deleteAll = (req:any, res:any) => {
  Article.destroy({
    where: {},
    truncate: false
  })
    .then((nums:any) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err:any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

const findAllPublished = (req:any, res:any) => {
  Article.findAll({ where: { published: true } })
    .then((data:any) => {
      res.send(data);
    })
    .catch((err:any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

export { create, findAll, findOne, update, deleteT, deleteAll, findAllPublished };

