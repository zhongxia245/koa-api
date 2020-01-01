const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const koajwt = require("koa-jwt");
const CONFIG = require("./config");

const errorMiddleware = require("./middlewares/error-handle");
const sendMiddleware = require("./middlewares/send-handle");

const index = require("./routes/index");
const user = require("./routes/api/user");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// jwt
// 错误处理
app.use(sendMiddleware());
app.use(errorMiddleware);

// 指定不需要 jwt校验的接口
app.use(
  koajwt({
    secret: CONFIG.jwt.secret
  }).unless({
    path: [
      /^\/api\/v1\/user\/login$/,
      /^\/api\/v1\/user\/register$/,
      /^(?!\/api).*$/ // 非 api 开头的不校验
    ]
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
