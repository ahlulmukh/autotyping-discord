const { getChatGPTResponse } = require("./api/chatgpt");
const { log } = require("./utils/logger");

class ChatBot {
  constructor(client, targetChannelIds, prompt, config) {
    this.client = client;
    this.targetChannelIds = targetChannelIds;
    this.prompt = prompt;
    this.config = config;
    this.initialize();
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

  startCustomChatList() {
    setInterval(() => {
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
}

module.exports = ChatBot;
