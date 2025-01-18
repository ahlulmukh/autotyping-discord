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

function displayCountdown(channel, remainingTime) {
  const countdownText = `Wait (${Math.ceil(remainingTime / 1000)}s) in #${
    channel.name
  } (${channel.guild.name})`;
  process.stdout.write(`\r${countdownText}`);
}

module.exports = { log, displayCountdown };
