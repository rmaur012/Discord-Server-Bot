var Discord = require('discord.io');
var logger = require('winston');
const auth = require('./auth.json');
var gf = require('./generalFunc.js');
var list = require('./cmnd_modules/cmnd_list.js');

var cmnds = list.getMap();



const ytdl = require("ytdl-core");

var servers = [];

function toPlay(con, msg) {
    var server = servers[msg.guild.id];

    server.dispatcher = con.playStream(ytdl(server.queue[0], {
        filter: "audioonly"
    }));

    server.queue.shift();

    server.dispatcher.on("end", function () {
        if (server.queue[0]) {
            toPlay(con, msg);
        } else {
            con.disconnect();
        }
    });

}


function generateHex() {
    return "#" + Math.floor(Math.random * 16777215).toString(16);
};


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

bot.on("guildMemberAdd", function (member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + ", mi'lady...");

    member.addRole(member.guild.roles.find("name", "Smooses"));

    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function (role) {
        member.addRole(role);
    })
});

bot.on('message', function (user, userID, channelID, message, member, evt) {
    
    
    /*if(message.author.bot){
        return ;
    }*/
    
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        //If you add a command here, write the logic of the function in the command-breakdown.js file
        switch (cmd) {

            case 'hi':
                cmnds.hi.act(bot, channelID);
                break;

            case 'quote':
                cmnds.quote.act(bot, channelID);
                break;

            case 'tourney':
                cmnds.tourney.act(bot, args, channelID);
                break;

            case 'roll':
                cmnds.roll.act(bot, args, channelID);
                break;

            case 'kh':
                cmnds.kh.act(bot, args, channelID);
                break;

            case 'mv':
                cmnds.mv.act(bot, channelID);
                break;

            case 'help':
                cmnds.help.act(bot, channelID);
                break;

            case 'yt':
                cmnds.yt.act(bot, args, channelID);
                break;


            case 'guildname':
                gf.sendMessage(bot, "We got: " + message, channelID);

                break;

            case 'play':

                if (args.length == 0) {
                    gf.sendMessage(bot, "No YouTube URL given.", channelID);
                    return;
                }

                if (!message.member.voiceChannel) {
                    gf.sendMessage(bot, "Must be in a voice channel to play!", channelID);
                    return;
                }

                if (!servers[message.guild.id]) {
                    servers[message.guild.id] = {
                        queue: []
                    };
                }

                var server = servers[message.guild.id];

                server.queue.push(args[0]);

                if (!message.guild.voiceConnection) {
                    message.member.voiceChannel.join().then(function (connection) {
                        toPlay(connection, message);
                    });
                }

                break;

            default:
                gf.sendMessage(bot, 'Just like target test in Smash 4, that command doesn\'t exist.', channelID);
                // Just add any case commands if you want to..
        }
    }
});
