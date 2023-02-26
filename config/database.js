const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { dbPass, dbName, dbPort, dbUser, dbHost0, dbHost1, dbHost2, dbSsl } = require("./config");
const url = `mongodb://${dbUser}:${dbPass}@${dbHost0}:${dbPort},${dbHost1}:${dbPort},${dbHost2}:${dbPort}/${dbName}?${dbSsl}`;
mongoose.connect(url);
const db = mongoose.connection;

module.exports = db;