const axios = require('axios');

module.exports = {
  config: {
    name: 'sim',
    version: '1.0',
    author: 'Jer devs',
    role: 0,
    category: 'Ai-Chat',
    shortDescription: {
      en: 'Simsimi chatbot'
    },
    longDescription: {
      en: 'A chatbot that uses Simsimi API to generate responses.'
    },
    guide: {
      en: '{pn}sim [message]'
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      const message = args.join(" ");
      
      if (!message) {
        return api.sendMessage('Please put Message', event.threadID, event.messageID);
      }

      const apiUrl = `https://sim-api-ctqz.onrender.com/sim?query=${encodeURIComponent(message)}`;
      const response = await axios.get(apiUrl);
      const respond = response.data.respond;

      api.sendMessage(respond, event.threadID, event.messageID);
    } catch (error) {
      console.error('An error occurred:', error);
      api.sendMessage('Oops! Something went wrong.', event.threadID, event.messageID);
    }
  },
};
