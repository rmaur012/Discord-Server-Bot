//This file serves as the file where each command's logic will be ran
//The main TopTierBot.js file runs and then calls a function from here to run.
var tourneys = require('./tourneys.json');
var info = require('./info.json');
var generalFunc = require('./generalFunc.js');

var quotes = ["\"You need to stop.\" -Joe", "\"Eddy, you're a FUCKING WEEB!\" -Jojo", "\"This is why I went to the math department.\" -Pablo", "\"Am I right fellas?\" -Danny", "\"Joe I'll do a $100 money match once I go 4-2, I swear to god. Eskeetit\" -Yoshi Main"];
var quoteIndex = 0;


function sendMessage(bot, reply, channelID) {
    bot.sendMessage({
        to: channelID,
        message: reply
    });
}

function displayTourneyInfo(bot, place, channelID) {
    sendMessage(bot, 'Challonge: ' + place.challonge + '\nStream: ' + place.stream, channelID);
}


module.exports = {

    determine_cmnd: function (bot, cmd, args, channelID) {
        switch (cmd) {
            // !ping
            case 'hi':
                sendMessage(bot, 'Hello, I am TopTierBOT and I main Bayonetta. :)', channelID);

                break;
            case 'quote':
                sendMessage(bot, quotes[quoteIndex], channelID);
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
                            displayTourneyInfo(bot, tourneys.ao, channelID);
                        }
                        break;
                    case 'vs':
                    case 'VS':
                        {
                            displayTourneyInfo(bot, tourneys.vs, channelID);
                        }
                        break;
                    case 'ecg':
                    case 'ECG':
                        {
                            displayTourneyInfo(bot, tourneys.ecg, channelID);
                        }
                        break;
                    default:
                        sendMessage(bot, 'You didn\'t say which tournament.', channelID);
                }

                break;

            case 'roll':
                var rollType = args[0];
                switch (rollType) {
                    case '1d20':
                        var num = generalFunc.getRNGInteger(1, 20);
                        var rollStr = "You rolled a " + num.toString() + "! ";
                        if(num <= 5){
                            rollStr = rollStr + "You got bodied!";
                        } else if(num > 5 && num <= 10){
                            rollStr = rollStr + "Ouch!";
                        } else if(num > 10 && num <= 15){
                            rollStr = rollStr + "Not bad!";
                        } else if(num > 15 && num <= 20){
                            rollStr = rollStr + "DESTRUCTION!";
                        }

                        //Add the parts that adds the modifiers to the roll

                        sendMessage(bot, rollStr, channelID);
                        break;

                    default:
                        sendMessage(bot, 'Just like target test in Smash 4, that command doesn\'t exist.', channelID);
                }
                break;

            default:
                sendMessage(bot, 'Just like target test in Smash 4, that command doesn\'t exist.', channelID);
                // Just add any case commands if you want to..
        }
    }
};
