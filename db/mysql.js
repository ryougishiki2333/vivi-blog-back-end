const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10, //最大连接数，默认为10
  host: "localhost", // 数据库服务器地址
  port: 3306, //数据库端口
  user: "root", // 数据库的用户名
  password: "liaotingwei", // 数据库密码
  database: "manage", // 数据库名
});

class Mysql {
  constructor() {}
  query(sql) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err);
          throw err; // not connected!
        }
        connection.query(sql, function (error, results, fields) {
          if (error) {
            reject(err);
            throw error;
          }
          connection.release(); //只是释放链接，在缓冲池，没有被销毁
          resolve(results);
        });
      });
    });
  }
}

module.exports = new Mysql();
