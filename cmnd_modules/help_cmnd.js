var gf = require('../generalFunc.js');

//Each entry is [command, description]
var commands = [["!hi", "Say hi to TopTierBot"], 
                ["!quote", "Make TTB say a quote from someone"], 
                ["!tourney (ao | vs | ecg)", "Get bracket and stream links for specified tournament"], 
                ["!r (Any number greater than 1) (modifiers spaced out afterwards)", "D&D roll for specific number"], 
                ["!poll (Write a yes or on question here)", "A simple poll question will be stated with a thumbs up and down reaction for people to select"],
                ["!kh", "Get link to Kurogane Hammer website"], 
                ["!mv", "Get link to Struz Smash Move Viewer"],
                ["!yt (bsd | msc | jpl)", "Gives you a link to Beefy Smash Doods, My Smash Corner, and Joe's playlist, respectively."],
                ["!roulette", "Starts a round of russian roulette! After this, someone enters '!shoot' to pull the trigger"],
                ["!shoot", "Pulls the trigger of a russian roulette session. Must call '!roulette' before this command."]];

module.exports = {
    act: function (msgChannel) {
        var helpStr = "___Command Help Guide___\n";
        for (var i = 0; i < commands.length; i++) {
            helpStr += "**" + commands[i][0] + "** - " + commands[i][1] + "\n";
        }
        gf.sendMessage(helpStr, msgChannel);
    }
};
