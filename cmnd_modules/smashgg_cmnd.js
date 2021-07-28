const gf = require('../generalFunc.js');
const request = require('request');
const sggVariables = require('../cmnd_helpers/smashgg.json');

//const token = process.env.SMASHGG_TOKEN;
const token = require('../smashggToken.json');

var {
    graphql,
    buildSchema
} = require('graphql');

//var authToken = `Bearer ${token}`;
var authToken = `Bearer ${token.sggToken}`;

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
            Authorization: authToken,
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

    var tourneySlug = process.env.TOURNEY_SLUG;
    var perPageStandings = 8;

    var query = `query GetTop8BySlug($tourneySlug: String!, $perPageStandings: Int!) {
  tournament(slug: $tourneySlug) {
    id
    name
    state
    events{
      videogame{
        id
        name
      }
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
            //Accept: 'application/vnd.heroku+json; version=3',
            Authorization: authToken,
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
        //console.log("body: "+ body);
        var resBody = JSON.parse(body);

        var i = 0;
        var found = false;
        while (i < resBody.data.tournament.events.length) {
            if (resBody.data.tournament.events[i].videogame.id == 1386) {
                found = true;
                break;
            }
            i = i + 1;
        }

        if (!found) {
            gf.sendMessage("Could not find Smash Ultimate tournament or event. Is the tournament found in Smash.gg?", msgChannel);
            return;
        }

        var entrants = resBody.data.tournament.events[i].standings.nodes;
        var formattedEntrants = resBody.data.tournament.events[i].videogame.name + " (" + resBody.data.tournament.events[i].numEntrants + " Entrants)\n";
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
            Authorization: authToken,
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

    var tourneySlug = process.env.TOURNEY_SLUG;
    var playerTag = args[0];
    for (var i = 1; i < args.length; i = i + 1) {
        playerTag = playerTag + " " + args[i].toLocaleLowerCase();
        
    }

    var perPage = 100;

    var query = `query GetPlayerId($tourneySlug: String!, $playerTag: String!) {
  tournament(slug: $tourneySlug) {
    participants(query: {
     filter:{
      gamerTag: $playerTag
    }
    }){
      nodes{
        entrants{
          id
        }
      }
    }
  }
}`;


    request({
        method: 'POST',
        uri: `https://api.smash.gg/gql/alpha`,
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                tourneySlug,
                playerTag
            },
        })
    }, function (error, response, body) {
        var resBody = JSON.parse(body);
//        console.log(resBody);

        if (resBody.errors != undefined && resBody.errors.length > 0) {
            gf.sendMessage("Error Found: " + resBody.errors[0].message, msgChannel);
            return;
        }

        if (resBody.data.tournament.participants.nodes.length == 0) {
            gf.sendMessage("Player Id could not be found to then find in tournament.", msgChannel);
            return;
        }

        var playerId = resBody.data.tournament.participants.nodes[0].entrants[0].id;

        var query = `query GetPoolAndMatches($tourneySlug: String!, $playerTag: String!, $perPage: Int!, $playerId: ID!) {
  tournament(slug: $tourneySlug) {
    id
    name
    state
    events{
        name
        numEntrants
        type
        videogame {
      	  id
      	}
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
                placement
                seedNum
                players{
                  gamerTag
                }
                phaseGroup{
                  sets(perPage: $perPage,
                    filters:{hideEmpty:true, entrantIds:[$playerId]}) {
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
                Authorization: authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables: {
                    tourneySlug,
                    playerTag,
                    perPage,
                    playerId
                },
            })
        }, function (error, response, body) {
            var resBody = JSON.parse(body);
//            console.log(resBody);
            
            if (resBody.errors != undefined && resBody.errors.length > 0) {
            gf.sendMessage("Error Found: " + resBody.errors[0].message, msgChannel);
            return;
        }
            
            var i = 0;
            var found = false;
            while (i < resBody.data.tournament.events.length) {
                if (resBody.data.tournament.events[i].videogame.id == 1386 && resBody.data.tournament.events[i].type == 1) {
                    found = true;
                    break;
                }
                i = i + 1;
            }

            if (!found) {
                gf.sendMessage("Could not find Smash Ultimate tournament. Is the tournament found in Smash.gg?", msgChannel);
                return;
            }

            var totalEventEntrants = resBody.data.tournament.events[i].numEntrants;

            // Extract Gamertag, their pool, and the sets of that pool
            var allPools = resBody.data.tournament.events[i].phases[0].phaseGroups.nodes;
            var gamerTag = "",
                placement = -1,
                poolIdentifier = "",
                sets = [].
            globalSeed = -1;
            var focusedPool = 0;
            while (focusedPool < allPools.length) {
                //            console.log(allPools[focusedPool].displayIdentifier + " " + allPools[focusedPool].seeds.nodes.length);
                if (allPools[focusedPool].seeds.nodes.length != 0 && allPools[focusedPool].seeds.nodes[0].players[0].gamerTag.toLowerCase().includes(playerTag)) {
                    gamerTag = allPools[focusedPool].seeds.nodes[0].players[0].gamerTag;
                    globalSeed = allPools[focusedPool].seeds.nodes[0].seedNum;
                    placement = allPools[focusedPool].seeds.nodes[0].placement;
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

            if (poolIdentifier == "1") {
                poolIdentifier = "Main Bracket"
            } else {
                poolIdentifier = "Pool " + poolIdentifier;
            }

            var completeInfo = gamerTag + " -> " + poolIdentifier + " (Seed #" + globalSeed + " of " + totalEventEntrants + ")\n"

            var focusedSet = 0;
            var winnersMatches = [],
                losersMatches = [];
            while (focusedSet < sets.length) {

                if (sets[focusedSet].slots[0].entrant != null && sets[focusedSet].slots[1].entrant != null) {
                    if (sets[focusedSet].slots[0].entrant.name.includes(gamerTag) || sets[focusedSet].slots[1].entrant.name.includes(gamerTag)) {
                        if (sets[focusedSet].round > 0) {
                            winnersMatches.push(sets[focusedSet]);
                        } else {
                            losersMatches.push(sets[focusedSet]);
                        }
                    }
                }
                focusedSet = focusedSet + 1;
            }
            var sortedMatches = sortPlayersSets(winnersMatches, losersMatches);

            focusedSet = 0;
            while (focusedSet < sortedMatches.length) {
                if (sortedMatches[focusedSet].slots[0].entrant == null) {
                    if (sortedMatches[focusedSet].slots[1].entrant.name.includes(gamerTag)) {
                        completeInfo = completeInfo + "Waiting for opponent in " + sortedMatches[focusedSet].fullRoundText;
                    }
                } else if (sortedMatches[focusedSet].slots[1].entrant == null) {
                    if (sortedMatches[focusedSet].slots[0].entrant.name.includes(gamerTag)) {
                        completeInfo = completeInfo + "Waiting for opponent in " + sortedMatches[focusedSet].fullRoundText;
                    }
                } else {
                    if (sortedMatches[focusedSet].slots[0].entrant.name.includes(gamerTag)) {
                        completeInfo = completeInfo + " Vs. " + sortedMatches[focusedSet].slots[1].entrant.name + " (" + sortedMatches[focusedSet].fullRoundText + ")\n";
                    } else if (sortedMatches[focusedSet].slots[1].entrant.name.includes(gamerTag)) {
                        completeInfo = completeInfo + " Vs. " + sortedMatches[focusedSet].slots[0].entrant.name + " (" + sortedMatches[focusedSet].fullRoundText + ")\n";
                    }
                }
                focusedSet = focusedSet + 1;
            }
            
            completeInfo = completeInfo + "Placement: " + placement;

            if (body) {
                gf.sendMessage(completeInfo, msgChannel);
            } else {
                gf.sendMessage("No body found in reply.", msgChannel);
                console.log('error: ' + response.statusCode)
                console.log(body)
            }
        });


    });

}

function setTournamentSlug(args, msgChannel){
    

    var tourneySlug = args[0];
    for (var i = 1; i < args.length; i = i + 1) {
        tourneySlug = tourneySlug + '-' + args[i].toLocaleLowerCase();
    }

    var query = `query CheckTournamentValidity($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    name
  }
}`;

    request({
        method: 'POST',
        uri: `https://api.smash.gg/gql/alpha`,
        headers: {
            //Accept: 'application/vnd.heroku+json; version=3',
            Authorization: authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                tourneySlug
            },
        })
    }, function (error, response, body) {
//        console.log("body: "+ body);
        var resBody = JSON.parse(body);
        
        if(resBody.data.tournament == null){
           gf.sendMessage("Could not find the tournament. Is the tournament found in Smash.gg?", msgChannel);
            return;
        }
        
        request({
                method: 'PATCH',
                uri: `https://api.heroku.com/apps/${process.env.APP_NAME}/config-vars`,
                //                uri: `https://api.heroku.com/apps/${process.env.BOT_TOKEN}/config-vars`,
                headers: {
                    Accept: 'application/vnd.heroku+json; version=3',
                    Authorization: `Bearer ${process.env.HEROKU_BEARER}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TOURNEY_SLUG: tourneySlug
                })
            }, function (error, response, body) {
                if (response.statusCode == 200) {
                    gf.sendMessage("Tournament Slug '" + tourneySlug + "' Stored!", msgChannel);
                } else {
                    gf.sendMessage("Tournament Slug could not be stored! Try again.", msgChannel);
                    console.log('error: ' + response.statusCode)
                    console.log(body)
                }
            });
    });
}

function sortPlayersSets(winners, losers) {
    var i, j, temp, smallestRoundInd;
    for (i = 0; i < winners.length - 1; i = i + 1) {
        smallestRoundInd = i;
        for (j = i + 1; j < winners.length; j = j + 1) {
            if (winners[j].round < winners[smallestRoundInd].round) {
                smallestRoundInd = j;
            }
        }
        temp = winners[smallestRoundInd];
        winners[smallestRoundInd] = winners[i];
        winners[i] = temp;
    }

    //Check to see if player got to grand finals and grand finals reset. Take out those matches to put them in the end of the array.
    var tempMatch, grandFinals, grandFinalsReset;
    if (winners[winners.length - 1].fullRoundText == "Grand Final Reset" || (winners[winners.length - 2] != undefined && winners[winners.length - 2].fullRoundText == "Grand Final Reset")) {
        tempMatch = winners.splice(winners.length - 1, 1);
        if (tempMatch.fullRoundText == "Grand Final Reset") {
            grandFinalsReset = tempMatch[0];
            grandFinals = winners.splice(winners.length - 1, 1)[0];
        } else {
            grandFinals = tempMatch[0];
            grandFinalsReset = winners.splice(winners.length - 1, 1)[0];
        }
    } else if (winners[winners.length - 1].fullRoundText == "Grand Final") {
        grandFinals = winners.splice(winners.length - 1, 1)[0];
    }

    //Losers
    for (i = 0; i < losers.length - 1; i = i + 1) {
        smallestRoundInd = i;
        for (j = i + 1; j < losers.length; j = j + 1) {
            if (losers[j].round < losers[smallestRoundInd].round) {
                smallestRoundInd = j;
            }
        }
        temp = losers[smallestRoundInd];
        losers[smallestRoundInd] = losers[i];
        losers[i] = temp;
    }

    losers.reverse();

    for (i = 0; i < losers.length; i = i + 1) {
        winners.push(losers[i]);
    }

    //Adding grand finals and/or reset if it was found before
    if (grandFinals != undefined) {
        winners.push(grandFinals);
        if (grandFinalsReset != undefined) {
            winners.push(grandFinalsReset);
        }
    }

    return winners;
}

//function displayRoundOrder(arr) {
//    var string = "";
//    for (var i = 0; i < arr.length; i = i + 1) {
//        string = string + arr[i].round + ", ";
//    }
//    console.log(string);
//}

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
                
            case 'set':
                if (args[0] == undefined) {
                    gf.sendMessage('No tournament names given.', msgChannel);
                    return;
                }
                
                setTournamentSlug(args, msgChannel);
                break;

            case 'brk':
            default:
                args.unshift(subCmd);
                if (args[0] == undefined) {
                    gf.sendMessage('No gamertags given.', msgChannel);
                    return;
                }
                getPoolAndMatches(args, msgChannel);

                break;
        }

    }
};
