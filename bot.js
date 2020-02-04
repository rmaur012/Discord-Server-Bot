const Discord = require("discord.js");
var logger = require('winston');
const auth = require('./auth.json');
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
    /*if (message.content.startsWith("ping")) {
        message.channel.send("pong!");
    }*/
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

            case 'kh':
                cmnds.kh.act(args, msgChannel);
                break;

            case 'mv':
                cmnds.mv.act(msgChannel);
                break;

            case 'help':
                cmnds.help.act(msgChannel);
                break;

            case 'yt':
                cmnds.yt.act(args, msgChannel);
                break;

            case 'poll':
                cmnds.poll.act(args, message);
                break;

            case 'guildname':
                gf.sendMessage("We got: " + message.guild.name, msgChannel);
                break;

                //Music commands---------------------
            case 'play':
                cmnds.music.play(args, message);
                break;
            
            case 'queue':
                cmnds.music.queue(message);
                break;
                
            case 'skip':
                cmnds.music.skip(message);
                break;
                
            case 'stop':
                cmnds.music.stop(message);
                break;
                //======================================

            case 'roulette':
                if(gf.checkIfProperChannel("roulette",msgChannel, enabledCheckingForChannelNames)) {
                    cmnds.roulette.act(msgChannel);
                    break;
                } else {
                    gf.sendMessage("Please go to the roulette channel to play!", msgChannel);
                    break;
                }
            
            case 'shoot':
                if(gf.checkIfProperChannel("roulette",msgChannel, enabledCheckingForChannelNames)) {
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
                if(gf.checkIfProperChannel("lever",msgChannel, enabledCheckingForChannelNames)) {
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
                
            default:
                gf.sendMessage('That command doesn\'t exist. Type *!help* for the command list.', msgChannel);
                // Just add any case commands if you want to..
        }
    }
});


//bot.login(auth.token);
bot.login(process.env.BOT_TOKEN);

