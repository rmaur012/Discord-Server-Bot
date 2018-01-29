var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var tourneys = require('./tourneys.json');
var info = require('./info.json');

var quotes = ["\"You need to stop.\" -Joe", "\"Eddy, you're a FUCKING WEEB!\" -Jojo", "\"This is why I went to the math department.\" -Pablo", "\"Am I right fellas?\" -Danny", "\"Joe I'll do a $100 money match once I go 4-2, I swear to god. Eskeetit\" -Yoshi Main"];
var quoteIndex = 0;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

function getRNGInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendMessage(reply, channelID){
    bot.sendMessage({
        to: channelID,
        message: reply
    });
}

function displayTourneyInfo(place, channelID) {
    sendMessage('Challonge: ' + place.challonge + '\nStream: ' + place.stream, channelID);
}

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'hi':
                sendMessage('Hello, I main Bayonetta.', channelID);
                
                break;
            case 'quote':
                sendMessage(quotes[quoteIndex], channelID);
                quoteIndex = quoteIndex + 1;
                if (quoteIndex == quotes.length) {
                    quoteIndex = 0;
                }
                break;

            case 'tourney':
                var type = args[0];
                switch (type) {
                    case 'ao':
                    case 'AO':
                        {
                            displayTourneyInfo(tourneys.ao, channelID);
                        }
                        break;
                    case 'vs':
                    case 'VS':
                        {
                            displayTourneyInfo(tourneys.vs, channelID);
                        }
                        break;
                    case 'ecg':
                    case 'ECG':
                        {
                            displayTourneyInfo(tourneys.ecg, channelID);
                        }
                        break;
                    default:
                        sendMessage('You didn\'t say which tournament.',  channelID);
                }

                break;

            case 'roll':
                var rollType = args[0];
                switch (rollType) {
                    case '1d20':
                        var num = getRNGInteger(1, 20);
                        var rollStr = "You rolled a " + num.toString() + "!";

                        //Add the parts that adds the modifiers to the roll

                        sendMessage(rollStr, channelID);
                        break;

                    default:
                        sendMessage('Just like target test in Smash 4, that command doesn\'t exist.', channelID);
                }
                break;

            default:
                sendMessage('Just like target test in Smash 4, that command doesn\'t exist.', channelID);
                // Just add any case commands if you want to..
        }
    }
});
