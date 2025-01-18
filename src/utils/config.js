require("dotenv").config();

module.exports = {
  // Option Using ChatGPT
  filterChat: process.env.FILTER_CHAT === "true",
  filterKeywords: ["morning", "gm", "gn", "hallo"],
  replyDelay: parseInt(process.env.REPLY_DELAY, 10) || 1000,
  // Option Using Custom Chat List
  useCustomChatList: process.env.USE_CUSTOM_CHAT_LIST === "true",
  customChatList: ["Your Custom Text Here", "Another Custom Text Here"],
  enableCustomResponse: process.env.ENABLE_CUSTOM_RESPONSE === "true",
  customResponses: {
    gm: "Good morning! 🌞",
    gn: "Good night! 🌙",
    hello: "Hello there! 👋",
  },
};
