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

  // Save Article in the database
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
//   const title = req.query.title;
//   var condition = { title: { [Op.like]: `%${title}%` } }

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

// const articleFindOne = (req: Request, res: Response) => {
//   const id = req.params.id;

//   Article.findByPk(id)
//     .then((data: any) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Article with id=${id}.`,
//         });
//       }
//     })
//     .catch((err: Error) => {
//       res.status(500).send({
//         message: "Error retrieving Article with id=" + id,
//       });
//     });
// };

// const articleUpdate = (req: Request, res: Response) => {
//   const id = req.params.id;

//   Article.update(req.body, {
//     where: { id: id },
//   })
//     .then((num: any) => {
//       if (num == 1) {
//         res.send({
//           message: "Article was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err: Error) => {
//       res.status(500).send({
//         message: "Error updating Article with id=" + id,
//       });
//     });
// };

// const articleDelete = (req: Request, res: Response) => {
//   const id = req.params.id;

//   Article.destroy({
//     where: { id: id },
//   })
//     .then((num: any) => {
//       if (num == 1) {
//         res.send({
//           message: "Article was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
//         });
//       }
//     })
//     .catch((err: Error) => {
//       res.status(500).send({
//         message: "Could not delete Article with id=" + id,
//       });
//     });
// };

// const articleDeleteAll = (req: Request, res: Response) => {
//   Article.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums: any) => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch((err: Error) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials.",
//       });
//     });
// };

// // const findAllPublished = (req: Request, res: Response) => {
// //   Article.findAll({ where: { published: true } })
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
  tagCreate ,
  tagFindAll,
  // findAllPublished,
};
