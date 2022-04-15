const fs = require('fs');

module.exports = {
    name: 'help',
    description: "Lists commands",
    execute(message, args, Discord) {
        const embed = new Discord.MessageEmbed()
        .setColor('#66bc6a')
        .setTitle('Commands:')
        .setDescription(`My prefix is **${process.env.PREFIX}**`)

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./${file}`)
            embed.addFields({ name: `${command.name}`, value: `${command.description}`})
        }
        message.channel.send({ embeds: [embed] });
    }
}