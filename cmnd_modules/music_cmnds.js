var gf = require('../generalFunc.js');
const ytdl = require("ytdl-core");

var servers = [];

var guildID;

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

module.exports = {
    play: function (args, message) {
        var msgChannel = message.channel;
        if (args.length == 0) {
            gf.sendMessage("No YouTube URL given.", msgChannel);
            return;
        }

        if (!message.member.voiceChannel) {
            gf.sendMessage("Must be in a voice channel to play!", msgChannel);
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
            }).catch(function (error) {
                console.log(error);
            });
        }


    },
    queue: async function (message) {
        if (!servers[message.guild.id]) {
            servers[message.guild.id] = {
                queue: []
            };
        }
        var server = servers[message.guild.id];
        
        var songtitle, info; 
        
        if(server.queue.length == 0){
            
        }
        
        var list = 'Next Up:\n';
        for (var i = 0; i < (server.queue.length); i++) {
            info = await ytdl.getInfo(server.queue[i]);
            //console.log(info);
            songtitle = info.title;
            list += parseInt(i+1) + '. ' + songtitle + '\n';
        }
        message.channel.send(list);
    },
    skip: function (message) {
        var server = servers[message.guild.id];

        server.dispatcher = con.playStream(ytdl(server.queue[0], {
            filter: "audioonly"
        }));
        
        //if (server.dispatcher) {
        //    server.dispatcher.end();
        //}
    },
    stop: function (message) {
        var server = servers[message.guild.id];

        if (message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
        }
    },
};
