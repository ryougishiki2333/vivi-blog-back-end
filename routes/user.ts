export {};

const upload = require("../util/upload")

const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/user/json", userController.getuser);

router.get("/list", userController.list);

router.delete("/user", userController.deleteUser);

router.post("/upload", upload, (req:any, res:any, next:any) => {
  // 存储后的文件信息在 req.file 中，此时文件已经存储到本地了。
  console.log(req.file);
  res.send("success");
});

module.exports = router;

