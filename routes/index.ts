
import express from 'express';
import articleRouter from "./article";
import tagRouter from "./tag";
import userRouter from "./user"

const router = express.Router();


router.use("/api/user", userRouter)
router.use("/api/article", articleRouter);
router.use("/api/tag", tagRouter);
// 自定义统一异常处理中间件，需要放在代码最后

export default router;
