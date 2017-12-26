const Morgan = require("morgan");
const Pino = require("pino");

const { LOG_LEVEL, NODE_ENV } = process.env;

module.exports = function Logger() {
  const logger = new Pino({
    level: LOG_LEVEL,
    prettyPrint: NODE_ENV === "development",
    base: null
  });
  const morgan = Morgan("dev", {
    stream: {
      write(msg) {
        logger.info(msg.trim());
      }
    }
  });

  return { logger, morgan };
};
