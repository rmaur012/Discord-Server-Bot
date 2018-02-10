//This file serves as the file where each command's logic will be ran
//The main TopTierBot.js file runs and then calls a function from here to run.


var gf = require('./generalFunc.js');
var list = require('./cmnd_modules/cmnd_list.js');
//var quote = require('./cmnd_modules/quote_cmnd.js');

var cmnds = list.getMap();

//Each command has its own function below. 
//This serves to organize the functionality a bit better and have less clutter in the main script.
module.exports = {
    hi_cmnd: function (bot, channelID) {
        cmnds.hi.act(bot, channelID);
    },
    quote_cmnd: function (bot, channelID) {
        cmnds.quote.act(bot, channelID);
    },
    tourney_cmnd: function (bot, args, channelID) {
        cmnds.tourney.act(bot, args, channelID);
    },
    roll_cmnd: function (bot, args, channelID) {
        cmnds.roll.act(bot, args, channelID);
    },
    kh_cmnd: function (bot, args, channelID) {
        cmnds.kh.act(bot, args, channelID);

    },
    mv_cmnd: function (bot, channelID) {
        cmnds.mv.act(bot, channelID);
    },



    help_cmnd: function (bot, channelID) {
        cmnds.help.act(bot, channelID);

    },
    yt_cmnd: function (bot, args, message, channelID) {
        cmnds.yt.act(bot, args, message, channelID);

    },
    play_cmnd: function (args, message) {
        cmnds.music.play(args, message);
    }
};
