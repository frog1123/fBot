module.exports = {
    name: 'ping',
    description: "pings bot",
    execute(message, args, Discord){
        message.channel.send('Pinging...').then(msg =>{
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`Pong! took ${ping}ms`);
        })
    }
}