
import express from 'express';
import articleRouter from "./article";
import tagRouter from "./tag";

import loginRouter from "./login"

const router = express.Router();


router.use("/api/login", loginRouter)
router.use("/api/article", articleRouter);
router.use("/api/tag", tagRouter);
// 自定义统一异常处理中间件，需要放在代码最后

export default router;
