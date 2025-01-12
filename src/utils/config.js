require("dotenv").config();

module.exports = {
  filterChat: process.env.FILTER_CHAT === "true",
  filterKeywords: ["morning", "gm", "gn", "hallo"],
  replyDelay: parseInt(process.env.REPLY_DELAY, 10) || 1000,
};
