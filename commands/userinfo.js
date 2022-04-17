const moment = require("moment");
const config = require('../config.json');

module.exports = {
    name: 'userinfo',
    description: 'Return basic info about the user, accepts mention as argument',
    execute(message, args, Discord) {
        let user = message.mentions.users.first() || message.author;
        let serverJoinTime = typeof message.mentions.members.first() === 'undefined' ? message.guild.members.cache.get(message.author.id).joinedTimestamp : message.mentions.members.first().joinedTimestamp;

        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor(`${user.tag}`, user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
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
                value: `${moment(serverJoinTime).format("LLLL")}
                (Unix time: ${serverJoinTime})`
            }
        )
        .addFields(
            {
                name: 'Account created',
                value: `${moment(user.createdAt).format("LLLL")}
                (Unix time: ${Date.parse(user.createdAt) / 1000})`
            }
        )
        .addFields(
            {
                name: 'Requested By',
                value: `${message.author} on ${moment(Date.now()).format("LLLL")}
                (Unix: ${Date.now()})`
            }
        );
        message.channel.send({ embeds: [embed] });
    }
}