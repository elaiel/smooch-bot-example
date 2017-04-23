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
        prompt: (bot) => bot.say('Aber zuerst: Wie heisst Du? (Damit ich dich auch korrekt ansprechen kann)'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Super! Danke! Also ich nenne dich dann ab jetzt ${name}!`))
                .then(() => 'navigation');
        }
    },
    
    navigation: {
        prompt: (bot) => bot.say('${name}, was genau möchtest du wissen? (Lebenslauf, Privates, Kontakt)'),
        receive: (bot, message) => {
            const navoption = message.text;
            switch (navoption) {
                case "Lebenslauf":
                    return bot.setProp('navoption', navoption)
                        .then(() => bot.say('OK, ich schau mal nach seinem Lebenslauf!'))
                        .then(() => 'LebenslaufOptions');
                case "Privates":
                    return bot.setProp('navoption', navoption)
                        .then(() => bot.say('Oha also private Informationen .... hmmmm ....'))
                        .then(() => 'LebenslaufOptions');
                case "Kontakt":
                    return bot.setProp('navoption', navoption)
                        .then(() => bot.say('Hmm ${name}, wenn Du mit Michael direkt in Kontakt treten möchtest, schreibe ihn doch direkt per Email an: \n michael.klaas At zhaw.ch.'))
                        .then(() => 'navigation');
            }
        }
    },
    
    LebenslaufOptions: {          
        prompt: (bot) => bot.say('%[Berufliche Laufbahn](postback:berufe) %[Akademische Laufbahn](postback:akademia) %[Skills](postback:skills)  %[Sprachen](postback:sprachen)  %[Projekte](postback:projekte)'),      
        receive: (bot, message) => {
            
            const llselection = message.text;
            bot.say(message.text);
            switch (llselection) {
                case "berufe":
                    return bot.setProp('llselection', llselection)
                        .then(bot.say('Auswahl: Berufliche Laufbahn also'))
                        .then(() => 'berufeOptions');
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
            }
        },
        receive: (bot,postback) => {
            const llselection = postback.action.payload;
            
            bot.say(postback.action.payload);
            switch (llselection) {
                case "berufe":
                    return bot.setProp('llselection', llselection)
                        .then(bot.say('Auswahl: Berufliche Laufbahn also'))
                        .then(() => 'berufeOptions');
                case "akademia":
                    return bot.setProp('llselection', llselection)
                        .then(bot.say('Akademische Laufbahn soll es also sein'))
                        .then(() => 'akademia');
                case "skills":
                    return bot.setProp('llselection', llselection)
                        .then(bot.say('Was heisst Skills eigentlich in deutsch? Ich suche nach Fähigkeiten ...'))
                        .then(() => 'skills');
                case "sprachen":
                    return bot.setProp('llselection', llselection)
                        .then(bot.say('I m looking for Michaels ... Sprachfähigkeiten ...'))
                        .then(() => 'sprachen');
                case "projekte":
                    return bot.setProp('llselection', llselection)
                        .then(bot.say('Michael ist ständing in irgendwelchen Projekten - hier ein paar Beispiele:'))
                        .then(() => 'projekte');
            }
        }
        
    },
    
    berufeOptions: {
        prompt: (bot) => bot.say('Hmm, wo genau hat Michael doch gleich gearbeitet bzw. wo arbeitet er... %[alle anzeigen](postback:alleberufe) %[ZHAW](postback:zhaw) %[HILTI](postback:hilti)  %[Universität St. Gallen](postback:hsg)  %[SAP](postback:sap)'),
        receive: (bot, postback) => {
            const berufeselection = postback.action.payload;
            switch (berufeselection) {
                case "zhaw":
                    return bot.setProp('berufeselection', berufeselection)
                        .then(() => bot.say('Also die ZHAW'))
                        .then(() => 'zhaw');
            }
        }
    },
    
        akademia: {
        prompt: (bot) => bot.say('Michael hat eine sehr gut akademische Ausbildung durchlaufen, um genau zu sein, waren es die folgenden Stationen ... %[alle anzeigen](postback:alleberufe) %[Universität St. Gallen](postback:hsg) %[Universität Duisburg-Essen](postback:essen)  %[TU Bergakademie Freiberg](postback:Freiberg)  %[zurück](postback:LebenslaufOptions)'),
        receive: (bot, postback) => {
            const akademiaselection = postback.action.payload;
            switch (akademiaselection) {
                case "zhaw":
                    return bot.setProp('akademiaselection', akademiaselection)
                        .then(() => bot.say('Also die ZHAW'))
                        .then(() => 'zhaw');
            }
        }
    },

    zhaw: {
        prompt: (bot) => bot.say('An der ZHAW ist Michael Leiter der Fachstelle für integrierte Kommunikation und Dozent für digitales Marketing und Social Media. \n Er startete im Mai 2015 und beschäftigt sich hauptsächlich mit den folgenden Themen: \n Studiengangsleiter für Digitales Marketing mit Themenschwerpunkten in den Bereichen Digitales Marketing \n Social Media \n Service Design \n Design Thinking \n Customer-Experience-Management. \n %[Akademische Laufbahn](postback:akademia)'),
        receive: (bot, postback) => {
            const zhawselection = postback.action.payload;
            switch (zhawselection) {
                case "berufe":
                    return bot.say('Zurück zu den Berufen?')
                        .then(() => 'berufe');
            }
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Tut mir leid, ${name}, das konnte ich nicht verstehen ` +
                        'da muss ich noch ein paar mehr Worte lernen!'))
                .then(() => 'navigation');
        }
    }
});
