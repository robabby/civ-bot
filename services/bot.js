const Discord = require("discord.js");
const keys = require("../config/keys");

const prefix = "!civ ";
const client = new Discord.Client();
const TOKEN = keys.discordBotToken;
const USER_MAP = {
  Bliss: "249746356711849985",
  ["FS|Bonez"]: "313380832314261504",
  koa04: "313013436609069058",
  ListoSG: "301056445645062145",
};
const COMMANDS = {
  help: "help",
  mention: "mention"
};

client.on("message", async (message) => {

  // if the author of the message is the bot, do nothing
  // if (message.author.bot) { return; }
  if (message.content.indexOf(prefix) !== 0) { return; }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const params = args;

  console.log(command, params);

  // TODO: Figure out how to use emojis
  // const emoji = client.emojis.find("name", "nice");
  // message.channel.send(listingEmbed).react(emoji.id)

  const createMentionResponse = (username) => {
    const userId = USER_MAP[username];
    let message;

    if (userId) {
      message = `<@${userId}> :point_up:`;
    } else {
      message = "Steam user not found, let's hope they take their turn soon :fingers_crossed:";
    }

    return message;
  }

  const createHelpResponse = () => {
    const res = {
      embed: {
        author: {
          icon_url: client.user.avatarURL,
          name: client.user.username
        },
        color: 3447003,
        description: "A bot written by Bliss to help map Steam names to Discord names to notify people when it's their turn in Civilization 6 Multiplayer Games",
        timestamp: new Date(),
        title: "Civ6 Mention Bot",
        url: "https://github.com/robabby/civ-bot",
      }
    };

    return res;
  };

  const sendResponse = (payload) => {
    message.channel.send(payload);
  };

  switch (command) {
    case COMMANDS.mention:
      const steamName = params[0];
      const res = createMentionResponse(steamName);
      sendResponse(res);
      break;
    case COMMANDS.help:
      const res = createHelpResponse();
      sendResponse(res);
      break;
    default:
      const res = "Command not found. To use this bot type `!civ mention [Steam Username]` to mention someone who's been added to this app. Type `!civ help` for more info.";
  }
});

client.login(TOKEN);

client.on("ready", () => {
  console.log("I am ready!");
});

module.exports = client;
