const { Client } = require("discord.js-selfbot-v13");
require("dotenv").config();
const ChatBot = require("./src/ChatBot");
const config = require("./src/utils/config");

function startBot() {
  const client = new Client();
  new ChatBot(
    client,
    process.env.TARGET_CHANNEL_IDS.split(","),
    process.env.CHATBOT_PROMPT,
    config
  );

  client.on("error", (error) => {
    console.error("Client error:", error);
    restartBot();
  });

  process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
    restartBot();
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
    restartBot();
  });

  client.login(process.env.DISCORD_TOKEN);
}

function restartBot() {
  console.log("Restarting bot in 5 seconds...");
  setTimeout(() => {
    startBot();
  }, 5000);
}

startBot();
