import axios from "axios";

export const metadata = {
  name: `teach`,
  version: "1",
  author: `Author Name`,
  category: "Ai-Chat",
  description: `Teach Simsimi`,
  usage: `{prefix}{name} teach <ask> - <response>`,
  hasPrefix: true,
};

export async function onRun({ event, box, args }) {
  try {
    const text = args.join(" ");
    const text1 = text.substr(0, text.indexOf(' - '));
    const text2 = text.split(" - ").pop();

    if (!text1 || !text2) {
      return box.reply(`Usage: {prefix}teach hi - hello`);
    }

    const apiUrl = `https://sim-api-ctqz.onrender.com/teach?ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`;
    const response = await axios.get(apiUrl);

    if (response.data.message.includes("already learned")) {
      return box.reply(`Sim API has already learned this word.`);
    }

    box.reply(`Your ask: ${text1}\nSim respond: ${text2}`);
  } catch (error) {
    console.error(`An error occurred:`, error);
    box.reply(`Oops! Something went wrong.`);
  }
}
