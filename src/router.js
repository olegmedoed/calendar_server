const Router = require("express").Router;

const MiscController = require("./controllers/misc");
const UserController = require("./controllers/user");

module.exports = function setRoutes(opts) {
  const router = new Router();

  const misc = MiscController(opts);
  const user = UserController(opts);

  router.post("/api/users/", user.create);

  router.use("/", misc.client);

  return router;
};
