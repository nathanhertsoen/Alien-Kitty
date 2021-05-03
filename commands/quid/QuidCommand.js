const { Command } = require('discord.js-commando');
const { prefix } = require('../../config/config.json');
const axios = require('axios');
const { TextBasedChannel } = require('discord.js');

const { morphoPossibility } = require('../../resources/quid/magistratus.js');
const { randomFoundedReseachLines } = require('../../resources/quid/randomFoundedReseachLines.js');


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
    
     run(msg, { lemma }) {
            const API = axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/')
                
                .then(async(result) => {
                const globalElement = result.data['results'];
             
                var indexCounter = globalElement.length;
                if (!indexCounter){return msg.say('No match found !');}
                
                const FoundedReseachLines = randomFoundedReseachLines[Math.floor(Math.random() * randomFoundedReseachLines.length)];
                msg.say("<@" + msg.author.id + ">" + FoundedReseachLines);

                const posPossibility = { 'v': '𝐯𝐞𝐫𝐛', 'n': '𝐧𝐨𝐮𝐧', 'a': '𝐚𝐝𝐣𝐞𝐜𝐭𝐢𝐯𝐞', 'r': '𝐚𝐝𝐯𝐞𝐫𝐛', '': 'undefined', ' ': '𝚞𝚗𝚍𝚎𝚏𝚒𝚗𝚎𝚍' };
                // console.log('LONGUEUR DU TABLEAU : ' + globalElement.length);
                    for (var elementID = 0; elementID < indexCounter; ++elementID){
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



                    var indexFinder = ('  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ '+ '**' + (elementID + 1) + '**'+' ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 𝓣𝓪𝓫𝓵𝓮 𝓞𝓯 𝓘𝓷𝓭𝓮𝔁 ' + '\n\n' +

                        'International Phon. Alpha.  :  ' + IPA  + '\n\n' +

                        'Lemma : '      + lemma + '\n' +
                        'Function : '    + pos + '\n' +
                        'Morpho : '       + morpho + '\n' +
                        'Prosody : '      + prosody + '\n' +
                        'Radical : '      + principalParts + '\n');
                    
                    await msg.say({ embed: { color: 0x9d0c0c, description: indexFinder }});
                }     
            })
            .catch((err) => {
                console.error('ERR', err);
            })
    }
};
