const { getChatGPTResponse } = require("./api/chatgpt");
const { log, displayCountdown, clearCountdown } = require("./utils/logger");
const fs = require("fs");
const path = require("path");
const MarkovChain = require("./utils/markovChain");

class ChatBot {
  constructor(client, targetChannelIds, prompt, config) {
    this.client = client;
    this.targetChannelIds = targetChannelIds;
    this.prompt = prompt;
    this.config = config;
    this.hasReplied = false;
    this.shuffledChatList = this.shuffleArray([...this.config.customChatList]);
    this.currentIndex = 0;
    this.channelCooldowns = new Map();
    this.markovChain = new MarkovChain();
    this.initialize();
    this.setupHotReload();
  }

  getMessageForChannel(channelId) {
    if (this.config.useMarkovChain && this.config.markovChainData[channelId]) {
      return this.markovChain.generateMarkovMessage(channelId);
    } else if (this.config.useCustomChatList) {
      return this.config.customChatList[
        Math.floor(Math.random() * this.config.customChatList.length)
      ];
    } else {
      return "Hello!";
    }
  }

  initialize() {
    this.client.on("ready", () => {
      log("success", `Logged in as ${this.client.user.tag}`);
      if (this.config.useCustomChatList || this.config.useMarkovChain) {
        this.startCustomChatList();
      }

      if (this.config.useMarkovChain) {
        for (const channelId in this.config.markovChainData) {
          this.markovChain.trainMarkovChain(
            channelId,
            this.config.markovChainData[channelId]
          );
        }
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
          log(
            "info",
            `Message From ${message.author.username} in #${message.channel.name} (${message.guild.name}): ${message.content}`
          );
          await message.reply(customResponse);
          log(
            "success",
            `Custom Response Sent To ${message.author.username} in #${message.channel.name} (${message.guild.name}): ${customResponse}`
          );
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

      if (!this.config.useCustomChatList && !this.config.useMarkovChain) {
        log(
          "info",
          `Message From ${message.author.username} in #${message.channel.name} (${message.guild.name}): ${message.content}`
        );
        const response = await getChatGPTResponse(message.content, this.prompt);

        if (response) {
          await message.reply(response.response);
          log(
            "success",
            `Message Sent To ${message.author.username} in #${message.channel.name} (${message.guild.name}): ${response.response}`
          );
        }
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

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startCustomChatList() {
    setInterval(() => {
      if (this.hasReplied) {
        this.hasReplied = false;
        return;
      }

      this.targetChannelIds.forEach((channelId) => {
        const channel = this.client.channels.cache.get(channelId);
        if (channel) {
          const cooldown = this.getCooldownForChannel(channel);
          const remainingCooldown = this.getRemainingCooldown(channel);

          if (remainingCooldown > 0) {
            displayCountdown(channel, remainingCooldown);
            return;
          } else {
            clearCountdown(channel.id);
          }

          const message = this.getMessageForChannel(channelId);
          if (message) {
            process.stdout.write("\n");
            channel.send(message);
            log(
              "success",
              `Message Sent To #${channel.name} (${channel.guild.name}): ${message}`
            );

            this.setCooldownForChannel(channel);
          }
        }
      });
    }, 1000);
  }

  getCooldownForChannel(channel) {
    if (this.config.useCustomCooldown) {
      return this.config.customCooldown;
    } else {
      return channel.rateLimitPerUser * 1000 || 0;
    }
  }

  getRemainingCooldown(channel) {
    const cooldownEnd = this.channelCooldowns.get(channel.id) || 0;
    return Math.max(0, cooldownEnd - Date.now());
  }

  setCooldownForChannel(channel) {
    const cooldown = this.getCooldownForChannel(channel);
    if (cooldown > 0) {
      this.channelCooldowns.set(channel.id, Date.now() + cooldown);
    }
  }

  setupHotReload() {
    const configPath = path.join(__dirname, "../src/utils/config.js");
    fs.watch(configPath, (eventType, filename) => {
      if (eventType === "change") {
        log("info", `File ${filename} changed. Reloading config...`);
        delete require.cache[require.resolve(configPath)];
        this.config = require(configPath);
        this.shuffledChatList = this.shuffleArray([
          ...this.config.customChatList,
        ]);
        this.currentIndex = 0;
        log("success", "Config reloaded successfully!");
      }
    });
  }
}

module.exports = ChatBot;
