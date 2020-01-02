# Jwt 认证

## 开发

```bash
npm install

npm run dev
```

## 如何部署

```bash
# 第一次部署，让服务器下载git 代码
npm run server:setup
# 更新部署
npm run server:update
```

> 第一次部署，这两个命令都需要执行，先 setup ，后 update

## 功能实现

### 1. token 过期，自动刷新

token 分为两个，access_token, refresh_token。
- access_token：访问接口用，有限期相对比较短（一个礼拜）
- refresh_token: 更新 access_token 用，有效期通常较长（一个月）

## 参考文章

1. [Node.js 应用：Koa2 使用 JWT 进行鉴权](https://github.com/lin-xin/blog/issues/28)
2. [JWT 生成 token 及过期处理方案](https://my.oschina.net/odetteisgorgeous/blog/1920762)
3. [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.im/post/5e055d9ef265da33997a42cc)
