import mysqlObject from "../database/mysql";
import { Op } from "sequelize";
import { Request, Response } from "express";

const Tag = mysqlObject.tag;
const tagCreate = async (req: Request, res: Response) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const tag = {
    name: req.body.name,
  };

  // Save tag in the database
  Tag.create(tag)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tag.",
      });
    });
};

// Retrieve all Tags from the database.
const tagFindAll = (req: Request, res: Response) => {
  Tag.findAll()
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tags.",
      });
    });
};

const tagFindOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Tag.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find tag with id=${id}.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: `Error retrieving tag with id=${id}.`,
      });
    });
};

const tagUpdate = (req: Request, res: Response) => {
  const id = req.params.id;

  Tag.update(req.body, {
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Tag was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update tag with id=${id}. Maybe tag was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error updating tag with id=" + id + ".",
      });
    });
};

const tagDelete = (req: Request, res: Response) => {
  const id = req.params.id;

  Tag.destroy({
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Tag was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete tag with id=${id}. Maybe tag was not found!`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Could not delete tag with id=" +  id + ".",
      });
    });
};

const tagDeleteAll = (req: Request, res: Response) => {
  Tag.destroy({
    where: {},
    truncate: false,
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Tags were deleted successfully!` });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// // const findAllPublished = (req: Request, res: Response) => {
// //   tag.findAll({ where: { published: true } })
// //     .then((data: any) => {
// //       res.send(data);
// //     })
// //     .catch((err: Error) => {
// //       res.status(500).send({
// //         message:
// //           err.message || "Some error occurred while retrieving tutorials.",
// //       });
// //     });
// // };

export {
  tagCreate,
  tagFindAll,
  tagFindOne,
  tagUpdate,
  tagDelete,
  tagDeleteAll
  // findAllPublished,
};
