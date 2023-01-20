const gf = require('../generalFunc.js');
const tourneys = require('../cmnd_helpers/tourneys.json');

function displayTourneyInfo(place, msgChannel) {
    gf.sendMessage('Bracket: ' + place.bracket + '\nStream: ' + place.stream, msgChannel);
    gf.logInfo(gf.LogsEnum.log, "Stream Info called for " + place.bracket + " in #" + msgChannel.name, msgChannel);
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
            case 'unfun':
                {
                    displayTourneyInfo(tourneys.unfun, msgChannel);
                }
                break;
            case 'slyfox':
            case 'sly:':
                {
                    displayTourneyInfo(tourneys.sly, msgChannel);
                }
                break;
            case 'uvape':
                {
                    displayTourneyInfo(tourneys.uvape, msgChannel);
                }
                break;
            case 'gh':
            case 'gamers':
                {
                    displayTourneyInfo(tourneys.gh, msgChannel);
                }
                break;
            case 'furia':
                {
                    displayTourneyInfo(tourneys.furia, msgChannel);
                }
                break;
            case 'flynns':
            case 'flynn\'s':
            case 'flynn':
                {
                    displayTourneyInfo(tourneys.flynns, msgChannel);
                }
                break;
            case 'esa':
                {
                    displayTourneyInfo(tourneys.esa, msgChannel);
                }
                break;
            default:
                gf.sendMessage('Could not find tournament info.', msgChannel);
        }
    }
};
