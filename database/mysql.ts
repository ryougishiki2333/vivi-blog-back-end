import mysql from "mysql";
import mysqlConfig from "./databaseConfig"
import { Sequelize } from "sequelize"
import tutorialFunc from "../models/tutorialFunc"

const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  dialect: 'mysql',

  pool: {
    max: mysqlConfig.pool.max,
    min: mysqlConfig.pool.min,
    acquire: mysqlConfig.pool.acquire,
    idle: mysqlConfig.pool.idle
  }
});

const tutorials = tutorialFunc(sequelize, Sequelize)

const mysqlObject = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  tutorials: tutorials
};

export default mysqlObject






// const pool = mysql.createPool({
//   connectionLimit: 10, //最大连接数，默认为10
//   host: "localhost", // 数据库服务器地址
//   port: 3306, //数据库端口
//   user: "root", // 数据库的用户名
//   password: "liaotingwei", // 数据库密码
//   database: "manage", // 数据库名
// });

// class Mysql {
//   constructor() {}
//   query(sql:string) {
//     return new Promise((resolve, reject) => {
//       pool.getConnection(function (err, connection) {
//         if (err) {
//           reject(err);
//           throw err; // not connected!
//         }
//         connection.query(sql, function (error, results, fields) {
//           if (error) {
//             reject(err);
//             throw error;
//           }
//           connection.release(); //只是释放链接，在缓冲池，没有被销毁
//           resolve(results);
//         });
//       });
//     });
//   }
// }

// export default new Mysql();
