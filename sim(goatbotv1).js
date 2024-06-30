const axios = require('axios');

this.config = {
  name: 'sim',
  version: '1',
  author: {
    name: 'Author Name',
    contacts: 'https://sim-api-ctqz.onrender.com/'
  },
  role: 0,
  category: 'Chatbot',
  shortDescription: 'Simsimi chatbot',
  longDescription: 'A chatbot that uses Simsimi API to generate responses.',
  guide: '{pn}sim [message]'
};

module.exports = {
  config: this.config,
  start: async function({ api, event, args }) {
    try {
      let message = args.join(" ");
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
