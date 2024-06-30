const axios = require('axios');

this.config = {
  name: 'teach',
  version: '1.0.0',
  author: {
    name: 'Author Name',
    contacts: 'https://sim-api-ctqz.onrender.com/'
  },
  role: 0,
  category: 'Chatbot',
  shortDescription: 'Teach Simsimi',
  longDescription: 'A bot that allows users to teach Simsimi new responses.',
  guide: '{pn}teach [ask] - [response]'
};

module.exports = {
  config: this.config,
  start: async function({ api, event, args }) {
    try {
      const text = args.join(" ");
      const text1 = text.substr(0, text.indexOf(' - '));
      const text2 = text.split(" - ").pop();

      if (!text1 || !text2) {
        return api.sendMessage(`Usage: ${global.config.PREFIX}teach hi - hello`, event.threadID, event.messageID);
      }

      const apiUrl = `https://sim-api-ctqz.onrender.com/teach?ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`;
      const response = await axios.get(apiUrl);

      if (response.data.message.includes("already learned")) {
        return api.sendMessage('Sim API has already learned this word.', event.threadID, event.messageID);
      }

      api.sendMessage(`Your ask: ${text1}\nSim respond: ${text2}`, event.threadID, event.messageID);
    } catch (error) {
      console.error('An error occurred:', error);
      api.sendMessage('Oops! Something went wrong.', event.threadID, event.messageID);
    }
  },
};
