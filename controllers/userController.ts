// import mysql from "../db/mysql";
// import userService from "../service/userService";

// const list = function (req:any, res:any) {
//   res.json({
//     //发送json数据类型
//     list: [
//       {
//         name: "12",
//         id: 1,
//       },
//       {
//         name: "1233",
//         id: 2,
//       },
//     ],
//   });
// }

// const deleteUser = function (req:any, res:any) {
//   res.send("Got a DELETE request at /user"); //发送各种类型的响应
// }

// const getuser = function (req:any, res:any) {
//   mysql.query(userService.userAll).then((data) => {
//     let jsonData = JSON.parse(JSON.stringify(data));
//     res.json({
//       data: jsonData,
//     });
//   });
// };


// export default { list, deleteUser, getuser } 