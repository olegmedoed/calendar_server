const Router = require("express").Router;

const MiscController = require("./controllers/misc");

module.exports = function setRoutes(opts) {
  const router = new Router();

  const misc = MiscController(opts);

  router.use("/", misc.client);

  return router;
};
