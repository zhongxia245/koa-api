const router = require("koa-router")();

router.get("/", async ctx => {
  await ctx.render("index", {
    title: "Hello Koa 2!"
  });
});

router.get("/login", async ctx => {
  await ctx.render("login", {
    title: "登录"
  });
});

module.exports = router;
