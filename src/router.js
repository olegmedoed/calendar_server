const Router = require("express").Router;

const MiscController = require("./controllers/misc");
const UserController = require("./controllers/user");
const AuthController = require("./controllers/auth");

module.exports = function setRoutes(opts) {
  const router = new Router();
  const { passport } = opts;

  const misc = MiscController(opts);
  const user = UserController(opts);
  const auth = AuthController(opts);

  router.post("/api/users/", user.create);
  router.post(
    "/api/auth/local",
    passport.authenticate("local"),
    auth.authSuccess,
    auth.authFailure
  );

  router.use("/api/user", passport.authenticate("jwt"));
  router.post("/api/user/events", user.addEvent);
  router.get("/api/user/events", user.loadEvents);
  router.delete("/api/user/events", user.removeEvent);

  router.use("/", misc.client);

  return router;
};
