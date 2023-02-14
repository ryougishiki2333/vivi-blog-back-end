const express = require("express");
const loginController = require('../controllers/loginController');
const jwt = require("jsonwebtoken");

const router = express.Router(); //模块化路由

router.post("/register", loginController.register);

router.post("/login", (req, res, next) => {
  let { username } = req.body;

  // 登录成功，签发一个token并返回给前端
  const token = jwt.sign(
    // payload：签发的 token 里面要包含的一些数据
    { username},
    // 私钥
    "caowj",
    // 设置过期时间
    { expiresIn: 60 * 60 * 24 } //1 day
  );

  res.json({
    msg: "登录成功",
    data: { token },
  });
});


module.exports = router;

