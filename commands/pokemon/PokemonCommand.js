const { Command } = require('discord.js-commando');
const axios = require('axios');
const { TextBasedChannel } = require('discord.js');

module.exports = class PokemonCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'pokemon',
            aliases: ['pokemon'],
            group: 'pokemon',
            memberName: 'pokemon',
            description: 'Searching latin word informations for user',
            throttling: {
                usages: 3,
                duration: 5, //seconds
            },
            args: [
                {
                    key: 'pokemon',
                    prompt: 'The latin word that you need informations',
                    type: 'string',
                    default: 'rosa',
                    // validate: lemma => lemma.split(' ').length == 1,
                },
            ],
        });
    }
    
    run(msg, { pokemon }) {


        const API = axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon + '/')
                .then((result) => {
                    var globalElement = result.data['abilities'];
                    globalElement.forEach(element => element);

                    const _msgs = JSON.stringify(globalElement, null, 2);
                    // console.log(_msgs);
                    return msg.say('```json\n' + _msgs + '\n```');
                })
                .catch((err) => {
                    console.error('ERR', err);
                })

    }
};
