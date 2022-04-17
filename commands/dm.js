const config = require('../config.json');

module.exports = {
    name: 'dm',
    description: 'DM a user, requires mention as argument',
    execute(message, args, Discord) {
        let user = message.mentions.users.first();
        msg = args.toString().replace(/,/g, ' ').replace(message.mentions.users.first(), '').slice(1);
        if (typeof user === 'undefined') message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(config.color).setTitle('You must provide a user to DM!')]});
        else if (user.id !== config.master) user.send(msg);
        else if (user.id === config.master) message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(config.color).setTitle('You cannot DM this user!')]});
    }
}