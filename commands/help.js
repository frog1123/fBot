const fs = require('fs');
const ping = require('./ping');

const config = JSON.parse(process.env.CONFIG);

module.exports = {
    name: 'help',
    description: 'Lists commands',
    execute(message, args, Discord, client, bot) {
        const color = `#${config.bots[bot].color}`

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Commands:')
        .setDescription(`My prefix is **${config.bots[bot].prefix}**`)
        .addFields({ name: `${this.name}`, value: `${this.description}`})
        .addFields({ name: `${ping.name}`, value: `${ping.description}`});

        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            if (command.name !== 'ping' && command.name !== 'help') embed.addFields({ name: `${command.name}`, value: `${command.description}`});
        }
        message.channel.send({ embeds: [embed] });
    }
}