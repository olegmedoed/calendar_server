const express = require("express");
const p = require("path");

const { NODE_ENV = "development" } = process.env;

module.exports = function init({ router, morgan, passport }) {
  const app = express();

  if (NODE_ENV === "development") app.use(morgan);
  app.use(express.static(p.join(__dirname, "../public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());

  app.use(router);

  return app;
};
