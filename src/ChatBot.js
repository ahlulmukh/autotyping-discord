const { getChatGPTResponse } = require("./api/chatgpt");
const { log } = require("./utils/logger");
const fs = require("fs");
const path = require("path");

class ChatBot {
  constructor(client, targetChannelIds, prompt, config) {
    this.client = client;
    this.targetChannelIds = targetChannelIds;
    this.prompt = prompt;
    this.config = config;
    this.hasReplied = false;
    this.initialize();
    this.setupHotReload();
  }

  initialize() {
    this.client.on("ready", () => {
      log("success", `Logged in as ${this.client.user.tag}`);
      if (this.config.useCustomChatList) {
        this.startCustomChatList();
      }
    });

    this.client.on("messageCreate", async (message) => {
      if (!this.targetChannelIds.includes(message.channel.id)) return;
      if (message.author.bot || message.author.id === this.client.user.id)
        return;

      if (this.config.enableCustomResponse) {
        const customResponse = this.getCustomResponse(message.content);
        if (customResponse) {
          this.hasReplied = true;
          setTimeout(async () => {
            await message.reply(customResponse);
            log(
              "success",
              `Custom Response Sent To ${message.author.username}: ${customResponse}`
            );
          }, this.config.replyDelay);
          return;
        }
      }

      if (
        this.config.filterChat &&
        !this.config.filterKeywords.some((keyword) =>
          message.content.includes(keyword)
        )
      ) {
        return;
      }

      log(
        "info",
        `Message From ${message.author.username}: ${message.content}`
      );

      if (this.config.useCustomChatList) {
        return;
      }

      const response = await getChatGPTResponse(message.content, this.prompt);

      if (response) {
        setTimeout(async () => {
          await message.reply(response.response);
          log("success", `Message Sent To ${message.author.username}`);
        }, this.config.replyDelay);
      }
    });
  }

  getCustomResponse(messageContent) {
    const lowerCaseMessage = messageContent.toLowerCase();
    for (const keyword in this.config.customResponses) {
      if (lowerCaseMessage.includes(keyword)) {
        return this.config.customResponses[keyword];
      }
    }
    return null;
  }

  startCustomChatList() {
    setInterval(() => {
      if (this.hasReplied) {
        this.hasReplied = false;
        return;
      }

      const randomMessage =
        this.config.customChatList[
          Math.floor(Math.random() * this.config.customChatList.length)
        ];
      this.targetChannelIds.forEach((channelId) => {
        const channel = this.client.channels.cache.get(channelId);
        if (channel) {
          channel.send(randomMessage);
          log(
            "success",
            `Message Sent To Channel ${channelId}: ${randomMessage}`
          );
        }
      });
    }, this.config.replyDelay);
  }

  setupHotReload() {
    const configPath = path.join(__dirname, "../src/utils/config.js");
    fs.watch(configPath, (eventType, filename) => {
      if (eventType === "change") {
        log("info", `File ${filename} changed. Reloading config...`);
        delete require.cache[require.resolve(configPath)];
        this.config = require(configPath);
        log("success", "Config reloaded successfully!");
      }
    });
  }
}

module.exports = ChatBot;
