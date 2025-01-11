const chalk = require("chalk");

const colors = {
  info: chalk.white,
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  process: chalk.cyan,
  debug: chalk.magenta,
};

function log(type, message) {
  console.log(colors[type](message));
}

module.exports = { log };
