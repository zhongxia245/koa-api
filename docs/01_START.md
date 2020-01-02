# Koa2 实现 Jwt 认证（一）实现基本 JWT 功能

 文章中只列举比较重要的代码，其他的省略，具体可以看 [源码]()

## 一、JWT 是什么？

 `Json Web Token` 简称 `JWT` ，是目前最流行的**跨域认证**解决方案。

[《JSON Web Token 入门教程》](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)对 `JWT` 入门做了一个详细的介绍，这里不在展开赘述了。



### 1、JWT 原理

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1gaigomg8qtj314c0pk79y.jpg" alt="JWT流程图" style="zoom:50%;" />



## 一、基本实现

这里主要是代码上的实现步骤。

1. 初始化 koa2 项目
2. 实现登录注册接口
3. 实现前端登录页面
4. 增加 jsonwebtoken 和 koa-jwt 中间件，指定需要 jwt 校验的路由
5. 改造登录接口

### 1、初始化 koa2 脚手架

`koa-generator` 可以快速生成 koa1，koa2的脚手架，详情可看[《koa-generator》](https://github.com/ykfe/koa-generator)。

```bash
# 安装 koa 脚手架命令行工具
npm install -g koa-generator

# 生成一个基本的 koa2脚手架
koa2 koa-jwt

cd koa-jwt
npm install 
npm run dev

# 访问 http://localhost:3000
```



### 2、实现登录注册接口

这里采用 mongoose 数据库，创建一个 user 表，注册时需要对密码进行 哈希加密。

> 简单列一下基本代码，具体代码可以看项目源码



## 二、遗留的问题

### 1、token 过期如何刷新？

token 过期了，需要重新登录再生成一个，那么如何避免重新登录，直接生成一个 token 呢？

### 2、token 失效处理？

JWT 最大的优势是服务器不再需要存储 Session，使得服务器认证鉴权业务可以方便扩展。但这也是 JWT 最大的缺点：由于服务器不需要存储 Session 状态，因此使用过程中无法废弃某个 Token 或者更改 Token 的权限。也就是说一旦 JWT 签发了，到期之前就会始终有效，除非服务器部署额外的逻辑。



## 参考文章

1. [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.im/post/5e055d9ef265da33997a42cc?utm_source=gold_browser_extension#heading-20)
2. [brew 安装 mongodb 报错](https://segmentfault.com/a/1190000020400235)
