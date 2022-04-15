const moment = require("moment")

module.exports = {
    name: 'userinfo',
    description: "The bot will return the info about the user",
    execute(message, args, Discord){
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

        const embed = new Discord.MessageEmbed()
        .setColor('#DAF7A6')
        .setAuthor(`${user.tag}`, user.displayAvatarURL())
        .addFields(
            {
                name: `User ping`,
                value: `${user}`
            }
        )
        .addFields(
            {
                name: `User ID`,
                value: `${user.id}`
            }
        )
        .addFields(
            {
                name: 'Joined server',
                value: `${moment(user.joinedAt).format("LLLL")}`
            }
        )
        .addFields(
            {
                name: 'Joined Discord',
                value: `${user.createdAt}`
            }
        )
        message.channel.send({ embeds: [embed] })
    }
}