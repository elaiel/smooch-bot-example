'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Grüezi ich bin der CV Bot von Michael Klaas! Ich kann Dir alles zu seinem CV erzählen!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('Aber zuerst: Wie heisst Du (Damit ich dich auch korrekt ansprechen kann)?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Super! Danke! Also ich nenne dich dann ab jetzt ${name}
Ist das OK? %[Ja](postback:yes) %[Nein](postback:no)`))
                .then(() => 'listOptions');
        }
    },
    listOptions: {
        prompt: (bot) => bot.say('Ok, also was genau willst du über Michael wissen?'),
        prompt: (bot) => bot.say('%[Berufliche Laufbahn](postback:berufe) %[Akademische Laufbahn](postback:akademia) %[Skills](postback:skills)  %[Sprachen](postback:sprachen)  %[Projekte](postback:projekte)'),
        receive: (bot, message) => {
            switch (txt) {
                case "berufe":
                    return bot.say('To get a free consultation. Tell me more about yourself.\n What\'s your name?')
                        .then(() => 'berufe');
                case "akademia":
                    return bot.say('To get a free consultation. Tell me more about yourself.\n What\'s your name?')
                        .then(() => 'akademia');
                case "skills":
                    return bot.say('To get a free consultation. Tell me more about yourself.\n What\'s your name?')
                        .then(() => 'skills');
                case "sprachen":
                    return bot.say('To get a free consultation. Tell me more about yourself.\n What\'s your name?')
                        .then(() => 'sprachen');
                case "projekte":
                    return bot.say('To get a free consultation. Tell me more about yourself.\n What\'s your name?')
                        .then(() => 'projekte');
                case "quiz":
                    //
                    return false;
            }
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Tut mir leid, ${name}, das konnte ich nicht verstehen ` +
                        'da muss ich noch ein paar mehr Worte lernen!'))
                .then(() => 'finish');
        }
    }
});
