var gf = require('../generalFunc.js');
var info = require('../info.json');

module.exports = {
    act: function (bot, args, channelID) {
        if (args.length == 0) {
            gf.sendMessage(bot, "Kurogane Hammer:\n" + info.kuroganehammer, channelID);
        }

        //Add parts to search specific characters, if you wish
    }
};
