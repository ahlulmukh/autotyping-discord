require("dotenv").config();

const targetChannelIds = process.env.TARGET_CHANNEL_IDS
  ? process.env.TARGET_CHANNEL_IDS.split(",")
  : [];

const markovTemplate = {
  "1287529004612360564": [
    // Channel ID Exampele
    "test training message",
    "test training",
  ],
};

const markovChainData = targetChannelIds.reduce((acc, channelId) => {
  acc[channelId] = markovTemplate[channelId] || [
    "Default message for unspecified channels.",
    "You can customize this message.",
  ];
  return acc;
}, {});

module.exports = {
  // Option Using ChatGPT
  filterChat: process.env.FILTER_CHAT === "true",
  filterKeywords: ["morning", "gm", "gn", "hallo"],

  // Option Using Custom Chat List
  useCustomChatList: process.env.USE_CUSTOM_CHAT_LIST === "true",
  customChatList: [
    "your custom chat list message 1",
    "your custom chat list message 2",
  ],
  enableCustomResponse: process.env.ENABLE_CUSTOM_RESPONSE === "true",
  customResponses: {
    gm: "Good morning! 🌞",
    gn: "Good night! 🌙",
    hello: "Hello there! 👋",
  },

  // Option Using Custom Cooldown
  useCustomCooldown: process.env.USE_CUSTOM_COOLDOWN === "true",
  customCooldown: parseInt(process.env.CUSTOM_COOLDOWN, 10) || 60000,

  // Option Using Markov Chain
  useMarkovChain: process.env.USE_MARKOV_CHAIN === "true",
  markovChainData,
};
