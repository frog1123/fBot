const Discord = require('discord.js');

const os = require('os');
const osutils = require('os-utils');
const fs = require('fs');
const chalk = require('chalk');
const { setInterval } = require('timers/promises');

require('dotenv').config();
const config = require('./config.json');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS] });
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
    console.log(`Loaded in ${color(client.guilds.cache.size)} server${client.guilds.cache.size > 1 ? "s" : ""}`);

    osutils.cpuUsage(v => {
        console.log('-----------------------------------------------------');
        console.log(`Platform: ${color(osutils.platform())}`);
        console.log(`CPU Usage: ${color(`${((v * 100).toFixed(2))}%`)} (${color(os.cpus()[0].model)})`);
        console.log(`RAM Usage: ${color(osutils.freemem())}  / ${color(osutils.totalmem())} (${color(`${(100 - osutils.freememPercentage() * 100).toFixed(2)}%`)})`);
        console.log('-----------------------------------------------------');
    });

    client.user.setPresence({ status: 'idle' });
    client.user.setActivity(`${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? "s" : ""}`, { type: "WATCHING" });
});

setInterval(
    () => client.user.setActivity(`${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? "s" : ""}`, { type: "WATCHING" })    
, 300000);

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /).toString().split(" ");
    const command = args.shift().toLowerCase().split(" ");

    if (typeof client.commands.get(command[0]) !== 'undefined') {
        client.commands.get(command[0]).execute(message, args, Discord, client);
    }
});

client.login(process.env.DISCORD_TOKEN);