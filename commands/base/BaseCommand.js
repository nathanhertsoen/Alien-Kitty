const { Command } = require("discord.js-commando");
const { TextBasedChannel } = require('discord.js');
const axios = require('axios');

const fetch = require('node-fetch');

module.exports = class BaseCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'iss',
            aliases: ['iss'],
            group: 'iss',
            memberName: 'iss',
            description: 'Voici la commande de l\'iss',
            throttling: {
                usages: 3,
                duration: 5,
            }
        });
    }

    run(message) {
        message.say('Voici la position de l\'ISS en direct :');
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.wheretheiss.at/v1/satellites/25544');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                let resultInfosISS = JSON.parse(this.responseText);
                if (resultInfosISS["name"] != "") {
                    let lat = resultInfosISS["latitude"];
                    let long = resultInfosISS["longitude"];
                    message.channel.send({
                        files: [{
                            attachment: 'https://open.mapquestapi.com/staticmap/v4/getmap?key=P2anpbQzojaxWbzgFaCfyIVd2N5uBFI3&size=800,600&zoom=2&center=' + lat + ',' + long + '&pois=ISS,' + lat + ',' + long + ',-20,-20&type=hyb',
                            name: 'positionISS.jpg'
                        }]
                    })
                }
            } else {
                console.log("error");
                return xhr.statusText;
            }
        };
        xhr.onerror = function () {
            return xhr.statusText;
        };
        xhr.send();
    }
};