import express from "express";
import { register, login } from "../controllers/userController";

const router = express.Router(); //模块化路由

router.post("/register", register);

router.post("/login", login);

export default router;

// import upload from "../util/upload";
// import express from "express";
// import userController from "../controllers/userController";

// const router = express.Router();

// router.get("/user/json", userController.getuser);

// router.get("/list", userController.list);

// router.delete("/user", userController.deleteUser);

// router.post("/upload", upload, (req:any, res:any, next:any) => {
//   // 存储后的文件信息在 req.file 中，此时文件已经存储到本地了。
//   console.log(req.file);
//   res.send("success");
// });
