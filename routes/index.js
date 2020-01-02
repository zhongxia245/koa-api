const router = require("koa-router")();

router.get("/", async ctx => {
  await ctx.render("index", {
    title: "Hello Koa 2!"
  });
});

router.get("/login", async ctx => {
  await ctx.render("login", {
    title: "用户登录"
  });
});

router.get("/register", async ctx => {
  await ctx.render("register", {
    title: "用户注册"
  });
});

module.exports = router;
