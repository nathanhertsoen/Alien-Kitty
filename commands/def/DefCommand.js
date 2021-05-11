const { Command } = require('discord.js-commando');
const axios = require('axios');
const { TextBasedChannel, ReactionUserManager } = require('discord.js');

const { morphoPossibility } = require('../../resources/quid/magistratus.js');
const { randomFoundedResearchLines } = require('../../resources/quid/randomFoundedResearchLines.js');


module.exports = class DefCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'def',
            aliases: ['def'],
            group: 'def',
            memberName: 'def',
            description: 'Searching latin word defintions for user',
            throttling: {
                usages: 3,
                duration: 5, //seconds
            },
            args: [
                {
                    key: 'lemma',
                    prompt: 'The latin word that you need informations',
                    type: 'string',
                },
                {
                    key: 'param',
                    prompt: 'What is this other useless thing?',
                    type: 'string',
                    oneOf: ['lite', 'meta', 'meto'],
                    default: 'lite',
                },
            ],
        });
    }

    async run(msg, { lemma, param }) {



        axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/synsets')

            .then((result) => {
                const globalElement = result.data['results'];
                if (globalElement.length >= 2000) { return msg.say('Response is too length !'); }

                // globalElement.length > 2000 ?  msg.say('Response is too length !') : msg.say('Ok!');
                // globalElement.forEach(array => console.log(array['word']));

                // DEBUG
                // globalElement.forEach(element => element);
                // const _message = JSON.stringify(globalElement, null, 2);
                // return msg.say('```json\n' + _message +  '\n```');
                //////DEBUG PHONETICAL
                // var phonetic = globalElement[0]['phonological_transcription'];
                // var trans = phonetic[0]['ipa'];
                //////////////////////


                var elementCounter = globalElement.length;
                // console.log(globalElement.length);return;
                if (!elementCounter) { return msg.say('No match found !'); }

                const posPossibility = { 'v': '𝐯𝐞𝐫𝐛', 'n': '𝐧𝐨𝐮𝐧', 'a': '𝐚𝐝𝐣𝐞𝐜𝐭𝐢𝐯𝐞', 'r': '𝐚𝐝𝐯𝐞𝐫𝐛', '': 'undefined', ' ': '𝚞𝚗𝚍𝚎𝚏𝚒𝚗𝚎𝚍' };
                // console.log('elementCounter : ' + globalElement.length);
                for (var elementID = 0; elementID < elementCounter; ++elementID) {

                    var elementIndex = globalElement[elementID];
                    var morpho = elementIndex['morpho'];
                    var morpho = morphoPossibility[morpho];

                    // var indexFinder = ('***' + (elementID + 1) + '***' + '  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 𝓣𝓪𝓫𝓵𝓮 𝓞𝓯 𝓘𝓷𝓭𝓮𝔁 ' + '\n\n' +
                    var indexFinder = ('***' + '~ ~ ~ ~ ~ ~' + '***' + '  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 𝓣𝓪𝓫𝓵𝓮 𝓞𝓯 𝓘𝓷𝓭𝓮𝔁 ' + '\n\n' +


                        '*' + morpho + '*' + '\n'

                        + '\n');


                    var synsets = elementIndex['synsets'];
                    var literal = synsets['literal'];
                    var metonymic = synsets['metonymic'];

                    if (param === 'lite') {
                        const literalCounter = literal.length;
                        // console.log('literalCounter : ' + literalCounter);
                        for (var literalID = 0; literalID < literalCounter; ++literalID) {


                            var literalIndexArray = literal[literalID];
                            var language = literalIndexArray['language']['abbrev'];
                            var pos = literalIndexArray['pos'];
                            var pos = posPossibility[pos];
                            var defintion = literalIndexArray['gloss'];
                            var semfield = literalIndexArray['semfield'];

                            indexFinder += ('𝐋𝐢𝐭𝐞𝐫𝐚𝐥 𝐃𝐞𝐟𝐢𝐧𝐢𝐭𝐢𝐨𝐧 ' + '**' + (literalID + 1) + '**' + '\n\n' +

                                '[ ' + language + ' ] : ' + defintion + '\n'

                                + '\n');

                            const semfieldCounter = semfield.length;
                            for (var semfieldID = 0; semfieldID < semfieldCounter; ++semfieldID) {


                                var semfieldIndexArray = semfield[semfieldID];
                                var semfieldDefintion = semfieldIndexArray['english'];

                                indexFinder += (
                                    (semfieldID + 1) + ' : ' + semfieldDefintion + '\n'
                                    + '\n');
                            }
                        }
                    }


                    if (param === 'meto') {

                        const metonymicCounter = metonymic.length;
                        // console.log('metonymicCounter : ' + metonymicCounter)
                        for (var metonymicID = 0; metonymicID < metonymicCounter; ++metonymicID) {
                            var metonymicIndexArray = metonymic[metonymicID];
                            var metonymicLanguage = metonymicIndexArray['language']['abbrev'];
                            // var metonymicPos = metonymicIndexArray['pos'];
                            var metonymicDefinition = metonymicIndexArray['gloss'];
                            var metonymicSemfield = metonymicIndexArray['semfield'];

                            indexFinder += ('𝐌𝐞𝐭𝐨𝐧𝐲𝐦𝐢𝐜 𝐃𝐞𝐟𝐢𝐧𝐢𝐭𝐢𝐨𝐧 ' + '**' + (metonymicID + 1) + '**' + '\n\n' +

                                '[ ' + metonymicLanguage + ' ] : ' + metonymicDefinition + '\n'

                                + '\n');

                            const metonymicSemfieldCounter = metonymicSemfield.length;
                            for (var metonymicSemfielID = 0; metonymicSemfielID < metonymicSemfieldCounter; ++metonymicSemfielID) {

                                var semfieldIndexArray = metonymicSemfield[metonymicSemfielID];
                                var semfieldDefintion = semfieldIndexArray['english'];

                                indexFinder += (
                                    (metonymicSemfielID + 1) + ' : ' + semfieldDefintion + '\n'
                                    + '\n');
                            }
                        }

                    }

                    if (param === 'meta') {
                        return msg.say('better call \'meto\'')
                    }


                }
                var superTable = ({ embed: { color: 0xfff89c, description: indexFinder } });
                const FoundedResearchLines = randomFoundedResearchLines[Math.floor(Math.random() * randomFoundedResearchLines.length)];
                msg.say("<@" + msg.author.id + ">" + FoundedResearchLines);
                msg.say(superTable);
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