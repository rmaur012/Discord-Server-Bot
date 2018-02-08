//This file serves as the file where each command's logic will be ran
//The main TopTierBot.js file runs and then calls a function from here to run.
var tourneys = require('./tourneys.json');
var info = require('./info.json');
var gf = require('./generalFunc.js');
var list = require('./cmnd_modules/cmnd_list.js');
//var quote = require('./cmnd_modules/quote_cmnd.js');

var cmnds = list.getMap();

var quotes = ["\"You need to stop.\" -Joe", "\"Eddy, you're a FUCKING WEEB!\" -Jojo", "\"This is why I went to the math department.\" -Pablo", "\"Am I right fellas?\" -Danny", "\"Joe I'll do a $100 money match once I go 4-2, I swear to god. Eskeetit\" -Yoshi Main", "\"Ha ha ha. I SD'ed.\" -Pablo", "\"You better not have sweaty hands or you're going to the bathroom and cleaning that shit.\" -Joe", "\"WOOOO, LOOK AT ME! I'M FOX McCLOUD BABY! HONEST!\" -Mida"];
var quoteIndex = 0;

//Each entry is [command, description]
var commands = [["!hi", "Say hi to TopTierBot"], ["!quote", "Make TTB say a quote from someone"], ["!tourney (ao | vs | ecg)", "Get bracket and stream links for specified tournament"], ["!roll 1d(4|6|8|10|12|20|100) (modifiers spaced out)", "D&D roll for specific number"], ["!kh", "Get link to Kurogane Hammer website"], ["!mv", "Get link to Struz Smash Move Viewer"]];

//var commands = ["!hi", "!quote", "!tourney (ao | vs | ecg)", "!roll 1d(4|6|8|10|12|20|100)", "!kh", "!mv"];
//var descriptions = ["Say hi to TopTierBot", "Make TTB say a quote from someone", "Get bracket and stream links for specified tournament", "D&D roll for specific number", "Get link to Kurogane Hammer website", "Get link to Struz Smash Move Viewer"];


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
        var type = args[0];
        switch (type) {
            case 'ao':
            case 'AO':
                {
                    gf.displayTourneyInfo(bot, tourneys.ao, channelID);
                }
                break;
            case 'vs':
            case 'VS':
                {
                    gf.displayTourneyInfo(bot, tourneys.vs, channelID);
                }
                break;
            case 'ecg':
            case 'ECG':
                {
                    gf.displayTourneyInfo(bot, tourneys.ecg, channelID);
                }
                break;
            default:
                gf.sendMessage(bot, 'You didn\'t say which tournament.', channelID);
        }
    },
    roll_cmnd: function (bot, args, channelID) {
        var hasArgs = true;
        var rollType, findD;
        if (args.length == 0) {
            hasArgs = false;
        } else {
            rollType = args[0];
            findD = rollType.indexOf("d");
        }

        //If the "d" is the first character or the last, its a wrong command
        if (!hasArgs || findD == 0 || findD == rollType.length - 1) {
            gf.sendMessage(bot, "Dice roll is invalid. Let's just say you got a 1.", channelID);
        } else {

            var numOfRolls, num, highRoll;
            if (findD > -1) {
                numOfRolls = parseInt(rollType.slice(0, findD));
                highRoll = parseInt(rollType.slice(findD + 1));
            } else {
                numOfRolls = 1;
                highRoll = parseInt(rollType);
            }
            var maxNum;
            var possibleModifier = "";
            var modNum = 0;

            //This part adds any modifiers that was added
            var addedNums = "";
            if (args.length > 1) {
                var index = 1;
                var toAdd;
                while (index != args.length) {
                    toAdd = parseInt(args[index]);
                    modNum += toAdd;
                    addedNums += ", " + args[index];
                    index++;
                }
                addedNums += ")**";
            }

            var modString = "";
            while (numOfRolls != 0) {
                num = gf.getRNGInteger(1, highRoll);

                //These are for the funny comments that are said once a player rolls
                maxNum = highRoll + modNum;
                var quarter = maxNum / 4;
                var half = maxNum / 2;
                var threeFour = ((maxNum / 4) + (maxNum / 2));

                //This sets up the string that will display the roll and modifiers
                if (args.length > 1) {
                    modString = "**(" + num.toString() + addedNums;
                } else {
                    modString = "";
                }

                ////Add modifiers after making the string
                num = num + modNum;

                //This is for funny comment on roll
                var rollStr = "You rolled a **" + num.toString() + "**! " + modString + "\n";
                if (num <= quarter) {
                    rollStr = rollStr + "You got bodied!";
                } else if (num > quarter && num <= half) {
                    rollStr = rollStr + "Ouch!";
                } else if (num > half && num <= threeFour) {
                    rollStr = rollStr + "Not bad!";
                } else if (num > threeFour && num <= maxNum) {
                    rollStr = rollStr + "DESTRUCTION!";
                }

                //Tell player about their roll
                gf.sendMessage(bot, rollStr, channelID);

                numOfRolls--;
            }

        }

        /*For a 20 sided roll
        if (highRoll == '2' && rollType.slice(3, 4) == '0') {
            maxNum = 20;
            num = gf.getRNGInteger(1, maxNum);

            //For a 4, 6, or 8 sided roll
        } else if (highRoll == '4' || highRoll == '6' || highRoll == '8') {
            maxNum = parseInt(highRoll);
            num = gf.getRNGInteger(1, maxNum);


        } else if (highRoll == '1') {
            //1d100 is lengt of five and the 5th character isn't a + for the modifiers
            if (args[0].length > 4 && rollType.slice(4, 5) == '0') {
                maxNum = 100;
                num = gf.getRNGInteger(1, maxNum);

                //Has to be either 1d10 or 1d12
            } else {
                maxNum = parseInt(rollType.slice(2, 4));
                num = gf.getRNGInteger(1, maxNum);
            }
        } else {
            num = 0;
        }

        if (num != 0) {
            var addedNums = "";
            if (args.length > 1) {
                addedNums = "(" + num.toString();
                var index = 1;
                var toAdd;
                while (index != args.length) {
                    toAdd = parseInt(args[index]);
                    num += toAdd;
                    maxNum += toAdd;
                    addedNums += ", " + args[index];
                    index++;
                }
                addedNums += ")";
            }


            var quarter = maxNum / 4;
            var half = maxNum / 2;
            var threeFour = ((maxNum / 4) + (maxNum / 2));


            var rollStr = "You rolled a **" + num.toString() + "**! " + addedNums + "\n";
            if (num <= quarter) {
                rollStr = rollStr + "You got bodied!";
            } else if (num > quarter && num <= half) {
                rollStr = rollStr + "Ouch!";
            } else if (num > half && num <= threeFour) {
                rollStr = rollStr + "Not bad!";
            } else if (num > threeFour && num <= maxNum) {
                rollStr = rollStr + "DESTRUCTION!";
            }

            //Add the parts that adds the modifiers to the roll

            gf.sendMessage(bot, rollStr, channelID);
        } else {
            gf.sendMessage(bot, "Dice roll is invalid. Let's just say you got a 1.", channelID);
        }
        switch (highRoll) {
            case '4':
            case '6':
            case '8':
                var num = gf.getRNGInteger(1, parseInt(highRoll));
                break;
            case '2':
                var num = gf.getRNGInteger(1, 20);
                var rollStr = "You rolled a " + num.toString() + "! ";
                if (num <= 5) {
                    rollStr = rollStr + "You got bodied!";
                } else if (num > 5 && num <= 10) {
                    rollStr = rollStr + "Ouch!";
                } else if (num > 10 && num <= 15) {
                    rollStr = rollStr + "Not bad!";
                } else if (num > 15 && num <= 20) {
                    rollStr = rollStr + "DESTRUCTION!";
                }

                //Add the parts that adds the modifiers to the roll

                sendMessage(bot, rollStr, channelID);
                break;

            default:
                sendMessage(bot, 'Just like target test in Smash 4, that command doesn\'t exist.', channelID);
        }*/
    },
    kh_cmnd: function (bot, args, channelID) {
        if (args.length == 0) {
            gf.sendMessage(bot, "Kurogane Hammer: http://kuroganehammer.com/Smash4", channelID);
        }

        //Add parts to search specific characters, if you wish

    },
    mv_cmnd: function (bot, channelID) {
        gf.sendMessage(bot, "Struz Smash Move Viewer: https://struz.github.io/smash-move-viewer/", channelID);
    },



    help_cmnd: function (bot, channelID) {
        var helpStr = "Command Help Guide\n";
        for (var i = 0; i < commands.length; i++) {
            helpStr += "**" + commands[i][0] + "** - " + commands[i][1] + "\n";
        }
        gf.sendMessage(bot, helpStr, channelID);

    }
};
