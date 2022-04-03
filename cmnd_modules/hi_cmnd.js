var gf = require('../generalFunc.js');

var intro = "Hello, I am Sakurai from Sora Limited™.";

module.exports ={
    act: function (messageChannel) {
        gf.sendMessage(intro, messageChannel);
        gf.logInfo(gf.LogsEnum.log, "TopTierBOT said hi in #" + msgChannel.name, messageChannel);
    },
};