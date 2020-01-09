var gf = require('../generalFunc.js');

var intro = "Hello, I am TopTierBOT and I co-main Lucina and Pikachu. :)";

module.exports ={
    act: function (messageChannel) {
        gf.sendMessage(intro, messageChannel);
    },
};