var gf = require('../generalFunc.js');

//Each entry is [command, description]
var commands = [["!hi", "Say hi to TopTierBot"],
                ["!quote", "Make TTB say a quote from someone"],
                ["!tourney (ao | vs | ecg | mcc)", "Get bracket and stream links for specified tournament"],
                ["!r (Any number greater than 1) (modifiers spaced out afterwards)", "D&D roll for specific number"],
                ["!poll (Write a yes or on question here)", "A simple poll question will be stated with a thumbs up and down reaction for people to select"],
//                ["!kh", "Get link to Kurogane Hammer website"], 
//                ["!mv", "Get link to Struz Smash Move Viewer"],
//                ["!yt (bsd | msc | jpl)", "Gives you a link to Beefy Smash Doods, My Smash Corner, and Joe's playlist, respectively."],
                ["!roulette", "^Starts a round of russian roulette! After this, someone enters '!shoot' to pull the trigger"],
                ["!shoot", "^Pulls the trigger of a russian roulette session. Must call '!roulette' before this command."],
                ["!frame", "Gives link to the ultimate frame data page for a character. Some characters have special ways to write, like `Dark Pit` as dpit, `Duck Hunt` as dhunt, or common abbreviations like icis or zss."],
                ["!lvr (start [#] | left | color)", "Starts a lever game! *start #* will start the game with the # of players. *left* shows the remaining levers. *color* is the color of the lever to select it."],
               ["!stages", "Gives you a link to the stage comparison page from Tournameta. You can see how big some stages are to others."],
               ["!dict (term)", "Enter a terminology to learn what it means! If it's two or more words, put them all together. Ex. `tech skill` is entered as `techskill`"],
               ["!ruleset [vs | ao | mcc]", "Enter the command followed by either vs, ao, or mcc to print the ruleset for that tournament."],
                ["!pr", "Gives you the list of SFL PR members for the last season."],
               ["!notes (w | wg) char1 (char2) (notes to write)", "Only char1 for general notes of that char. Char1 and char2 for matchup notes of you playing char1 fighting char2. Put `wg` and a character to write to the general notes for that character. Put `w`, 2 characters and notes to add to the matchup notes."]];

module.exports = {
    act: function (msgChannel) {
        var helpStr = "___Command Help Guide___\n";
        for (var i = 0; i < commands.length; i++) {
            helpStr += "**" + commands[i][0] + "** - " + commands[i][1] + "\n";
        }
        gf.sendMessage(helpStr, msgChannel);
    }
};
