var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
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
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'quote':
                bot.sendMessage({
                    to: channelID,
                    message: quotes[quoteIndex]
                });
                quoteIndex = quoteIndex + 1;
                if (quoteIndex == quotes.length) {
                    quoteIndex = 0;
                }
                break;

            case 'roll':
                var rollType = args[0];
                switch (rollType):
                    case '1d20':
                        var num = getRNGInteger(1, 20);
                        var rollStr = "You rolled a " + num.toString + "!";
                        
                        //Add the parts that adds the modifiers to the roll
                        
                        bot.sendMessage({
                            to: channelID,
                            message: rollStr
                        });

                    default:
                        bot.sendMessage({
                            to: channelID,
                            message: 'Just like target test in Smash 4, that command doesn\'t exist.'
                        });


            default:
                bot.sendMessage({
                    to: channelID,
                    message: 'Just like target test in Smash 4, that command doesn\'t exist.'
                });
                // Just add any case commands if you want to..
        }
    }
});
