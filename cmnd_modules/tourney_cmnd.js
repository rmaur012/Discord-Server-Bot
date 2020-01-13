const gf = require('../generalFunc.js');
const tourneys = require('../tourneys.json');

function displayTourneyInfo(place, msgChannel) {
    gf.sendMessage('Challonge: ' + place.challonge + '\nStream: ' + place.stream, msgChannel);
}

module.exports = {
    act: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage('You didn\'t say which tournament.', msgChannel);
            return;
        }

        var type = args[0];
        type = type.toLowerCase();
        switch (type) {
            case 'ao':
                {
                    displayTourneyInfo(tourneys.ao, msgChannel);
                }
                break;
            case 'vs':
                {
                    displayTourneyInfo(tourneys.vs, msgChannel);
                }
                break;
            case 'ecg':
                {
                    displayTourneyInfo(tourneys.ecg, msgChannel);
                }
                break;
            case 'mcc':
                {
                    displayTourneyInfo(tourneys.mcc, msgChannel);
                }
                break;
            default:
                gf.sendMessage('Could not find tournament info.', msgChannel);
        }
    }
};
