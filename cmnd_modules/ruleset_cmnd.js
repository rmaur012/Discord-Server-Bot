const gf = require('../generalFunc.js');

const sflRuleset = '*Starter Stages*\nBattlefield\nFinal Destination\nSmashville\nPS2\nTown & City\n\n*Counterpicks*\nKalos\nYoshi\'s Story\nSmall Battlefield\n';

module.exports = {
    act: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage('You didn\'t specify which tournament.', msgChannel);
            return;
        }

        var type = args[0];
        type = type.toLowerCase();
        switch (type) {
            case 'rex':
                {
                    gf.sendMessage('3 Stocks, 7 Minutes.\n3 Bans, No DSR\n' + sflRuleset, msgChannel);
                }
                break;
            case 'flynn':
            case 'flynns':
                {
                    gf.sendMessage('3 Stocks, 7 Minutes.\n3 Bans, No DSR\n' + sflRuleset, msgChannel);
                }
                break;
            case 'oven':
                {
                    gf.sendMessage('3 Stocks, 7 Minutes.\n3 Bans, No DSR\n' + sflRuleset, msgChannel);
                }
                break;
            case 'ppg':
                {
                    gf.sendMessage('3 Stocks, 7 Minutes.\n3 Bans, No DSR\n' + sflRuleset, msgChannel);
                }
                break;
            default:
                gf.sendMessage('Could not find tournament info.', msgChannel);
        }
    }
};
