module.exports = {
    name: 'test',
    description: "tset test",
    execute(message) {
        let taggedUser = message.mentions.users.first() || message.author
        message.channel.send(`asdasd ${taggedUser}`)
    }
}