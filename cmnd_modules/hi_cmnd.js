var gf = require('../generalFunc.js');

var intro = "Hello, I am Sakurai from Sora Limited™.";

module.exports ={
    act: function (msgChannel) {
        gf.sendMessage(intro, msgChannel);
        gf.logInfo(gf.LogsEnum.log, "TopTierBOT said hi in #" + msgChannel.name, msgChannel);
    },
};