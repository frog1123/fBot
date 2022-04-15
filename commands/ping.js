module.exports = {
    name: 'ping',
    description: "Check if I am online",
    execute(message) {
        message.channel.send('Pinging...').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`Pong! took ${ping}ms`);
        })
    }
}