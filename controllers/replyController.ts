import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mysqlObject from "../database/mysql";
import { Op } from "sequelize";
import { log } from "console";

const User = mysqlObject.user;
const Reply = mysqlObject.reply;

const replyGetAll = async (req: Request, res: Response) => {
  let condition = {};
  if (req.query) {
    condition = { ...req.query };
  }
  Reply.findAll({ where: condition })
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

const replyGetByArticleId = async (req: Request, res: Response) => {

  const id = req.query.id;
  console.log(id)
  Reply.findAll({ where: { articleId: id[0] } })
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

const replyCreate = async (req: Request, res: Response) => {
  if (!req.body.content) {
    res.status(400).send({
      message: "Article items can not be empty!",
    });
    return;
  }
  const reply = {
    content: req.body.content,
    username: req.body.username,
    state: 1,
    replyUserId: req.body.replyUserId,
    userId: req.body.userId,
    articleId: req.body.articleId,
  };
  // const tag = req.body.tag;
  try {
    const newArticle = await Reply.create(reply);
    res.send(newArticle);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the article.",
    });
  }
};

export { replyCreate, replyGetAll, replyGetByArticleId };
