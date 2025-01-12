require("dotenv").config();

module.exports = {
  filterChat: process.env.FILTER_CHAT === "true",
  filterKeywords: ["morning", "gm", "gn", "hallo"],
};
