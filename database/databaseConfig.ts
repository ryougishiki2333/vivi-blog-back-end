const mysqlConfig = {
  connectionLimit: 10, //最大连接数，默认为10
  host: process.env.NODE_ENV === 'docker' ? 'db' : 'localhost', // 数据库服务器地址
  port: 3306, //数据库端口
  user: "root", // 数据库的用户名
  password: "liaotingwei", // 数据库密码
  database: "manage", // 数据库名
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default mysqlConfig;
