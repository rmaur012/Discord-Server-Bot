const Discord = require("discord.js");
var logger = require('winston');
//const auth = require('./auth.json');
const list = require('./cmnd_modules/cmnd_list.js');
const gf = require('./generalFunc.js');

var cmnds = list.getMap();

const bot = new Discord.Client();

/* Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';*/


bot.on("ready", () => {
    console.log("Ready.");
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);

});

bot.on("message", (message) => {
    var msgChannel = message.channel;

    var enabledCheckingForChannelNames = true;

    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0].toLowerCase();

        args = args.splice(1);

        //If you add a command here, write the logic of the function in its own js file then link it to cmnd_list.js
        switch (cmd) {

            case 'hi':
                cmnds.hi.act(msgChannel);
                break;

            case 'quote':
                cmnds.quote.act(msgChannel);
                break;

            case 'tourney':
                cmnds.tourney.act(args, msgChannel);
                break;

            case 'r':
                cmnds.roll.act(args, msgChannel);
                break;

                // kh command is retired
                //            case 'kh':
                //                cmnds.kh.act(args, msgChannel);
                //                break;

                // mv command is retired
                //            case 'mv':
                //                cmnds.mv.act(msgChannel);
                //                break;

            case 'help':
                cmnds.help.act(args, msgChannel);
                break;

                //yt command is retired
                //            case 'yt':
                //                cmnds.yt.act(args, msgChannel);
                //                break;

            case 'poll':
                cmnds.poll.act(args, message);
                break;

            case 'guildname':
                gf.sendMessage("We got: " + message.guild.name, msgChannel);

                break;

                // Music commands are retired
                //Music commands---------------------
                //            case 'play':
                //                cmnds.music.play(args, message);
                //                break;
                //
                //            case 'queue':
                //                cmnds.music.queue(message);
                //                break;
                //
                //            case 'skip':
                //                cmnds.music.skip(message);
                //                break;
                //
                //            case 'stop':
                //                cmnds.music.stop(message);
                //                break;
                //======================================

            case 'roulette':
                if (gf.checkIfProperChannel("roulette", msgChannel, enabledCheckingForChannelNames)) {
                    cmnds.roulette.act(msgChannel);
                    break;
                } else {
                    gf.sendMessage("Please go to the roulette channel to play!", msgChannel);
                    break;
                }

                case 'shoot':
                    if (gf.checkIfProperChannel("roulette", msgChannel, enabledCheckingForChannelNames)) {
                        cmnds.roulette.shoot(msgChannel);
                    } else {
                        gf.sendMessage("Please go to the roulette channel to play!", msgChannel);
                    }
                    break;
                    //======================================

                case 'frame':
                    cmnds.frame.act(args, msgChannel);
                    break;

                case 'lvr':
                    if (gf.checkIfProperChannel("lever", msgChannel, enabledCheckingForChannelNames)) {
                        cmnds.lever.act(args, msgChannel);
                    } else {
                        gf.sendMessage("Please go to the lever channel to play!", msgChannel);
                    }
                    break;

                case 'stages':
                    cmnds.stages.act(msgChannel);
                    break;

                case 'dict':
                    cmnds.dict.act(args, msgChannel);
                    break;

                case 'ruleset':
                    cmnds.ruleset.act(args, msgChannel);
                    break;

                case 'notes':
                    if (gf.checkIfProperChannel("notes", msgChannel, enabledCheckingForChannelNames)) {
                        if (args[0] != undefined && args[0].toLowerCase() == 'w') {
                            cmnds.notes.write(args.splice(1), msgChannel);
                        } else if (args[0] != undefined && args[0].toLowerCase() == 'wg') {
                            var character = args[1];
                            var splicedArgs = args.splice(1);
                            var charArgs = [character];
                            var finalArgs = charArgs.concat(splicedArgs);
                            cmnds.notes.write(finalArgs, msgChannel);
                        } else if (args[0] != undefined && args[0].toLowerCase() == 'sc') {
                            cmnds.notes.setCode(args.splice(1), msgChannel);
                        } else {
                            cmnds.notes.read(args, msgChannel);
                        }
                    } else {
                        gf.sendMessage("Please go to the notes channel for all note requests!", msgChannel);
                    }
                    break;

                case 'pr':
                    cmnds.pr.act(msgChannel);
                    break;

                case 'tw':
                    cmnds.twitch.act(args, msgChannel);
                    break;

                case 'sgg':
                    cmnds.sgg.act(args, msgChannel);
                    break;

                default:
                    gf.sendMessage('That command doesn\'t exist. Type *!help* for the command list.', msgChannel);
                    // Just add any case commands if you want to..
        }
    }
});


//bot.login(auth.token);
bot.login(process.env.BOT_TOKEN);
