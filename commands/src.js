const puppeteer = require('puppeteer');
const fs = require('fs');
const validurl = require('valid-url');

const config = require('../config.json')

module.exports = {
    name: 'src',
    description: 'View contents of a webpage',
    async execute(message, args, Discord) {
        await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
            if (validurl.isUri(args.toString())) {
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
                })
                browser.close();
            }
            else {
                message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(config.color).setTitle('Provide a valid URL')]});
            };
        });
    }
}