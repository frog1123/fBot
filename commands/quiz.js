const config = require('../config.json');

module.exports = {
    name: 'quiz',
    description: 'Test your knowledge',
    execute(message, args, Discord) {
        function randomNum(min, max) { 
            return Math.round(Math.random() * (max - min) + min);
        };
        const questions = [
            // fifth is answer
            ['Who is developing this bot?', 'squidward', 'frogdude1123', 'dudefrog3211', 'chad', 'frogdude1123'],
            ['What is 2+2?', '3', '7', 'OVER 9000!!!', '4', '4'],
            ['Who is the impostor?', 'ur mom', 'idk', 'deez', 'red', 'red']
        ];
        const question = questions[randomNum(0, questions.length)];
        const answer = question[5];

        const embed = new Discord.MessageEmbed().setTitle(question[0]).setColor(config.color);

        let arr = [1, 2, 3, 4].sort(() => Math.random() - 0.5);

        const btns = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton().setCustomId(`${arr[0]}`).setLabel(question[arr[0]]).setStyle(config.bots[0].btntype))
        .addComponents(new Discord.MessageButton().setCustomId(`${arr[1]}`).setLabel(question[arr[1]]).setStyle(config.bots[0].btntype))
        .addComponents(new Discord.MessageButton().setCustomId(`${arr[2]}`).setLabel(question[arr[2]]).setStyle(config.bots[0].btntype))
        .addComponents(new Discord.MessageButton().setCustomId(`${arr[3]}`).setLabel(question[arr[3]]).setStyle(config.bots[0].btntype));

        message.channel.send({ embeds: [embed], components: [btns] });

        const collector = message.channel.createMessageComponentCollector({ max: 1 });
        collector.on('end', async collection => {
	        await collection.forEach(async click => {
                await btns.components[0].setDisabled(true);
                await btns.components[1].setDisabled(true);
                await btns.components[2].setDisabled(true);
                await btns.components[3].setDisabled(true);
                await click.update({ components: [btns] });

                if (question[parseInt(click.customId)] === answer)
                    await message.channel.send(`${click.user} answered ${question[parseInt(click.customId)]} CORRECT!`);
                else 
                    await message.channel.send(`${click.user} answered ${question[parseInt(click.customId)]} INCORRECT!, the correct answer was ${answer}`);
            });
        });
    }
}