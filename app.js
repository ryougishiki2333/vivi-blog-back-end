const express = require("express");
const routes = require("./routes"); //新增
const app = express();

app.use("/", routes); //新增


app.listen(4000, () => {
  console.log("server is running");
});

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

var myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);