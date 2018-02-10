const gf = require('../generalFunc.js');
const tourneys = require('../tourneys.json');

module.exports = {
    act: function (bot, args, channelID) {
        if(args.length == 0){
            gf.sendMessage(bot, 'You didn\'t say which tournament.', channelID);
            return ;
        }
        
        var type = args[0];
        type = type.toLowerCase();
        switch (type) {
            case 'ao':
                {
                    gf.displayTourneyInfo(bot, tourneys.ao, channelID);
                }
                break;
            case 'vs':
                {
                    gf.displayTourneyInfo(bot, tourneys.vs, channelID);
                }
                break;
            case 'ecg':
                {
                    gf.displayTourneyInfo(bot, tourneys.ecg, channelID);
                }
                break;
            default:
                gf.sendMessage(bot, 'Could not find tournament info.', channelID);
        }
    }
};
