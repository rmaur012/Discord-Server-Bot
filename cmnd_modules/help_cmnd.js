var gf = require('../generalFunc.js');

var cmndsString = 'hi, quote, tourney, r, poll, kh, mv, yt, roulette, shoot, frame, lvr, stages, dict, ruleset, pr, tw, and notes.';

//var commands = [["!hi", "Say hi to TopTierBot"],
//                ["!quote", "Make TTB say a quote from someone"],
//                ["!tourney (ao | vs | ecg | mcc)", "Get bracket and stream links for specified tournament"],
//                ["!r (Any number greater than 1) (modifiers spaced out afterwards)", "D&D roll for specific number"],
//                ["!poll (Write a yes or on question here)", "A simple poll question will be stated with a thumbs up and down reaction for people to select"],
////                ["!kh", "Get link to Kurogane Hammer website"], 
////                ["!mv", "Get link to Struz Smash Move Viewer"],
////                ["!yt (bsd | msc | jpl)", "Gives you a link to Beefy Smash Doods, My Smash Corner, and Joe's playlist, respectively."],
//                ["!roulette", "^Starts a round of russian roulette! After this, someone enters '!shoot' to pull the trigger"],
//                ["!shoot", "^Pulls the trigger of a russian roulette session. Must call '!roulette' before this command."],
//                ["!frame", "Gives link to the ultimate frame data page for a character. Some characters have special ways to write, like `Dark Pit` as dpit, `Duck Hunt` as dhunt, or common abbreviations like icis or zss."],
//                ["!lvr (start [#] | left | color)", "Starts a lever game! *start #* will start the game with the # of players. *left* shows the remaining levers. *color* is the color of the lever to select it."],
//               ["!stages", "Gives you a link to the stage comparison page from Tournameta. You can see how big some stages are relative to others."],
//               ["!dict (term)", "Enter a terminology to learn what it means! If it's two or more words, put them all together. Ex. `tech skill` is entered as `techskill`"],
//               ["!ruleset [vs | ao | mcc]", "Enter the command followed by either vs, ao, or mcc to print the ruleset for that tournament."],
//                ["!pr", "Gives you the list of SFL PR members for the last season."],
//               ["!notes (w | wg) char1 (char2) (notes to write)", "Only char1 for general notes of that char. Char1 and char2 for matchup notes of you playing char1 fighting char2. Put `wg` and a character to write to the general notes for that character. Put `w`, 2 characters and notes to add to the matchup notes."]];

module.exports = {
    act: function (args, msgChannel) {

        if (args.length == 0) {
            gf.sendMessage('Which of these commands do you want to know more of: ' + cmndsString, msgChannel);
            return;
        }

        switch (args[0]) {

            case 'hi':
                gf.sendMessage('The `!hi` command just makes TopTierBot say Hi! A good way to check if the bot is active.', msgChannel);
                return;

            case 'quote':
                gf.sendMessage('The `!quote` command makes the bot respond with a quote that someone has said!', msgChannel);
                return;

            case 'tourney':
                gf.sendMessage('`!tourney (ao | vs | ecg | mcc)` - Get bracket and stream links for specified tournament. Example `!tournament mcc`', msgChannel);
                return;

            case 'r':
                gf.sendMessage('`!r (Any number greater than 1) (modifiers spaced out afterwards, optional)` - D&D roll for specific number. Example: `!r 20 2 2` is a D20 roll with two +2 modifiers.', msgChannel);
                return;

            case 'kh':
                gf.sendMessage('The `!kh` command gets the link to the Kurogane Hammer website.', msgChannel);
                return;

            case 'mv':
                gf.sendMessage('The `!mv` command gets the link to Struz Smash Move Viewer.', msgChannel);
                return;

            case 'help':
                gf.sendMessage('`!help (command)` - Explains what each command is and how to write it. Specify a command to learn about that command or no command to see the list of available commands.', msgChannel);
                return;

            case 'yt':
                gf.sendMessage('`!yt (bsd | msc | jpl)` - Gives you a link to Beefy Smash Doods, My Smash Corner, and Joe\'s playlist, respectively.', msgChannel);
                return;

            case 'poll':
                gf.sendMessage('`!poll (Write a yes or on question here)` - A simple poll question will be stated with a thumbs up and down reaction for people to select.', msgChannel);
                return;

                //Music commands---------------------
//            case 'play':
//                cmnds.music.play(args, message);
//                return;
//
//            case 'queue':
//                cmnds.music.queue(message);
//                return;
//
//            case 'skip':
//                cmnds.music.skip(message);
//                return;
//
//            case 'stop':
//                cmnds.music.stop(message);
//                return;
                //======================================

            case 'roulette':
                gf.sendMessage('The `!roulette` command starts a round of russian roulette! After this, someone enters `!shoot` to pull the trigger. This can only be done in the `#roulette` channel.', msgChannel);

            case 'shoot':
                gf.sendMessage('The `!shoot` command pulls the trigger of a russian roulette session. Must call `!roulette` before this command. This can only be done in the `#roulette` channel.', msgChannel);
                return;

            case 'frame':
                gf.sendMessage('`!frame (character)` - Gives link to the ultimate frame data page for a character. Some characters have special ways to write, like `Dark Pit` as dpit, `Duck Hunt` as dhunt, or common abbreviations like icis or zss.', msgChannel);
                return;

            case 'lvr':
                gf.sendMessage('`!lvr (start [#] | left | color)` - Starts a lever game! *start #* will start the game with the # of players. *left* shows the remaining levers. *color* is the color of the lever to select it.', msgChannel);
                return;

            case 'stages':
                gf.sendMessage('The `!stages` command gives you a link to the stage comparison page from Tournameta. You can see how big some stages are relative to others.', msgChannel);
                return;

            case 'dict':
                gf.sendMessage('`!dict (term)` - Enter a terminology to learn what it means! If it\'s two or more words, put them all together. Ex. `tech skill` is entered as `techskill`.', msgChannel);
                return;

            case 'ruleset':
                gf.sendMessage('`!ruleset [vs | ao | mcc]` - Enter the command followed by either vs, ao, or mcc to print the ruleset for that tournament.', msgChannel);
                return;

            case 'notes':
               gf.sendMessage('`!notes (w | wg) char1 (char2) (notes to write)` - `!notes char` for general notes of that char. `!notes char1 char2` for matchup notes of you playing char1 fighting char2. `!notes wg char` to write to the general notes for that character. `!notes w char1 char2 Add this to notes...` to add all after the character names to the matchup notes.', msgChannel);
                return;

            case 'pr':
                gf.sendMessage('The `!pr` command gives you the list of SFL PR members for the last season.', msgChannel);
                return;
                
            case 'tw':
                gf.sendMessage('`!tw (channel1) (channel2) (channel3) (channel4)` - Gives you link to twitch channels you specify. Putting 1 channel will take you to that twitch channel. Entering 2-4 channels will give you the multitwitch link.', msgChannel);
                return;

            default:
                gf.sendMessage('That command doesn\'t exist. Type *!help* for the command list.', msgChannel);
                // Just add any case commands if you want to..
        }


        var helpStr = "___Command Help Guide___\n";
        for (var i = 0; i < commands.length; i++) {
            helpStr += "**" + commands[i][0] + "** - " + commands[i][1] + "\n";
        }
        gf.sendMessage(helpStr, msgChannel);
    }
};
