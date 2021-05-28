const gf = require('../generalFunc.js');
const request = require('request');
const sggVariables = require('../cmnd_helpers/smashgg.json');

const token = process.env.SMASHGG_TOKEN;
//const token = require('../smashggToken.json');

var {
    graphql,
    buildSchema
} = require('graphql');

function getTotalAttendees(args, msgChannel) {

    var tourneySlug = args[0];
    for (var i = 1; i < args.length; i = i + 1) {
        tourneySlug = tourneySlug + '-' + args[i];
    }
    var query = `query AttendeeCount($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    id
    name
    participants(query: {}) {
      pageInfo {
        total
      }
    }
  }
}`;


    request({
        method: 'POST',
        uri: `https://api.smash.gg/gql/alpha`,
        headers: {
//            Authorization: `Bearer ${token.sggToken}`,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                tourneySlug
            },
        })
    }, function (error, response, body) {
        var resBody = JSON.parse(body);
        var tname = resBody.data.tournament.participants.pageInfo.total;
        if (body) {
            gf.sendMessage(tname, msgChannel);
        } else {
            gf.sendMessage("No body found in reply.", msgChannel);
            console.log('error: ' + response.statusCode)
            console.log(body)
        }
    });

}

function getTop8(args, msgChannel) {

    var ownerId = sggVariables.lizardKingOwnerId;
    var perPageTourney = 1;
    var perPageStandings = 8;

    var query = `query TournamentsByOwner($perPageTourney: Int!, $ownerId: ID!, $perPageStandings: Int!) {
    tournaments(query: {
      perPage: $perPageTourney
      filter: {
        ownerId: $ownerId
      }
    }) {
    nodes {
      id
      name
      events{
        standings(query: {
      perPage: $perPageStandings
    }){
      nodes {
        entrant {
          id
          name
          seeds{
            placement
            seedNum
          }
        }
      }
    }
      }
    }
  }
}`;

    request({
        method: 'POST',
        uri: `https://api.smash.gg/gql/alpha`,
        headers: {
            //Accept: 'application/vnd.heroku+json; version=3',
//            Authorization: `Bearer ${token.sggToken}`,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                ownerId,
                perPageTourney,
                perPageStandings
            },
        })
    }, function (error, response, body) {
        console.log("body: "+ body);
        var resBody = JSON.parse(body);
        // For some reason, past tournaments have the first entry as empty while currently happening tournaments are the first entry. 
        if (resBody.data.tournament.events[0].standings.nodes.length != 0) {
            entrants = resBody.data.tournament.events[0].standings.nodes;
        } else {
            entrants = resBody.data.tournament.events[1].standings.nodes;
        }
        var formattedEntrants = "";
        var i = 0;
        while (i < entrants.length) {
            formattedEntrants = formattedEntrants + entrants[i].entrant.seeds[0].placement + ". " + entrants[i].entrant.name + " (#" + entrants[i].entrant.seeds[0].seedNum + ")\n"
            i = i + 1;
        }
        if (body) {
            gf.sendMessage(formattedEntrants, msgChannel);
        } else {
            gf.sendMessage("No body found in reply.", msgChannel);
            console.log('error: ' + response.statusCode)
            console.log(body)
        }
    });
}

function getTop8ByArgs(args, msgChannel) {

    var tourneySlug = args[0];
    for (var i = 1; i < args.length; i = i + 1) {
        tourneySlug = tourneySlug + '-' + args[i].toLocaleLowerCase();
    }

    var perPageStandings = 8;

    var query = `query Top8StandingByTournamentSlug($tourneySlug: String!, $perPageStandings: Int!) {
  tournament(slug: $tourneySlug) {
    id
    name
    events{
        standings(query: {
      perPage: $perPageStandings
    }){
      nodes {
        entrant {
          id
          name
          seeds{
            placement
            seedNum
          }
        }
      }
    }
      }
  }
}`;

    request({
        method: 'POST',
        uri: `https://api.smash.gg/gql/alpha`,
        headers: {
//            Authorization: `Bearer ${token.sggToken}`,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                tourneySlug,
                perPageStandings
            },
        })
    }, function (error, response, body) {
        var resBody = JSON.parse(body);
        var entrants;
        // For some reason, past tournaments have the first entry as empty while currently happening tournaments are the first entry. 
        if (resBody.data.tournament.events[0].standings.nodes.length != 0) {
            entrants = resBody.data.tournament.events[0].standings.nodes;
        } else {
            entrants = resBody.data.tournament.events[1].standings.nodes;
        }
        var formattedEntrants = "";
        var i = 0;
        while (i < entrants.length) {
            formattedEntrants = formattedEntrants + entrants[i].entrant.seeds[0].placement + ". " + entrants[i].entrant.name + " - Seed:" + entrants[i].entrant.seeds[0].seedNum + "\n"
            i = i + 1;
        }
        if (body) {
            gf.sendMessage(formattedEntrants, msgChannel);
        } else {
            gf.sendMessage("No body found in reply.", msgChannel);
            console.log('error: ' + response.statusCode)
            console.log(body)
        }
    });
}

module.exports = {
    act: function (args, msgChannel) {
        if (args[0] == undefined) {
            gf.sendMessage('No subcommand given!', msgChannel);
            return;
        }

        var subCmd = args[0].toLowerCase();

        args = args.splice(1);

        switch (subCmd) {
            case 'att':
                if (args[0] == undefined) {
                    gf.sendMessage('No tournament names given.', msgChannel);
                    return;
                }
                getTotalAttendees(args, msgChannel);
                break;

            case 't8':
                if (args.length == 0) {
                    getTop8(args, msgChannel);
                } else {
                    getTop8ByArgs(args, msgChannel);
                }
                break;

            default:
                gf.sendMessage('Invalid subcommand for Smash.gg!', msgChannel);
        }

    }
};
