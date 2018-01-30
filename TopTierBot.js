var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var cb = require('./command-breakdown.js');
var gf = require('./generalFunc.js');


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
        
        //If you add a command here, write the logic of the function in the command-breakdown.js file
        switch (cmd) {
                
            case 'hi':
                cb.hi_cmnd(bot, channelID);
                break;
                
            case 'quote':
                cb.quote_cmnd(bot, channelID);
                break;

            case 'tourney':
                cb.tourney_cmnd(bot, args, channelID);
                break;

            case 'roll':
                cb.roll_cmnd(bot, args, channelID);
                break;
            
            case 'kh':
                cb.kh_cmnd(bot, args, channelID);
                break;

            default:
                gf.sendMessage(bot, 'Just like target test in Smash 4, that command doesn\'t exist.', channelID);
                // Just add any case commands if you want to..
        }
    }
});
