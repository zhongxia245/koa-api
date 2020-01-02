const jwt = require("jsonwebtoken");
const router = require("koa-router")();
const CONFIG = require("../../config");
const User = require("../../models/user");

router.prefix("/api/v1/user");

router.get("/", function(ctx) {
  ctx.success("this is a users response!");
});

router.get("/info", async function(ctx) {
  let doc = await User.findOne({ username: "zhongxia" }).populate("role", {
    role_id: 1,
    role_name: 1
  });

  ctx.success({ _id: doc._id, username: doc.username });
});

// 登录
router.post("/login", async function(ctx) {
  let param = ctx.request.body;

  if (!param["username"] || !param["password"]) {
    return ctx.error(1, "帐号和密码不能为空");
  }

  let doc = await User.findOne({
    username: param["username"]
  });
  if (doc && doc.comparePassword(param["password"])) {
    // 把用户信息加密到 token 中
    const token = jwt.sign(
      { name: doc["username"], _id: doc["_id"] },
      CONFIG.jwt.secret,
      {
        expiresIn: 10 * 60 // 单位 s
      }
    );
    ctx.success({ token });
  } else {
    ctx.error(1, "账户或密码有误");
  }
});

// 注册
router.post("/register", async function(ctx) {
  // post提交 x-www-form-urlencoded
  let param = ctx.request.body;

  try {
    let doc = await User.create({
      username: param["username"],
      password: param["password"]
    });
    const token = jwt.sign(
      { name: doc["username"], _id: doc["_id"] },
      CONFIG.jwt.secret,
      {
        expiresIn: 10 * 60 // 单位 s
      }
    );
    ctx.success({ _id: doc._id, token: token });
  } catch (error) {
    ctx.error(error.code, error.errmsg);
  }
});

module.exports = router;
