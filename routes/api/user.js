const jwt = require("jsonwebtoken");
const router = require("koa-router")();
const CONFIG = require("../../config");
const verify = require("../../utils/verify.js");

router.prefix("/api/v1/user");

router.get("/", function(ctx) {
  ctx.send("this is a users response!");
});

router.get("/info", async function(ctx) {
  let decodedToken = await verify(ctx);
  ctx.send(decodedToken);
});

// 登录
router.post("/login", function(ctx) {
  let param = ctx.request.body;

  if (!param["username"] || !param["password"]) {
    ctx.sendError(1, "帐号和密码不能为空");
  } else if (
    param["username"] === CONFIG.user.username &&
    param["password"] === CONFIG.user.password
  ) {
    const token = jwt.sign(
      { name: param["username"], _id: 1 },
      CONFIG.jwt.secret,
      {
        expiresIn: 30 // 单位 s
      }
    );

    ctx.send({ token });
  } else {
    ctx.sendError(1, "账户或密码有误");
  }
});

// 注册
router.post("/register", function(ctx) {
  // post提交 x-www-form-urlencoded
  ctx.send(ctx.request.body);
});

module.exports = router;
