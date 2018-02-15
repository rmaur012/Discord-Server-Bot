var gf = require('../generalFunc.js');

//Each entry is [command, description]
var commands = [["!hi", "Say hi to TopTierBot"], ["!quote", "Make TTB say a quote from someone"], ["!tourney (ao | vs | ecg)", "Get bracket and stream links for specified tournament"], ["!roll 1d(4|6|8|10|12|20|100) (modifiers spaced out)", "D&D roll for specific number"], ["!kh", "Get link to Kurogane Hammer website"], ["!mv", "Get link to Struz Smash Move Viewer"]];

module.exports = {
    act: function (msgChannel) {
        var helpStr = "Command Help Guide\n";
        for (var i = 0; i < commands.length; i++) {
            helpStr += "**" + commands[i][0] + "** - " + commands[i][1] + "\n";
        }
        gf.sendMessage(helpStr, msgChannel);
    }
};
