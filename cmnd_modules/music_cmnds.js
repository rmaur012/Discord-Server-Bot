var gf = require('../generalFunc.js');
const ytdl = require("ytdl-core");

var servers = [];

function toPlay(con, msg){
    var server = servers[msg.guild.id];
    
    server.dispatcher = con.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function(){
        if(server.queue[0]){
            toPlay(con, msg);
        } else {
            con.disconnect();
        }
    });
    
}

module.exports = {
    play: function(args, message){
        if(args.length == 0){
            gf.sendMessage(bot, "No YouTube URL given.", channelID);
            return ;
        }
        
        if(!message.member.voiceChannel){
            gf.sendMessage(bot, "Must be in a voice channel to play!", channelID);
            return ;
        }
        
        if(!servers[message.guild.id]){
            servers[message.guild.id] = {
                queue: []  
            };
        }
        
        var server = servers[message.guild.id];
        
        server.queue.push(args[0]);
        
        if(!message.guild.voiceConnection){
            message.member.voiceChannel.join().then(function(connection){
                toPlay(connection, message);
            });
        }
        
        
    }, 
    skip: function(bot, args, message, channelID){
        var server = servers[message.guild.id];
        
        if(server.dispatcher){
            server.dispatcher.end();
        }
    }, 
    stop: function(bot, args, message, channelID){
        var server = servers[message.guild.id];
        
        if(message.guild.voiceConnection){
            message.guild.voiceConnection.disconnect();
        }
    }, 
};