const mongoose = require("mongoose");
let connection = require("./index");
const bcrypt = require("bcryptjs");

let define = {
  // 保存文档的时候要检查此用户名是否唯一
  username: { type: String, unique: true },
  password: String,
  avator: String,
  email: String,
  role_id: { type: Number, default: 0 },
  role: { type: mongoose.ObjectId, ref: "Role" },
  status: { type: Boolean, default: true }
};

// Scheme 没有操作数据库的能力
let UserSchema = new mongoose.Schema(define, { timestamps: true });

// 这种机制也类似于 express 中的中间件
// 在保存之前执行一个函数
UserSchema.pre("save", function(next) {
  // 第一步先生成盐值
  bcrypt.genSalt((err, salt) => {
    // 通过原始的密码和盐值计算哈希值
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      next();
    });
  });
});

// 通过给 methods 增加属性可以给实例扩展方法，让实例直接调用即可
UserSchema.methods.comparePassword = function(passowrd) {
  return bcrypt.compareSync(passowrd, this.password);
};

let User = connection.model("User", UserSchema);

module.exports = User;
