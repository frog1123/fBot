const config = require('../config.json');

module.exports = {
    name: 'dm',
    description: 'DM a user, requires mention as argument',
    execute(message, args, Discord) {
        let user = message.mentions.users.first();
        msg = args.toString().replace(/,/g, ' ').replace(message.mentions.users.first(), '').slice(1);
        if (typeof user === 'undefined') message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(config.color).setTitle('You must provide a user to DM')]});
        else if (msg.length === 0) {
            message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(config.color).setTitle('Provide a message to DM')]});
        }
        else if (config.master.forEach(item => {
            if (typeof user !== 'undefined' && user.id === item) message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(config.color).setTitle('You cannot DM this user')]});
        }));
        else if (user.id !== config.master && msg.length !== 0) user.send(msg);
    }
}