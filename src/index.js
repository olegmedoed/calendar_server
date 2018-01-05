const http = require("http");
const initApp = require("./app");

const { PORT = 3000 } = process.env;

const models = require("./models")();
const { logger, morgan } = require("./logger")();
const passport = require("./passport")({ logger, models });
const router = require("./router")({ models, logger, passport });

const app = initApp({ router, morgan, passport });

const server = http.createServer(app);

server.listen(PORT);

server.on("error", onError);
server.on("listening", onListening);

process.on("unhandledRejection", e => {
  logger.debug("unhandledRejection", e.stack);
  process.exit(1);
});

module.exports = server;

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.debug(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.debug(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  logger.debug("Listening on " + bind);
}
