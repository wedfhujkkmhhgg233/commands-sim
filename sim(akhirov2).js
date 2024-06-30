import axios from "axios";

export const metadata = {
  name: `sim`,
  version: "1",
  author: `Author Name`,
  category: "Ai-Chat",
  description: `Simsimi`,
  usage: `{prefix}{name} sim <message>`,
  hasPrefix: true,
};

export async function onRun({ event, box, args }) {
  try {
    const message = args.join(" ");

    if (!message) {
      return box.reply(`Please put Message`);
    }

    const response = await axios.get(`https://sim-api-ctqz.onrender.com/sim?query=${encodeURIComponent(message)}`);
    const respond = response.data.respond;

    box.reply(respond);
  } catch (error) {
    console.error(`An error occurred:`, error);
    box.reply(`Oops! Something went wrong.`);
  }
}
