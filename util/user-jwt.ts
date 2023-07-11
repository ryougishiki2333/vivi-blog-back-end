import { expressjwt as jwt } from "express-jwt"

// 验证token是否过期
const jwtAuth = jwt({
  secret: "ryougishiki", //密匙
  algorithms: ["HS256"], //签名算法
}).unless({ path: ["/api/user/login", "/api/user/register"] }); // unless 设置jwt认证白名单

export default jwtAuth;
