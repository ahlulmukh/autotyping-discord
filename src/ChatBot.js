const { getChatGPTResponse } = require("./api/chatgpt");
const { log } = require("./utils/logger");

class ChatBot {
  constructor(client, targetChannelIds, prompt) {
    this.client = client;
    this.targetChannelIds = targetChannelIds;
    this.prompt = prompt;
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
