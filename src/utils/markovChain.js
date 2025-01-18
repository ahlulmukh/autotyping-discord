class MarkovChain {
  constructor() {
    this.markovChains = {};
    this.startWords = ["Let's", "We're", "I'm", "This", "Time", "Hype", "The"];
  }

  trainMarkovChain(channelId, texts) {
    this.markovChains[channelId] = {};

    texts.forEach((text) => {
      const words = text.split(" ");
      for (let i = 0; i < words.length - 1; i++) {
        const currentWord = words[i];
        const nextWord = words[i + 1];

        if (!this.markovChains[channelId][currentWord]) {
          this.markovChains[channelId][currentWord] = [];
        }
        this.markovChains[channelId][currentWord].push(nextWord);
      }
    });
  }

  generateMarkovMessage(channelId, length = 10) {
    if (!this.markovChains[channelId]) {
      throw new Error(`Markov chain for channel ${channelId} is not trained.`);
    }

    const startWord =
      this.startWords[Math.floor(Math.random() * this.startWords.length)];
    let message = startWord;
    let currentWord = startWord;

    for (let i = 0; i < length; i++) {
      if (this.markovChains[channelId][currentWord]) {
        const nextWords = this.markovChains[channelId][currentWord];
        const nextWord =
          nextWords[Math.floor(Math.random() * nextWords.length)];
        message += " " + nextWord;
        currentWord = nextWord;
      } else {
        break;
      }
    }

    return message;
  }
}

module.exports = MarkovChain;
