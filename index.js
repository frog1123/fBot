const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

require('dotenv').config();
const fs = require('fs');
const chalk = require('chalk');

const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();

const color = chalk.bold.hex(config.color);

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}
client.once('ready', () => {
    console.log(`fBot is ${color('online')}`);
    console.log(`Loaded in ${color(client.guilds.cache.size)} server${client.guilds.cache.size > 1 ? "s" : ""}`)

    client.user.setPresence({ status: 'idle' });
    client.user.setActivity(`over ${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? "s" : ""}`, { type: "WATCHING" });
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /).toString().split(" ");
    const command = args.shift().toLowerCase().split(" ");

    if (typeof client.commands.get(command[0]) !== 'undefined') {
        client.commands.get(command[0]).execute(message, args, Discord);
    }
});

client.login(process.env.DISCORD_TOKEN);