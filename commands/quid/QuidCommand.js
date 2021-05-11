const { Command } = require('discord.js-commando');
const { prefix } = require('../../config/config.json');
const axios = require('axios');
const { TextBasedChannel } = require('discord.js');

const { morphoPossibility } = require('../../resources/quid/magistratus.js');
const { randomFoundedResearchLines } = require('../../resources/quid/randomFoundedResearchLines.js');


module.exports = class QuidCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'quid',
            aliases: ['qvid'],
            group: 'quid',
            memberName: 'quid',
            description: 'Searching latin word informations for user',
            throttling: {
                usages: 3,
                duration: 5, //seconds
            },
            args: [
                {
                    key: 'lemma',
                    prompt: 'The latin word that you need informations',
                    type: 'string',
                    default: 'rosa',
                    // validate: lemma => lemma.split(' ').length == 1,
                },
            ],
        });
    }

    async run(msg, { lemma }) {


        function escapeHtml(lemma) {
            return lemma.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }

        const API = await axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + escapeHtml(lemma) + '/')




            .then(async (result) => {
                const globalElement = result.data['results'];
                // globalElement.forEach(array => console.log(array['lemma']));

                //DEBUG
                // globalElement.forEach(element => element);
                // const _message = JSON.stringify(globalElement, null, 2);
                // return msg.say('```json\n' + _message +  '\n```');
                //////DEBUG PHONETICAL
                // var phonetic = globalElement[0]['phonological_transcription'];
                // var trans = phonetic[0]['ipa'];
                //////////////////////

                // console.log(globalElement.length);return;
                var indexCounter = globalElement.length;
                if (!indexCounter) { return msg.say('No match found !'); }

                const FoundedResearchLines = randomFoundedResearchLines[Math.floor(Math.random() * randomFoundedResearchLines.length)];
                msg.say("<@" + msg.author.id + ">" + FoundedResearchLines);

                const posPossibility = { 'v': '𝐯𝐞𝐫𝐛', 'n': '𝐧𝐨𝐮𝐧', 'a': '𝐚𝐝𝐣𝐞𝐜𝐭𝐢𝐯𝐞', 'r': '𝐚𝐝𝐯𝐞𝐫𝐛', '': 'undefined', ' ': '𝚞𝚗𝚍𝚎𝚏𝚒𝚗𝚎𝚍' };
                // console.log('LONGUEUR DU TABLEAU : ' + globalElement.length);
                for (var elementID = 0; elementID < indexCounter; ++elementID) {
                    // console.log(i);
                    // var IPAindex = i;
                    var elementIndex = globalElement[elementID];

                    // var phonologicalTranscriptionArray = elementIndex['phonological_transcription'];
                    // console.log(phonologicalTranscriptionArray = elementIndex['phonological_transcription']);


                    var transcription = elementIndex['phonological_transcription'];
                    // console.log(transcription);

                    var IPA = elementIndex['phonological_transcription'];
                    var IPA = IPA[0]['ipa'];

                    // var IPA = phonologicalTranscriptionArray['ipa'];
                    // console.log(IPA[i], ' : ', typeof IPA[i]['ipa'] );
                    var lemma = elementIndex['lemma'];

                    var pos = elementIndex['pos'];
                    var pos = posPossibility[pos];

                    var morpho = elementIndex['morpho'];
                    var morpho = morphoPossibility[morpho];

                    var prosody = elementIndex['prosody'];
                    var principalParts = elementIndex['principal_parts'];



                    var indexFinder = ('  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ' + '**' + (elementID + 1) + '**' + ' ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 𝓣𝓪𝓫𝓵𝓮 𝓞𝓯 𝓘𝓷𝓭𝓮𝔁 ' + '\n\n' +

                        'International Phon. Alpha.  :  ' + '`' + IPA + '`' + '\n\n' +

                        'Lemma : ' + lemma + '\n' +
                        'Function : ' + pos + '\n' +
                        'Morpho : ' + morpho + '\n' +
                        'Prosody : ' + prosody + '\n' +
                        'Radical : ' + principalParts + '\n');

                    await msg.say({ embed: { color: 0xfff89c, description: indexFinder } });


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
