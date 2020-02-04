const gf = require('../generalFunc.js');

const sflRuleset = '_Starter Stages_\nBattlefield\nFinal Destination\nSmashville\nPS2\nTown & City\n\n_Counterpicks_\nKalos\nYoshi\'s Story\nLylat\n';

module.exports = {
    act: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage('You didn\'t specify which tournament.', msgChannel);
            return;
        }

        var type = args[0];
        type = type.toLowerCase();
        switch (type) {
            case 'ao':
                {
                    gf.sendMessage('3 Stocks, 7 Minutes.\n3 Bans, TSR\n' + sflRuleset, msgChannel);
                }
                break;
            case 'vs':
                {
                    gf.sendMessage('3 Stocks, 7 Minutes.\n3 Bans, No DSR\n' + sflRuleset, msgChannel);
                }
                break;
            case 'mcc':
                {
                    gf.sendMessage('3 Stocks, 7 Minutes.\n3 Bans, TSR\n' + sflRuleset, msgChannel);
                }
                break;
            default:
                gf.sendMessage('Could not find tournament info.', msgChannel);
        }
    }
};
