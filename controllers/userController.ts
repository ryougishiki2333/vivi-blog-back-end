import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const register = (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.send("Got a POST request");
}

const login = (req: Request, res: Response) => {
  (req: any, res: any, next: any) => {
    const { username, password } = req.body;

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
      msg: "Login successfully!",
      data: { token },
    });
  }
}

export default { register, login }