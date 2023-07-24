import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mysqlObject from "../database/mysql";

const User = mysqlObject.user;

const register = (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  // Validate request
  if (!username || !password || !email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Save tag in the database
  User.findOne({
    where: {
      username: username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
    User.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      const userInfo = {
        username: username,
        password: password,
        email: email,
        displayName: username,
        type: 1
      };
      User.create(userInfo)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the tag.",
          });
        });
    });
  });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userLogined = await User.findOne({ where: { username: username } });
    if (userLogined) {
      if (userLogined.password === password) {
        // 登录成功，签发一个token并返回给前端
        const token = jwt.sign(
          // payload：签发的 token 里面要包含的一些数据
          { username },
          // 私钥
          "ryougishiki",
          // 设置过期时间
          { expiresIn: 60 * 60 * 24 } //1 day
        );
        res.json({
          message: "Login successfully!",
          data: {
            token,
            username: username,
            displayName: "Vivi",
            type: 2,
            avatar: "",
          },
        });
      } else {
        res.status(401).send({
          message: "Password is wrong!",
        });
      }
    } else {
      res.status(401).send({
        message: "User is not existed!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error login!",
    });
  }
};

export { register, login };
