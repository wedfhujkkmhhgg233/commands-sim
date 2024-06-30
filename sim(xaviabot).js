import axios from 'axios';

const config = {
  name: "sim",
  aliases: [],
  description: "Get response from Sim model",
  usage: "<query>",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "jerome jamis api",
  extra: {}
};

function formatFont(text) {
  const fontMapping = {
    a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖',
    n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣',
    A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼',
    N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉',
  };

  return text.split('').map((char) => fontMapping[char] || char).join('');
}

async function onCall({ message, args }) {
  if (args.length === 0) {
    message.reply("Please provide a query.");
    return;
  }

  const query = encodeURIComponent(args.join(" "));
  const url = `https://sim-api-ctqz.onrender.com/sim?query=${query}`;

  try {
    const response = await axios.get(url);
    const { respond } = response.data;
    const formattedRespond = formatFont(respond);

    message.reply(formattedRespond);
  } catch (error) {
    console.error(error);
    message.reply("An error occurred while fetching the Sim response.");
  }
}

export default {
  config,
  onCall,
};
