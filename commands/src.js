const puppeteer = require('puppeteer');
const fs = require('fs');

const config = require('../config.json')

module.exports = {
    name: 'src',
    description: 'View contents of a webpage',
    async execute(message, args, Discord) {
        await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
            try {
                const page = await browser.newPage();
                const response = await page.goto(args.toString());
                src = await response.text();
                fs.writeFileSync('puppeteer/text.txt', src);

                message.channel.send({
                    files: [{
                        attachment: 'puppeteer/text.txt',
                        name: 'src.txt',
                    }],
                    content: 'Waiting...'
                }).then(msg => {
                    const ping = msg.createdTimestamp - message.createdTimestamp;
                    msg.edit(`Content of ${args} (took ${ping}ms)`);
                }).then(() => fs.writeFileSync('puppeteer/text.txt', ''));
                browser.close();
            }
            catch(e) {
                message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(config.color).setTitle('Provide a valid URL')]});
            }
        });
    }
}