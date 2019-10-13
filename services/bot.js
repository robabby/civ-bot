const Discord = require("discord.js");
const keys = require("../config/keys");

const prefix = "!civ ";
const client = new Discord.Client();
const token = keys.discordBotToken;

console.log(token);

const USER_MAP = {
  Bliss: "249746356711849985",
  ["FS|Bonez"]: "313380832314261504",
  koa04: "313013436609069058",
  ListoSG: "301056445645062145",
};

const COMMANDS = {
  mention: "mention"
};

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on("ready", () => {
  console.log("I am ready!");
});

// Create an event listener for messages
client.on("message", async (message) => {

  // if the author of the message is the bot, do nothing
  if (message.content.indexOf(prefix) !== 0) { return; }

  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const params = args;

  console.log(command, params, keys.discordClientId);

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

  const sendResponse = (payload) => {
    console.log("payload: ", payload)
    message.channel.send(payload);
  };

  switch (command) {
    case COMMANDS.mention:
      console.log("Mention command")
      const steamName = params[0];
      console.log(steamName);
      const res = createMentionResponse(steamName);
      console.log(res)
      sendResponse(res);
      break;
    default:
      console.log("switch");
  }
});

// Log our bot in
client.login(token);

module.exports = client;
