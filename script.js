'use strict';

const Script = require('smooch-bot').Script;
const scriptRules = require('./script.json');

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! Ich bin Michaels persönlicher Bot! Willst du etwas über ihn erfahren, frage mich einfach!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('Damit ich dich korrekt anspreche, nenne mir doch bitte Deinen Namen?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Super! Dann nenne ich dich ${name}
Ist das OK? Ich bleibe mal beim Du, das Michael noch nicht herausgefunden hat, wie die verschiedenen Anreden integriert werden können. %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'speak');
        }
    },
        speak: {
        receive: (bot, message) => {

            let upperText = message.text.trim().toUpperCase();

            function updateSilent() {
                switch (upperText) {
                    case "CONNECT ME":
                        return bot.setProp("silent", true);
                    case "DISCONNECT":
                        return bot.setProp("silent", false);
                    default:
                        return Promise.resolve();
                }
            }

            function getSilent() {
                return bot.getProp("silent");
            }

            function processMessage(isSilent) {
                if (isSilent) {
                    return Promise.resolve("speak");
                }

                if (!_.has(scriptRules, upperText)) {
                    return bot.say(`I didn't understand that.`).then(() => 'speak');
                }

                var response = scriptRules[upperText];
                var lines = response.split('\n');

                var p = Promise.resolve();
                _.each(lines, function(line) {
                    line = line.trim();
                    p = p.then(function() {
                        console.log(line);
                        return bot.say(line);
                    });
                })

                return p.then(() => 'speak');
            }

            return updateSilent()
                .then(getSilent)
                .then(processMessage);
        }
    }

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`${name}, entschuldige bitte, das habe ich noch nicht verstanden ` +
                        'da muss ich wohl noch mehr Wörter lernen!'))
                .then(() => 'finish');
        }
    }
});
