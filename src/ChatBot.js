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

      const response = await getChatGPTResponse(message.content, this.prompt);

      if (response) {
        await message.reply(response.response);
        log("success", `Message Sent To ${message.author.username}`);
      }
    });
  }
}

module.exports = ChatBot;
