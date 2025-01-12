const { Client } = require("discord.js-selfbot-v13");
require("dotenv").config();
const ChatBot = require("./src/ChatBot");
const config = require("./src/utils/config");

const client = new Client();
new ChatBot(
  client,
  process.env.TARGET_CHANNEL_IDS.split(","),
  process.env.CHATBOT_PROMPT,
  config
);

client.login(process.env.DISCORD_TOKEN);
