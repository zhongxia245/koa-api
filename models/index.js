const mongoose = require("mongoose");
const CONFIG = require("../config");

mongoose.set("useCreateIndex", true);

const db = mongoose.createConnection(CONFIG.mongoose.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on("error", () => {
  console.log("Mongoose connection error");
});

db.on("connected", () => {
  console.log("Mongoose connection success");
});

module.exports = db;
