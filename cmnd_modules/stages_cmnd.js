const gf = require('../generalFunc.js');

module.exports = {
    act: function (msgChannel) {
        gf.sendMessage('Stage Comparison: https://tournameta.com/stage-comparison/', msgChannel);
    }
};
