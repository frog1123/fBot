const Discord = require('discord.js');
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}
client.once('ready', () => {
    console.log('fBot is online!');
    client.user.setPresence({ status: 'idle' });
    client.user.setActivity(`${prefix}help`, { type: 'LISTENING' });
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if (typeof client.commands.get(command) !== 'undefined') {
        client.commands.get(command).execute(message, args, Discord);
    }
});

client.login(process.env.DISCORD_TOKEN);