import express from "express";
import bodyParser from "body-parser"; // 引入body-parser模块
import path from "path";
import cors from "cors";
import routes from "./routes";
import jwtAuth from "./util/user-jwt";

const app = express();
app.use(express.static(path.join(__dirname, "public")));

// 解析form表单提交的数据application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.text()); //解析 text/plain 数据格式

app.use(cors()); // 注入cors模块解决跨域
// app.use(jwtAuth)
app.use("/", routes);

app.use((err:any, req:any, res:any, next:any) => {
  // 自定义用户认证失败的错误返回
  console.log("err===", err);
  if (err && err.name === "UnauthorizedError") {
    const { status = 401, message } = err;
    // 抛出401异常
    res.status(status).json({
      code: status,
      msg: "Token error, please login again.",
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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
