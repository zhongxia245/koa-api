module.exports = () => {
  // 处理请求成功方法
  const render = ctx => {
    return (data, msg = "请求成功") => {
      ctx.set("Content-Type", "application/json");
      ctx.body = {
        code: 0,
        data,
        msg
      };
    };
  };

  // 处理请求失败方法
  const renderError = ctx => {
    return (code, msg = "请求失败") => {
      ctx.set("Content-Type", "application/json");
      ctx.body = {
        code,
        data: null,
        msg
      };
    };
  };

  return async (ctx, next) => {
    ctx.success = render(ctx);
    ctx.error = renderError(ctx);
    await next();
  };
};
