const Discord = require('discord.js');

const os = require('os');
const osutils = require('os-utils');
const fs = require('fs');
const chalk = require('chalk');
const { setInterval } = require('timers/promises');

require('dotenv').config();
const config = JSON.parse(process.env.CONFIG);

config.bots.forEach(
    (index, arr) => {
        loadBot(arr);
});


function loadBot(bot) {
    const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS] });
    const prefix = config.bots[bot].prefix;

    client.commands = new Discord.Collection();

    const color = chalk.hex(`#${config.bots[bot].color}`);

    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
    console.log(`Commands loaded: ${color((commandFiles.toString().replace(/.js/g, '')).replace(/,/g, chalk.hex('#fff')(', ')))}`);

    client.once('ready', () => {
        console.log(`${color(config.bots[bot].name)} is online`);
        console.log(`Loaded in ${color(client.guilds.cache.size)} server${client.guilds.cache.size > 1 ? "s" : ""}`);

        osutils.cpuUsage(v => {
            console.log('-----------------------------------------------------');
            console.log(`Platform: ${color(osutils.platform())}`);
            console.log(`CPU Usage: ${color(`${((v * 100).toFixed(2))}%`)} (${color(os.cpus()[0].model)})`);
            console.log(`RAM Usage: ${color(osutils.freemem())}  / ${color(osutils.totalmem())} (${color(`${(100 - osutils.freememPercentage() * 100).toFixed(2)}%`)})`);
            console.log('-----------------------------------------------------');
        });

        client.user.setPresence({ status: config.bots[bot].status });
        client.user.setActivity(`${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? "s" : ""}`, { type: "WATCHING" });
    });

    setInterval(
        () => client.user.setActivity(`${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? "s" : ""}`, { type: "WATCHING" })
    , 300000);

    client.on('messageCreate', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ + /).toString().split(" ");
        const command = args.shift().toLowerCase().split(" ")[0];

        if (typeof client.commands.get(command) !== 'undefined') {
            client.commands.get(command).execute(message, args, Discord, client, bot);
        }
    });


    client.login(config.bots[bot].token);
};