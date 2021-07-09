var gf = require('../generalFunc.js');

var intro = "I am Sakurai from Sora Limited™.";

module.exports ={
    act: function (messageChannel) {
        gf.sendMessage(intro, messageChannel);
    },
};