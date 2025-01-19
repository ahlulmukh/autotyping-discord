require("dotenv").config();

const targetChannelIds = process.env.TARGET_CHANNEL_IDS
  ? process.env.TARGET_CHANNEL_IDS.split(",")
  : [];

module.exports = {
  // Option Using ChatGPT
  filterChat: process.env.FILTER_CHAT === "true",
  filterKeywords: ["morning", "gm", "gn", "hallo"],

  // Option Using Custom Chat List
  useCustomChatList: process.env.USE_CUSTOM_CHAT_LIST === "true",
  customChatList: [
    "Hello!",
    "Hi there!",
    "Greetings!",
    "Good day!",
    "How are you?",
  ],
  enableCustomResponse: process.env.ENABLE_CUSTOM_RESPONSE === "true",
  customResponses: {
    gm: "Good morning! 🌞",
    gn: "Good night! 🌙",
    hello: "Hello there! 👋",
  },

  useCustomCooldown: process.env.USE_CUSTOM_COOLDOWN === "true",
  customCooldown: parseInt(process.env.CUSTOM_COOLDOWN, 10) || 60000,
};
