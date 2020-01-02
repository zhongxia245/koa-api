const errorHandle = (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      if (err.originalError.name === "TokenExpiredError") {
        return ctx.error(40100, "token已经过期");
      } else {
        return ctx.error(40101, "token是无效的");
      }
    } else {
      throw err;
    }
  });
};

module.exports = errorHandle;
