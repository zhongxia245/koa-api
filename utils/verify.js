/**
 * 从请求头获取 token，并且验证是否有效
 */
const jwt = require("jsonwebtoken");
const CONFIG = require("../config");

module.exports = ctx => {
  return new Promise((resolve, reject) => {
    let token = ctx.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, CONFIG.jwt.secret, (error, decoded) => {
      error ? reject(error) : resolve(decoded);
    });
  });
};
