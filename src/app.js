const express = require("express");
const p = require("path");

const { NODE_ENV } = process.env;

module.exports = function init({ router, morgan }) {
  const app = express();

  if (NODE_ENV === "development") app.use(morgan);
  app.use(express.static(p.join(__dirname, "../public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(router);

  return app;
};
