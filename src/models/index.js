"use strict";

const { MONGO_URL } = process.env;

module.exports = function Mongo() {
  const mongoose = require("mongoose");

  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URL, { useMongoClient: true });

  require("./user")();
  require("./event")();

  return mongoose;
};
