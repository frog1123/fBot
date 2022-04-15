const moment = require("moment")

module.exports = {
    name: 'userinfo',
    description: "Return basic info about the user",
    execute(message, args, Discord){
        let user = message.mentions.users.first() || message.author

        const embed = new Discord.MessageEmbed()
        .setColor('#66bc6a')
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
                value: 'doesnt work'
                // value: `${moment(message.mentions.members.first() || message.author.joinedAt).format("LLLL")}`
            }
        )
        .addFields(
            {
                name: 'Account Created',
                value: `${user.createdAt}`
            }
        )
        .addFields(
            {
                name: 'Requested By',
                value: `${message.author}`
            }
        )
        message.channel.send({ embeds: [embed] })
    }
}