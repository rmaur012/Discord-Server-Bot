const gf = require('../generalFunc.js');
const tourneys = require('../cmnd_helpers/tourneys.json');

function displayTourneyInfo(place, msgChannel) {
    gf.sendMessage('Bracket: ' + place.bracket + '\nStream: ' + place.stream, msgChannel);
}

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
            case 'champloo':
                {
                    displayTourneyInfo(tourneys.champloo, msgChannel);
                }
                break;
            case 'gypsy':
                {
                    displayTourneyInfo(tourneys.gypsy, msgChannel);
                }
                break;
            case 'rex':
                {
                    displayTourneyInfo(tourneys.rex, msgChannel);
                }
                break;
            case 'flynns':
            case 'flynn\'s':
            case 'flynn':
                {
                    displayTourneyInfo(tourneys.flynns, msgChannel);
                }
                break;
            case 'nxt':
                {
                    displayTourneyInfo(tourneys.nxt, msgChannel);
                }
                break;
            case 'esa':
                {
                    displayTourneyInfo(tourneys., msgChannel);
                }
                break;
            default:
                gf.sendMessage('Could not find tournament info.', msgChannel);
        }
    }
};
