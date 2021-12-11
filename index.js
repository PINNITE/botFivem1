const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
const mysql = require('mysql');

fs.readdir("./eventy/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./eventy/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`Zalogowalem sie! || ${client.user.tag}`)
  client.user.setActivity(`LiteGuard - API`, { type: 'PLAYING' });
})

client.commands = new Enmap();

fs.readdir("./komendy/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./komendy/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Ladowanie ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
