module.exports = {
    name: 'help',
    description: "lists commands",
    execute(message, args, Discord) {
        const embed = new Discord.MessageEmbed()
        .setColor('#66bc6a')
        .setTitle('Commands:')
        .setDescription(`My prefix is **${process.env.PREFIX}**`)
        .addFields(
            { name: 'help', value: 'Sends this message'},
            { name: 'ping', value: 'Check if I am online'},
            { name: 'userinfo', value: 'Returns basic info about a user'}
        )
        message.channel.send({ embeds: [embed] });
    }
}