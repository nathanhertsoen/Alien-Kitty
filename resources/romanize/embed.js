const Discord = require('discord.js');
// const { result, num } = require('../../commands/RomanNumbers/RomanNumbers');

const messageEmbed = new Discord.MessageEmbed()
    .setColor('0x5CE1E6')
    .setTitle('Romanize Number')
    .setURL('https://discord.js.org/')
    .setAuthor('Herts.Nathan', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    .setDescription('Convert arabian number to roman shit')
    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'test', value: 'test' },
        // { name: '\u200B', value: '\u200B' },
        // { name: 'Inline field title', value: 'Some value here', inline: true },
        // { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: '\u200B', value: '\u200B' },
    )
    // .addField('Inline field title', 'Some value here', true)
    
    // .setImage('https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

module.exports = { messageEmbed};