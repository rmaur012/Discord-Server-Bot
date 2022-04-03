var gf = require('../generalFunc.js');

var prList = "https://twitter.com/Aerodusk/status/1510044345260462082?s=20&t=QgmeZe1e_l_GPdrQPnsORg";

module.exports = {
    act: function (msgChannel) {
        gf.sendMessage(prList, msgChannel);
        gf.logInfo(gf.LogsEnum.log, "PR Tweet Sent in #" + msgChannel.name, msgChannel);
    }
};
