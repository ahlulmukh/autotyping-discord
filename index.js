const { Client } = require("discord.js-selfbot-v13");
require("dotenv").config();
const ChatBot = require("./src/ChatBot");
const { log } = require("./src/utils/logger");

const client = new Client();
new ChatBot(
  client,
  process.env.TARGET_CHANNEL_IDS.split(","),
  process.env.CHATBOT_PROMPT
);

client.login(process.env.DISCORD_TOKEN);
