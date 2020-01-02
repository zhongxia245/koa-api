const mongoose = require("mongoose");
let connection = require("./index");

let define = {
  // 保存文档的时候要检查此用户名是否唯一
  role_id: { type: Number, unique: true },
  role_name: String,
  remark: String,
  status: { type: Boolean, default: true }
};

// Scheme 没有操作数据库的能力
let RoleSchema = new mongoose.Schema(define, { timestamps: true });

let Role = connection.model("Role", RoleSchema);

module.exports = Role;
