var gf = require('../generalFunc.js');

function getMultitwitchchannels(args) {
    var multiTwitchExtension = '';
    for (var i = 0; i < args.length; i = i + 1) {
        multiTwitchExtension = multiTwitchExtension + args[i] + '/';
    }
    return multiTwitchExtension;
}

module.exports = {
    act: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage("Which channel(s) do you want to get?", msgChannel);
            return;
        } else if (args.length > 4) {
            gf.sendMessage("You can only have up to 4 channels for multitwitch.", msgChannel);
            return;
        }
        
        if (args.length == 1) {
            gf.sendMessage("https://www.twitch.tv/" + args[0], msgChannel);
            return;
        } else {
            var urlExtension = getMultitwitchchannels(args);
            gf.sendMessage("http://www.multitwitch.tv/" + urlExtension, msgChannel);
            return;
        }
    }
};