import mysqlObject from "../database/mysql";
import { Op } from "sequelize"
const Tutorial = mysqlObject.tutorials;
// Create and Save a new Tutorial
const create = (req: any, res: any) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all Tutorials from the database.
const findAll = (req: any, res: any) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
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

  Tutorial.findByPk(id)
    .then((data:any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch((err:any) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

const update = (req:any, res:any) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then((num:any) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch((err:any) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

const deleteT = (req:any, res:any) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then((num:any) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch((err:any) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

const deleteAll = (req:any, res:any) => {
  Tutorial.destroy({
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
  Tutorial.findAll({ where: { published: true } })
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

