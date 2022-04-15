module.exports = {
    name: 'ping',
    description: "pings bot",
    execute(message) {
        message.channel.send('Pinging...').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`Pong! took ${ping}ms`);
        })
    }
}