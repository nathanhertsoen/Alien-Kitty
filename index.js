const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { runInContext } = require('vm');

const { token } = require('./config/config.json');

const client = new CommandoClient({
    commandPrefix: '&',
    owner: '231084367647080448',
    // invite: 'https://discord.gg/bRCvFy9',
});

client.registry

    .registerDefaultTypes()
    .registerGroups([
        // PRODUCTION
        ['quid', 'Searching latin word informations for user'],
        ['def', 'pokemon ?'],
        ['rint', 'Current numbers to Roman integer'],
        ['iss', "C'est le groupe des commandes de base"],
        ['pokemon', 'pokemon ?'],
        
        
        
        
        // DEVLOPMENT
        // TESTING
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: true,
        prefix: false,
        ping: false,
        eval: false,
        unknownCommand: true,
        commandState: true
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

    
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('consommer du CRUD');
});

client.on('error', console.error);

client.login(token);