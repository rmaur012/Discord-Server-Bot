var gf = require('../generalFunc.js');

var intro = "Hello, I am TopTierBOT and I main Bayonetta. :)";

module.exports ={
    act: function (messageChannel) {
        gf.sendMessage(intro, messageChannel);
    },
};