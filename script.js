'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Michaels Bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('Wie heisst du?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Super! Dann nenne ich dich ${name}
Ist das OK? Ich bleibe mal beim Du, das Michael noch nicht herausgefunden hat, wie die verschiedenen Anreden integriert werden können. %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`${name}, Entschuldige bitte, das habe ich nicht verstanden ` +
                        'da muss ich wohl noch mehr Wörter lernen!'))
                .then(() => 'finish');
        }
    }
});
