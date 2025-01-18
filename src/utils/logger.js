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

const channelCountdowns = {};

function displayCountdown(channel, remainingTime) {
  const countdownText = `Wait (${Math.ceil(remainingTime / 1000)}s) in #${
    channel.name
  } (${channel.guild.name})`;
  channelCountdowns[channel.id] = countdownText;

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(Object.values(channelCountdowns).join(" | "));
}

function clearCountdown(channelId) {
  delete channelCountdowns[channelId];
}

function getAllCountdowns() {
  return Object.values(channelCountdowns);
}

module.exports = {
  log,
  displayCountdown,
  clearCountdown,
  getAllCountdowns,
};
