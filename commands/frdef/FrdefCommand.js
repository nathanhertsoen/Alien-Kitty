const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { apiKey } = require('../../config/config.json');
const axios = require('axios');
const { TextBasedChannel } = require('discord.js');

const { morphoPossibility } = require('../../resources/quid/magistratus.js');
const { randomFoundedResearchLines } = require('../../resources/quid/randomFoundedResearchLines.js');


module.exports = class FrdefCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'frdef',
            aliases: ['french, français, franc'],
            group: 'frdef',
            memberName: 'frdef',
            description: 'French definition for words',
            throttling: {
                usages: 3,
                duration: 5, //seconds
            },
            args: [
                {
                    key: 'lemma',
                    prompt: 'The french word that you need informations',
                    type: 'string',
                    default: 'rose',
                    // validate: lemma => lemma.split(' ').length == 1,
                },
            ],
        });
    }

    async run(msg, { lemma }) {


        function escapeHtml(lemma) {
            return lemma.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }

        await axios.get('https://api.dicolink.com/v1/mot/' + lemma + '/definitions?limite=1&api_key=' + apiKey + '')




            .then(async (result) => {
                const globalElement = result.data;
                // globalElement.forEach(array => console.log(array['lemma']));

                // DEBUG
                // globalElement.forEach(element => element);
                // const _message = JSON.stringify(globalElement, null, 2);
                // return msg.say('```json\n' + _message +  '\n```');
                //////DEBUG PHONETICAL
                // var phonetic = globalElement[0]['phonological_transcription'];
                // var trans = phonetic[0]['ipa'];
                //////////////////////
                // Object.entries(result).forEach(([key, value]) => {
                //     console.log(`${key} ${value}`);
                // });
                //////////////////////

                // console.log(globalElement.length);return;
                var indexNumber = globalElement.length;
                if (!indexNumber) { return msg.say('No match found !'); }

                const FoundedResearchLines = randomFoundedResearchLines[Math.floor(Math.random() * randomFoundedResearchLines.length)];
                msg.say("<@" + msg.author.id + ">" + FoundedResearchLines);

                // console.log('LONGUEUR DU TABLEAU : ' + globalElement.length);
                for (let i = 0; i < indexNumber; ++i) {
                    // console.log(i);
                    // var IPAindex = i;
                    var elementIndex = globalElement[i];

                    var mot = elementIndex['mot'];
                    var nature = elementIndex['nature'];
                    var source = elementIndex['source'];
                    var definition = elementIndex['definition'];
                    var dicolinkUrl = elementIndex['dicolinkUrl'];




                    // var phonologicalTranscriptionArray = elementIndex['phonological_transcription'];
                    // console.log(phonologicalTranscriptionArray = elementIndex['phonological_transcription']);

                    

                    const messageEmbed = new Discord.MessageEmbed()
                        .setColor('0xfff89c')
                        .setTitle('Définition Française')
                        .setURL('https://discord.js.org/')
                        // .setAuthor('Alien Kitty', 'https://i.imgur.com/p8h5byD.png', 'https://discord.js.org')
                        // .setDescription('Convert arabic numbers to roman numbers')
                        .setThumbnail('https://i.imgur.com/p8h5byD.png')
                        .addFields(
                            // { name: '\u200B', value: '\u200B' },
                            { name: mot[0].toUpperCase() + mot.substring(1), value: definition },

                            { name: '\u200B', value: '\u200B' },
                            { name: 'Nature', value: nature[0].toUpperCase() + nature.substring(1), inline: true },
                            { name: 'Source', value: source[0].toUpperCase() + source.substring(1), inline: true },
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Dicolink Url', value: dicolinkUrl },
                            { name: '\u200B', value: '\u200B' },
                            
                        )
                        // .addField('Inline field title', 'Some value here', true)

                        // .setImage('https://i.imgur.com/wSTFkRM.png')
                        .setTimestamp()
                        .setFooter('Use &help to see other commands', 'https://i.imgur.com/ib9i4bp.png');

                    await msg.say(messageEmbed);


                    // msg.say('```md\n' + '*' + 'Index Number : ' + (i + 1) + '*'+ '\n' +
                    // '_______________________' + '\n' + '\n' +
                    // 'lemma - ' +  lemma +'\n'+
                    // 'function - : ' + pos + '\n' +
                    // 'morpho : ' + morpho + '\n' +
                    // 'prosody : ' + prosody + '\n' +
                    // 'principal(s) part(s) : ' + principal_parts +
                    // '\n```');
                }
                // console.log('terminé');return;
                // const lemma = globalElement[0]['lemma'];


                // console.log(typeof globalElement); return;
                // globalElement.forEach(element => element);
                // console.log(globalElement); return;

                // const _message = JSON.stringify(globalElement, null, 2);
                // return msg.say('```json\n' + _message + '\n```');
            })

            .catch((err) => {
                console.error('ERR', err);
            })

        ////////////////////////////////////////////////////////////////////////////////////

        // run = async (message, {pos, lemma}) => {
        //     pos ? message.say(mediumScopeSearch()) : message.say(largeScopeSearch(lemma));

        //      async function largeScopeSearch(lemma) {
        //         if(lemma){
        //                 const promesse = new Promise((resolve, reject )=> {
        //                     axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/')
        //                         .then((result) => {
        //                             var globalElement = result.data['results'];
        //                             globalElement.forEach(element => element);

        //                             const _msgs = JSON.stringify(globalElement, null, 2);
        //                             // console.log(_msgs);
        //                             return message.say('```json\n' + _msgs + '\n```');
        //                         })
        //                         .catch((err) => {
        //                             console.error('ERR', err);
        //                         })
        //                 });
        //         }

        //     }


        ////////////////////////////////////////////////////////////////////////////////////

        // async function largeScopeSearch(lemma) {
        //     console.log('lemma : ' + lemma);

        //     return new Promise(resolve => {
        //             axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/')
        //             .then((result) => {
        //                 var globalElement = result.data['results'];
        //                 globalElement.forEach(element => element);

        //                 const _msgs = JSON.stringify(globalElement, null, 2);
        //                 // console.log(_msgs);
        //                 return message.say('```json\n' + _msgs + '\n```');
        //             })
        //             .catch((err) => {
        //                 console.error('ERR', err);
        //             })
        //     });
        // }

        ////////////////////////////////////////////////////////////////////////////////////

        // function mediumScopeSearch(){

        //     axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/' + pos + '/')
        //         .then((result) => {
        //             var globalElement = result.data['results'];
        //             globalElement.forEach(element => element);

        //             const _msgs = JSON.stringify(globalElement, null, 2);
        //             // console.log(_msgs);
        //             return message.say('```json\n' + _msgs + '\n```');
        //         })
        //         .catch((err) => {
        //             console.error('ERR', err);
        //         })

        // }

        // console.log(text);
        // console.log('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/' + pos + '/');
        // return message.reply('https://latinwordnet.exeter.ac.uk/api/lemmas/'+text+'/');
        // axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/furor')
    }
};
