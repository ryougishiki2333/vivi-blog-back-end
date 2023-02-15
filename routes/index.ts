
import express from 'express';
import userRouter from "./user";
import loginRouter from "./login";
import jwtAuth from "../util/user-jwt";

const router = express.Router();

router.use(jwtAuth); 

router.use("/api", userRouter); // 注入用户路由模块
router.use("/api", loginRouter); // 注入登录路由模块

// 自定义统一异常处理中间件，需要放在代码最后
router.use((err:any, req:any, res:any, next:any) => {
  // 自定义用户认证失败的错误返回
  console.log("err===", err);
  if (err && err.name === "UnauthorizedError") {
    const { status = 401, message } = err;
    // 抛出401异常
    res.status(status).json({
      code: status,
      msg: "token失效，请重新登录",
      data: null,
    });
  } else {
    const { output } = err || {};
    // 错误码和错误信息
    const errCode = (output && output.statusCode) || 500;
    const errMsg =
      (output && output.payload && output.payload.error) || err.message;
    res.status(errCode).json({
      code: errCode,
      msg: errMsg,
    });
  }
});

export default router;
