var gf = require('../generalFunc.js');
var info = require('../info.json');

module.exports = {
    act: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage("Kurogane Hammer:\n" + info.kuroganehammer, msgChannel);
        }

        //Add parts to search specific characters, if you wish
    }
};
