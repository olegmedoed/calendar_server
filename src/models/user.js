"use strict";

const mongoose = require("mongoose");
const { isEmail, isAlphanumeric } = require("validator");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

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
    },
    events: [{ type: mongoose.Schema.ObjectId, ref: "Event" }]
  });

  Object.assign(schema.methods, {
    async setPassword(password) {
      this._password = password;
      this.phash = await bcrypt.hash(password, 8);
    },

    generateJWT() {
      const { email, name } = this;
      return jwt.sign({ email, name }, JWT_SECRET);
    }
  });

  schema.plugin(uniqueValidator);

  mongoose.model("User", schema);
};
