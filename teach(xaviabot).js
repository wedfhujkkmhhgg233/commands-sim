import axios from 'axios';

const config = {
  name: "teach",
  aliases: [],
  description: "Teach the Sim model new responses",
  usage: "teach <question> | <answer>",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "jerome jamis api",
  extra: {}
};

async function onCall({ message, args }) {
  if (args.length === 0 || !args.includes("|")) {
    message.reply("Please provide the question and answer in the format: teach <question> | <answer>");
    return;
  }

  const [question, answer] = args.join(" ").split("|").map(str => str.trim());
  const encodedQuestion = encodeURIComponent(question);
  const encodedAnswer = encodeURIComponent(answer);
  const url = `https://sim-api-ctqz.onrender.com/teach?ask=${encodedQuestion}&ans=${encodedAnswer}`;

  try {
    const response = await axios.get(url);
    if (response.data) {
      message.reply("The new response has been successfully taught.");
    } else {
      message.reply("Failed to teach the new response.");
    }
  } catch (error) {
    console.error(error);
    message.reply("An error occurred while teaching the new response.");
  }
}

export default {
  config,
  onCall,
};
