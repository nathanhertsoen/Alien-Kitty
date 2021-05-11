
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');



// const { prefix } = require('../../config/config.json');
// const axios = require('axios');
// const { TextBasedChannel } = require('discord.js');
// const { randomResponsesLines } = require('../../resources/quid/randomResponsesLines.js');


module.exports = class RintCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'rint',
            aliases: ['rom', 'romanize', 'roman-int'],
            group: 'rint',
            memberName: 'rint',
            description: 'rint',
            args: [
                {
                    key: 'number',
                    prompt: 'Romanize your integer',
                    type: 'integer',
                    default: '10',
                    // validate: lemma => lemma.split(' ').length == 1,
                },
            ],
        });
    }
    


    run(msg, { number}) {
        if (isNaN(number)) return NaN;
        const initPromise = (number) => {
            return new Promise((resolve, reject) => {

                var digits = String(+number).split(""),
                    key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
                    roman = "",
                    i = 3;
                while (i--) {
                    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
                    var setResult = Array(+digits.join("") + 1).join("M") + roman;
                }
                if (isNaN(number) || number > 3999) {
                    reject("Échec");
                } else {
                    resolve(setResult);
                }
            });
        }
        
        function resolve(GetResult) {
            console.log("L'opération a réussi avec le message : " + GetResult);
            // msg.say({ embed: { color: 0x5CE1E6, description: "Let's copy this !\n" + num + " = " + result  } });

            const messageEmbed = new Discord.MessageEmbed()
                .setColor('0xfff89c')
                .setTitle('Romanize INTeger')
                .setURL('https://discord.js.org/')
                .setAuthor('Alien Kitty', 'https://i.imgur.com/p8h5byD.png', 'https://discord.js.org')
                // .setDescription('Convert arabic numbers to roman numbers')
                .setThumbnail('https://i.imgur.com/p8h5byD.png')
                .addFields(
                    // { name: '\u200B', value: '\u200B' },
                    { name: "Roman : " + GetResult, value: "Arabic : " + number },

                    { name: '\u200B', value: '\u200B' },
                    // { name: 'Inline field title', value: 'Some value here', inline: true },
                    // { name: 'Inline field title', value: 'Some value here', inline: true },
                    // { name: '\u200B', value: '\u200B' },
                )
                // .addField('Inline field title', 'Some value here', true)

                // .setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter('Use &help to see other commands', 'https://i.imgur.com/ib9i4bp.png');

            msg.say(messageEmbed);
         }


        function reject(error) {
            console.error("L'opération a échoué avec le message : " + error);
            msg.say("L'opération a échoué avec le message : " + error);
        }

        initPromise(number).then(resolve, reject);

    }
};
                


        
        //  const romanize = (takethis) =>  {
            
        //      var digits = String(+takethis).split(""),
        //     key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        //     "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        //     "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        //     roman = "",
        //     i = 3;
        //     while (i--)
        //         roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        //         return Array(+digits.join("") + 1).join("M") + roman;
        // }


        // // console.log(banane);
        // const data = romanize(num);
        // msg.say(data);



        //////////////////////////////////////////////////////*


        // const myPromise = new Promise((resolve, reject) => {
        //     var digits = String(+num).split(""),
        //     key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        //     "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        //     "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        //     roman = "",
        //     i = 3;
        //     while (i--) {
        //         roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        //         var result = Array(+digits.join("") + 1).join("M") + roman;
        //     }
        //     !result ? reject('Promise is rejected') : resolve('Promise is resolved successfully.');
        // });

        // myPromise.then((message) => {
        //     console.log(message);
        
        // }).catch((message) => {
        //     console.log(message);
        // });
        

        //////////////////////////////////////////////////////


        // const initPromise = (num) => {
        //     return new Promise((resolve, reject) => {  
                
        //         console.log("Premier traitement");
        //         if (isNaN(num)) {
        //             reject("Échec");
        //         } else {
        //             resolve(num)
        //             .then(function(num){
        //                 var digits = String(+num).split(""),
        //                     key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        //                         "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        //                         "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        //                     roman = "",
        //                     i = 3;
        //                 while (i--) {
        //                     roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        //                     return Array(+digits.join("") + 1).join("M") + roman;
        //                 }
        //             })
                    
        //         }
        //     });
        // }

        // function resolve(result) {
        //     console.log("L'opération a réussi avec le message : " + result);
        //     msg.say("L'opération a réussi avec le message : " + result);
        // }


        // function reject(error) {
        //     console.error("L'opération a échoué avec le message : " + error);
        //     msg.say("L'opération a échoué avec le message : " + error);
        // }

        //  const promise1 = Promise.resolve(123);

        // initPromise(num).then(resolve, reject);

        
       
        ////////////////////////////////////////////////////


        // function faireQqc() {
        //     return new Promise((successCallback, failureCallback) => {
        //         console.log("C'est fait");
        //         // réussir une fois sur deux
        //         (Math.random() > .5) ? successCallback("Réussite") : failureCallback("Échec");
        //     })
        // }

        // function successCallback(résultat) {
        //     console.log("L'opération a réussi avec le message : " + résultat);
        // }


        // function failureCallback(erreur) {
        // console.error("L'opération a échoué avec le message : " + erreur);
        // }

        // faireQqc().then(successCallback, failureCallback);


// const ResponsesLines = randomResponsesLines[Math.floor(Math.random() * randomResponsesLines.length)];
// message.say(ResponsesLines);