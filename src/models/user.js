"use strict";

const mongoose = require("mongoose");
const { isEmail, isAlphanumeric } = require("validator");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

module.exports = () => {
  const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        isAsync: false,
        validator: isAlphanumeric,
        msg: "Invalid name"
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      validate: [{ isAsync: false, validator: isEmail, msg: "Invalid email" }]
    },
    phash: {
      type: String,
      required: true,
      validate: [
        function(val) {
          return val && this._password.length > 7;
        },
        "Password to short"
      ]
    }
  });

  Object.assign(schema.methods, {
    async setPassword(password) {
      this._password = password;
      this.phash = await bcrypt.hash(password, 8);
    }
  });

  schema.plugin(uniqueValidator);

  mongoose.model("User", schema);
};
