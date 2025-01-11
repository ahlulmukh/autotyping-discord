# Autotyping Discord Bot

This project is a Discord bot to interact with Discord to generate responses using ChatGPT. The bot listens to messages in specified channels and replies with a generated response in a casual and friendly style.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/autotyping-discord.git
   cd autotyping-discord
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. copy `env.example` to `.env` file in the root directory with the following content:

   ```properties
   DISCORD_TOKEN=your_discord_token_here
   TARGET_CHANNEL_IDS=1287529004689260564,1287530870789636126
   CHATBOT_PROMPT=Reply in a casual and friendly style with modern slang.
   ```

4. Run the bot:
   ```sh
   node index.js
   ```

## Configuration

- **DISCORD_TOKEN**: Your Discord token.
- **TARGET_CHANNEL_IDS**: Comma-separated list of channel IDs where the bot will listen for messages.
- **CHATBOT_PROMPT**: The prompt used to generate responses.

## Get Token

<strong>Run code (Discord Console - [Ctrl + Shift + I])</strong>

```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  (req) => {
    if (!req.c) return;
    for (const m of Object.keys(req.c)
      .map((x) => req.c[x].exports)
      .filter((x) => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log("%cWorked!", "font-size: 50px");
console.log(`%cYou now have your token in the clipboard!`, "font-size: 16px");
```

## Usage

- The bot will log in using the provided Discord token.
- It will listen for messages in the specified channels.
- When a message is received, it will generate a response using the Ryzendesu API and reply in the same channel.

## Stay Connected

- Channel Telegram : [Telegram](https://t.me/elpuqus)
- Channel WhatsApp : [Whatsapp](https://whatsapp.com/channel/0029VavBRhGBqbrEF9vxal1R)

## Donation

If you would like to support the development of this project, you can make a donation using the following addresses:

- Solana: CtnmEm98MroVHMUvPi1cV9coc9RAStvj8uGL6iKnXwB9
- EVM: 0x2F6559E97d36E9CF06F28671BfC42B313df44f7b
- BTC: bc1qyh27hhu63nawuqff87gxk43ezaea5e9sgyrjp0

## Disclaimer

**Use at your own risk.** This bot operates as a self-bot, which is against Discord's Terms of Service and may result in your account being banned. Additionally, using this bot on servers may violate server rules. The author is not responsible for any consequences resulting from the use of this bot.
