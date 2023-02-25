import express from "express";
import bodyParser from "body-parser"; // 引入body-parser模块
import path from "path";
import cors from "cors";
import routes from "./routes";
import db from "./database/mysql"


const app = express();

app.use(express.static(path.join(__dirname, "public")));

// 解析form表单提交的数据application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.text()); //解析 text/plain 数据格式

app.use(cors()); // 注入cors模块解决跨域

app.use("/", routes);

db.sequelize.sync({force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
