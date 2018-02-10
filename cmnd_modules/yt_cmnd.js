var gf = require('../generalFunc.js');

var youtube_names = {
    "bsd": "Beefy Smash Doods",
    "msc": "My Smash Corner",
    "jpl": "Joe's Playlist",
};

var youtube_urls = {
    "bsd": "https://www.youtube.com/channel/UCeCEq4Sz1nNK4wn3Z4Ozk2w",
    "msc": "https://www.youtube.com/user/mysmashcorner",
    "jpl": "https://www.youtube.com/watch?v=Qn6FHt2RCV0&list=PLHAtGEFi3y8Aa-MFyyHj8XHshn-4_YDxh",
};

module.exports = {
    act: function (bot, args, channelID) {
        if (args.length == 0) {
            gf.sendMessage(bot, "No arguments given.", channelID);
            return;
        }

        var yt_seek = args[0].toLowerCase();
        var yt_url = youtube_urls[yt_seek]; 
        if (yt_url == undefined) {
            gf.sendMessage(bot, "No link found for argument.", channelID);
            return;
        }

        gf.sendMessage(bot, youtube_names[yt_seek] + "\n" + yt_url, channelID);
    }
};
