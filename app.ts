

import express from "express";
import bodyParser from "body-parser"; // 引入body-parser模块
import path from "path";
import cors from "cors";

import routes from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// 解析form表单提交的数据application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.text()); //解析 text/plain 数据格式

app.use(cors()); // 注入cors模块解决跨域

app.use("/", routes);

app.listen(4000, () => {
  console.log("server is running port");
});
