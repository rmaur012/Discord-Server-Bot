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
        name
        numEntrants
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
            //              Authorization: `Bearer ${token.sggToken}`,
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
        //console.log("body: "+ body);
        var resBody = JSON.parse(body);

        var i = 0;
        var found = false;
        while (i < resBody.data.tournaments.nodes[0].events.length) {
            if (resBody.data.tournaments.nodes[0].events[i].name.includes("Smash Ultimate") || resBody.data.tournaments.nodes[0].events[i].name.includes("Ultimate Singles")) {
                found = true;
                break;
            }
            i = i + 1;
        }

        if (!found) {
            gf.sendMessage("Could not find Smash Ultimate tournament. Is the tournament found in Smash.gg?", msgChannel);
            return;
        }

        var entrants = resBody.data.tournaments.nodes[0].events[i].standings.nodes;
        var formattedEntrants = resBody.data.tournaments.nodes[0].name + " (" + resBody.data.tournaments.nodes[0].events[i].numEntrants + " Entrants)\n";
        i = 0;
        while (i < entrants.length) {
            // Assuming seeds[] only has 1 bracket/no pools. Otherwise, it should be like top8WithArgs()
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
        name
        numEntrants
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
            //                        Authorization: `Bearer ${token.sggToken}`,
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
        var placementsOrder = [1, 2, 3, 4, 5, 5, 7, 7];
        var i = 0;
        var found = false;
        while (i < resBody.data.tournament.events.length) {
            if (resBody.data.tournament.events[i].name.includes("Smash Ultimate") || resBody.data.tournament.events[i].name.includes("Ultimate Singles")) {
                found = true;
                break;
            }
            i = i + 1;
        }

        if (!found) {
            gf.sendMessage("Could not find Smash Ultimate tournament. Is the tournament found in Smash.gg?", msgChannel);
            return;
        }

        var entrants = resBody.data.tournament.events[i].standings.nodes;
        var formattedEntrants = resBody.data.tournament.name + " (" + resBody.data.tournament.events[i].numEntrants + " Entrants)\n";
        var i = 0;
        var seedArrSize;
        while (i < entrants.length) {
            seedArrSize = entrants[i].entrant.seeds.length;
            formattedEntrants = formattedEntrants + placementsOrder[i] + ". " + entrants[i].entrant.name + " (#" + entrants[i].entrant.seeds[seedArrSize - 1].seedNum + ")\n"
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

function getPoolAndMatches(args, msgChannel) {

    var tourneySlug = args[0];
    var playerTag = "";
    var foundPeriod = false;
    for (var i = 1; i < args.length; i = i + 1) {
        if (args[i] == '.') {
            foundPeriod = true;
        } else if (!foundPeriod) {
            tourneySlug = tourneySlug + '-' + args[i].toLocaleLowerCase();
        } else if (foundPeriod) {
            playerTag = playerTag + " " + args[i].toLocaleLowerCase();
        }
    }

    //This removes the space in the front. It will mess with the results.
    playerTag = playerTag.slice(1);

    if (!foundPeriod) {
        gf.sendMessage('No player tag given. Did you separate the tournament and player with a period \'.\'?', msgChannel);
        return;
    }

    var perPage = 100;

    var query = `query GetPoolAndMatches($tourneySlug: String!, $playerTag: String!, $perPage: Int!) {
  tournament(slug: $tourneySlug) {
    id
    name
    state
    events{
        name
        numEntrants
      phases{
        name
        phaseGroups{
          nodes{
            displayIdentifier
            seeds(query:{
              filter: {
                entrantName: $playerTag
              }
            }){
              nodes{
                players{
                  gamerTag
                }
                phaseGroup{
                  sets(perPage: $perPage,
                    filters:{hideEmpty:true}) {
                    nodes{
                      round
                      fullRoundText
                      slots{
                        entrant{
                          name
                        }
                      }
                    }
                  }
                }
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
//            Authorization: `Bearer ${token.sggToken}`,
                        Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                tourneySlug,
                playerTag,
                perPage
            },
        })
    }, function (error, response, body) {
        var resBody = JSON.parse(body);
        var i = 0;
        var found = false;
        while (i < resBody.data.tournament.events.length) {
            if (resBody.data.tournament.events[i].name.includes("Smash Ultimate") || resBody.data.tournament.events[i].name.includes("Ultimate Singles")) {
                found = true;
                break;
            }
            i = i + 1;
        }

        if (!found) {
            gf.sendMessage("Could not find Smash Ultimate tournament. Is the tournament found in Smash.gg?", msgChannel);
            return;
        }

        // Extract Gamertag, their pool, and the sets of that pool
        var allPools = resBody.data.tournament.events[i].phases[0].phaseGroups.nodes;
        var gamerTag = "",
            poolIdentifier = "",
            sets = [];
        var focusedPool = 0;
        while (focusedPool < allPools.length) {
            //            console.log(allPools[focusedPool].displayIdentifier + " " +  allPools[focusedPool].seeds.nodes.length);
            if (allPools[focusedPool].seeds.nodes.length != 0) {
                gamerTag = allPools[focusedPool].seeds.nodes[0].players[0].gamerTag;
                poolIdentifier = allPools[focusedPool].displayIdentifier;
                sets = allPools[focusedPool].seeds.nodes[0].phaseGroup.sets.nodes;
                break;
            }
            focusedPool = focusedPool + 1;
        }

        if (gamerTag == "" || poolIdentifier == "" || sets.length == 0) {
            gf.sendMessage("Gamertag, Pool or Sets couldn't be found.", msgChannel);
            return
        }
        
        if(poolIdentifier == "1"){
           poolIdentifier = "Main Bracket"
           } else {
           poolIdentifier = "Pool " + poolIdentifier;
           }

        var completeInfo = gamerTag + " -> " + poolIdentifier + "\n"

        var focusedSet = 0;
        while (focusedSet < sets.length) {
            if (sets[focusedSet].slots[0].entrant == null) {
                if (sets[focusedSet].slots[1].entrant.name.includes(gamerTag)) {
                    completeInfo = completeInfo + "Waiting for opponent in " + sets[focusedSet].fullRoundText;
                }
            } else if (sets[focusedSet].slots[1].entrant == null) {
                if (sets[focusedSet].slots[0].entrant.name.includes(gamerTag)) {
                    completeInfo = completeInfo + "Waiting for opponent in " + sets[focusedSet].fullRoundText;
                }
            } else {
                if (sets[focusedSet].slots[0].entrant.name.includes(gamerTag)) {
                    completeInfo = completeInfo + " Vs. " + sets[focusedSet].slots[1].entrant.name + " (" + sets[focusedSet].fullRoundText + ")\n";
                } else if (sets[focusedSet].slots[1].entrant.name.includes(gamerTag)) {
                    completeInfo = completeInfo + " Vs. " + sets[focusedSet].slots[0].entrant.name + " (" + sets[focusedSet].fullRoundText + ")\n";
                }
            }
            focusedSet = focusedSet + 1;
        }
        if (body) {
            gf.sendMessage(completeInfo, msgChannel);
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

            case 'pool':
                if (args[0] == undefined) {
                    gf.sendMessage('No tournament names given.', msgChannel);
                    return;
                }
                getPoolAndMatches(args, msgChannel);

                break;

            default:
                gf.sendMessage('Invalid subcommand for Smash.gg!', msgChannel);
        }

    }
};
