const express = require("express");
const loginController = require('../controllers/loginController');

const router = express.Router(); //模块化路由

router.post("/register", loginController.register);

function login_middleware(req, res, next) {
  console.log("中间件1");
  next(); //传递给下一步
}

function login_params(req, res, next) {
  let { name, password } = req.query;
  if (!name || !password) {
    //发送消息，结束响应，不需要再调用next
    res.json({
      message: "参数校验失败",
    });
  } else {
    next();
  }
}

router.post("/login", (req, res, next) => {
  console.log("req", req.body);
  res.send("登录成功");
});

module.exports = router;

