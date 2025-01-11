const axios = require("axios");

async function getChatGPTResponse(text, prompt) {
  const url = "https://api.ryzendesu.vip/api/ai/chatgpt";
  try {
    const response = await axios.get(url, {
      params: {
        text: text,
        prompt: prompt,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error calling Ryzendesu API:", error.message);
    return {
      response: "Maaf, terjadi kesalahan dalam memproses permintaan.",
    };
  }
}

module.exports = { getChatGPTResponse };
