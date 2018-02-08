var gf = require('../generalFunc.js');

var intro = "Hello, I am TopTierBOT and I main Bayonetta. :)";

module.exports ={
    act: function (bot, channelID) {
        gf.sendMessage(bot, intro, channelID);
    },
};