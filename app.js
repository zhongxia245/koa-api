const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const koajwt = require("koa-jwt");
const cors = require("koa2-cors");
const CONFIG = require("./config");

const errorMiddleware = require("./middlewares/error");
const methods = require("./middlewares/methods");

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

// cors
app.use(cors());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// jwt
// 错误处理
app.use(methods());
app.use(errorMiddleware);

// 指定不需要 jwt校验的接口
// koa-jwt 会验证 token，并把 token 解析出来，放到 ctx.state 中
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
