const gf = require('../generalFunc.js');
const request = require('request');
const sggVariables = require('../cmnd_helpers/smashgg.json');

//For Deployment/PROD:
const token = process.env.SMASHGG_TOKEN;
var tourneySlugGlobal = process.env.TOURNEY_SLUG;
const appNameGlobal = process.env.APP_NAME;
const herokuBearerGlobal = process.env.HEROKU_BEARER;
var authToken = `Bearer ${token}`;

//For Local Development:
//const secrets = require('../smashggSecrets.json');
//var tourneySlugGlobal = secrets.slug;
//const appNameGlobal = secrets.appName;
//const herokuBearerGlobal = secrets.herokuBearer;
//var authToken = `Bearer ${secrets.sggToken}`;

var {
    graphql,
    buildSchema
} = require('graphql');

function getTotalAttendees(args, msgChannel) {
    var tourneySlug = "";

    if (args[0] == undefined) {
        tourneySlug = tourneySlugGlobal;
    } else {
        tourneySlug = args[0];
        for (var i = 1; i < args.length; i = i + 1) {
            tourneySlug = tourneySlug + '-' + args[i];
        }
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
        uri: `https://api.start.gg/gql/alpha`,
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
        //        console.log(resBody);
        var tname = resBody.data.tournament.participants.pageInfo.total;
        if (body) {
            gf.sendMessage(tname, msgChannel);
        } else {
            gf.sendMessage("No body found in reply.", msgChannel);
            gf.logInfo(gf.LogsEnum.warn, 'Status Code ' + response.statusCode + ", and body: " + body, msgChannel);
        }
    });

}

function getTop8(args, msgChannel) {

    var tourneySlug = tourneySlugGlobal;
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
          standing{
            placement
          }
          seeds{
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
        uri: `https://api.start.gg/gql/alpha`,
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
            gf.sendMessage("Could not find Smash Ultimate tournament or event. Is the tournament found in Start.gg?", msgChannel);
            gf.logInfo(gf.LogsEnum.log, "Could not find Smash Ultimate Tournament with slug: " + tourneySlugGlobal, msgChannel);
            return;
        }

        var entrants = resBody.data.tournament.events[i].standings.nodes;
        var formattedEntrants = resBody.data.tournament.events[i].videogame.name + " (" + resBody.data.tournament.events[i].numEntrants + " Entrants)\n";
        i = 0;
        while (i < entrants.length) {
            // Assuming seeds[] only has 1 bracket/no pools. Otherwise, it should be like top8WithArgs()
            formattedEntrants = formattedEntrants + entrants[i].entrant.standing.placement + ". " + entrants[i].entrant.name + " (#" + entrants[i].entrant.seeds[0].seedNum + ")\n"
            i = i + 1;
        }
        if (body) {
            gf.sendMessage(formattedEntrants, msgChannel);
        } else {
            gf.sendMessage("No body found in reply.", msgChannel);
            gf.logInfo(gf.LogsEnum.warn, 'Status Code ' + response.statusCode + ", and body: " + body, msgChannel);
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
          standing{
            placement
          }
          seeds{
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
        uri: `https://api.start.gg/gql/alpha`,
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
            gf.sendMessage("Could not find Smash Ultimate tournament. Is the tournament found in Start.gg?", msgChannel);
            gf.logInfo(gf.LogsEnum.log, "Could not find Smash Ultimate Tournament with slug: " + tourneySlugGlobal, msgChannel);
            return;
        }

        var entrants = resBody.data.tournament.events[i].standings.nodes;
        var formattedEntrants = resBody.data.tournament.name + " (" + resBody.data.tournament.events[i].numEntrants + " Entrants)\n";
        var i = 0;
        var seedArrSize;
        while (i < entrants.length) {
            seedArrSize = entrants[i].entrant.seeds.length;
            formattedEntrants = formattedEntrants + entrants[i].entrant.standing.placement + ". " + entrants[i].entrant.name + " (#" + entrants[i].entrant.seeds[seedArrSize - 1].seedNum + ")\n"
            i = i + 1;
        }
        if (body) {
            gf.sendMessage(formattedEntrants, msgChannel);
        } else {
            gf.sendMessage("No body found in reply.", msgChannel);
            gf.logInfo(gf.LogsEnum.warn, 'Status Code ' + response.statusCode + ", and body: " + body, msgChannel);
        }
    });
}

function getPoolAndMatches(args, msgChannel) {

    var tourneySlug = tourneySlugGlobal;
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
          event {
            name
          }
        }
      }
    }
  }
}`;


    request({
        method: 'POST',
        uri: `https://api.start.gg/gql/alpha`,
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
        console.log("body: " + body + " , error: " + error);
        var resBody = JSON.parse(body);
        //console.log(resBody);

        if (resBody.errors != undefined && resBody.errors.length > 0) {
            gf.sendMessage("Error Found: " + resBody.errors[0].message, msgChannel);
            gf.logInfo(gf.LogsEnum.warn, "Error Found: " + resBody.errors[0].message, msgChannel);
            return;
        }

        if (resBody.data.tournament.participants.nodes.length == 0) {
            gf.sendMessage("Player could not be found in tournament.", msgChannel);
            gf.logInfo(gf.LogsEnum.log, "Player ID not found.", msgChannel);
            return;
        }

        var playerId = getSinglesPlayerId(resBody.data.tournament.participants.nodes[0].entrants);

        if (playerId == 0) {
            gf.sendMessage("Could not find Smash Ultimate Singles event when trying to get ID", msgChannel);
            gf.logInfo(gf.LogsEnum.log, "Smash Ult Singles event not found when getting player ID.", msgChannel);
            return;
        }

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
        phaseGroups(query:{perPage:64, entrantIds:[$playerId]}){
          nodes{
            displayIdentifier
            startAt
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
                      displayScore(mainEntrantId:$playerId)
                      slots{
                        entrant{
                          name
                          standing {
                            isFinal
                            placement
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
  }
}`;

        request({
            method: 'POST',
            uri: `https://api.start.gg/gql/alpha`,
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
            //console.log(resBody);

            if (resBody.errors != undefined && resBody.errors.length > 0) {
                gf.sendMessage("Error Found: " + resBody.errors[0].message, msgChannel);
                return;
            }

            // Find Smash Ultimate Singles since that it always the highest entrants per tournament
            var i = 0;
            var biggestEventIndex = -1;
            var maxEntrants = 0;
            while (i < resBody.data.tournament.events.length) {
                if (resBody.data.tournament.events[i].videogame.id == 1386 && resBody.data.tournament.events[i].type == 1 &&
                    resBody.data.tournament.events[i].numEntrants > maxEntrants) {
                    biggestEventIndex = i;
                    maxEntrants = resBody.data.tournament.events[i].numEntrants
                }
                i = i + 1;
            }

            if (!maxEntrants) {
                gf.sendMessage("Could not find Smash Ultimate tournament. Is the tournament found in Start.gg?", msgChannel);
                gf.logInfo(gf.LogsEnum.log, "Could not find Smash Ultimate Tournament with slug: " + tourneySlugGlobal, msgChannel);
                return;
            }

            var totalEventEntrants = resBody.data.tournament.events[biggestEventIndex].numEntrants;

            var allPhases = resBody.data.tournament.events[biggestEventIndex].phases;

            if (!(!!allPhases[0].phaseGroups.nodes[0])) {
                gf.sendMessage("Could not find player in bracket for Smash Ultimate Singles.", msgChannel);
                gf.logInfo(gf.LogsEnum.log, "Could not find player in bracket for Smash Ultimate Singles with tag: " + playerTag, msgChannel);
                return;
            }

            console.log("Phase Groups: " + allPhases[0].phaseGroups);

            if (!(!!allPhases[0].phaseGroups.nodes[0].seeds.nodes[0])) {
                gf.sendMessage("Some issue occurred with getting phase groups...", msgChannel);
                gf.logInfo(gf.LogsEnum.log, "Could not find player in bracket for Smash Ultimate Singles with tag: " + playerTag, msgChannel);
                return;
            }

            var gamerTag = allPhases[0].phaseGroups.nodes[0].seeds.nodes[0].players[0].gamerTag,
                globalSeed = allPhases[0].phaseGroups.nodes[0].seeds.nodes[0].seedNum,
                placement = allPhases[0].phaseGroups.nodes[0].seeds.nodes[0].placement,
                poolIdentifier = allPhases[0].phaseGroups.nodes[0].displayIdentifier,
                startAt = allPhases[0].phaseGroups.nodes[0].startAt;
            //                    sets = allPhases[0].phaseGroups.nodes.seeds.nodes[0].phaseGroup.sets.nodes;


            if (!(!!gamerTag) || !(!!poolIdentifier)) {
                gf.sendMessage("Gamertag or Pool couldn't be found.", msgChannel);
                gf.logInfo(gf.LogsEnum.log, "Gamertag or Pool couldn't be found.", msgChannel);
                return
            }

            if (poolIdentifier == "1") {
                poolIdentifier = "Main Bracket"
            } else {
                poolIdentifier = "Pool " + poolIdentifier;
            }

            if (!(!!startAt)) {
                var completeInfo = gamerTag + " -> " + poolIdentifier + " (Seed #" + globalSeed + " of " + totalEventEntrants + ")\n"
            } else {
                var date = new Date(startAt * 1000);
                var completeInfo = gamerTag + " -> " + poolIdentifier + " [Starts on " + date.toLocaleDateString("en-US") + " @ " + date.toLocaleTimeString("en-US", {
                    timeZone: 'America/New_York',
                    timeZoneName: 'short'
                }) + "/EST]" + " (Seed #" + globalSeed + " of " + totalEventEntrants + ")\n"
            }

            var focusedPhase = 0,
                sortedMatches = [];
            while (focusedPhase < allPhases.length) {
                if (allPhases[focusedPhase].phaseGroups.nodes.length == 0) {
                    break;
                }

                completeInfo = completeInfo + ">>>>>>>>>>" + allPhases[focusedPhase].name + ">>>>>>>>>>\n";

                var sets = allPhases[focusedPhase].phaseGroups.nodes[0].seeds.nodes[0].phaseGroup.sets.nodes;

                var focusedSet = 0;
                var winnersMatches = [],
                    losersMatches = [];
                while (focusedSet < sets.length) {

                    //                if (sets[focusedSet].slots[0].entrant != null && sets[focusedSet].slots[1].entrant != null) {
                    if (sets[focusedSet].slots[0].entrant.name.includes(gamerTag) || sets[focusedSet].slots[1].entrant.name.includes(gamerTag)) {
                        if (sets[focusedSet].round > 0) {
                            winnersMatches.push(sets[focusedSet]);
                        } else {
                            losersMatches.push(sets[focusedSet]);
                        }
                    }
                    //                }
                    focusedSet = focusedSet + 1;
                }

                gf.logInfo(gf.LogsEnum.log, "Winners Count: " + winnersMatches.length, msgChannel);
                gf.logInfo(gf.LogsEnum.log, "Losers Count: " + losersMatches.length, msgChannel);
                if (winnersMatches.length != 0) {
                    sortedMatches = sortPlayersSets(winnersMatches, losersMatches);
                } else {
                    sortedMatches = sortLosersMatches(losersMatches);
                }

                focusedSet = 0;
                while (focusedSet < sortedMatches.length) {
                    if (!(!!sortedMatches[focusedSet].slots[0].entrant)) {
                        if (sortedMatches[focusedSet].slots[1].entrant.name.includes(gamerTag)) {
                            completeInfo = completeInfo + "Waiting for opponent in " + sortedMatches[focusedSet].fullRoundText;
                        }
                    } else if (!(!!sortedMatches[focusedSet].slots[1].entrant)) {
                        if (sortedMatches[focusedSet].slots[0].entrant.name.includes(gamerTag)) {
                            completeInfo = completeInfo + "Waiting for opponent in " + sortedMatches[focusedSet].fullRoundText;
                        }
                    } else {
                        if (sortedMatches[focusedSet].slots[0].entrant.name.includes(gamerTag)) {
                            completeInfo = completeInfo + " Vs. " + sortedMatches[focusedSet].slots[1].entrant.name + " (" + sortedMatches[focusedSet].fullRoundText + ")" + getSetCountString(sortedMatches[focusedSet].displayScore) + "\n";
                        } else if (sortedMatches[focusedSet].slots[1].entrant.name.includes(gamerTag)) {
                            completeInfo = completeInfo + " Vs. " + sortedMatches[focusedSet].slots[0].entrant.name + " (" + sortedMatches[focusedSet].fullRoundText + ")" + getSetCountString(sortedMatches[focusedSet].displayScore) + "\n";
                        }
                    }
                    focusedSet = focusedSet + 1;
                }


                focusedPhase = focusedPhase + 1;
            }

            var finalPlacementStr = checkForAndReturnFinalPlacement(sortedMatches, gamerTag, totalEventEntrants, msgChannel);


            if (finalPlacementStr.length != 0) {
                completeInfo = completeInfo + finalPlacementStr;
            }

            if (body) {
                gf.sendMessage(completeInfo, msgChannel);
            } else {
                gf.sendMessage("No body found in reply.", msgChannel);
                gf.logInfo(gf.LogsEnum.warn, 'Status Code ' + response.statusCode + ", and body: " + body, msgChannel);
            }
        });


    });

}

function setTournamentSlug(args, msgChannel) {

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
        uri: `https://api.start.gg/gql/alpha`,
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
        console.log("body: " + body + " , error: " + error);
        var resBody = JSON.parse(body);
        gf.logInfo(gf.LogsEnum.log, 'Status Code ' + response.statusCode + ", and body: " + resBody.toString(), msgChannel);

        if (!(!!resBody.data.tournament)) {
            gf.sendMessage("Could not find the tournament. Is the tournament found in Start.gg?", msgChannel);
            return;
        }

        tourneySlugGlobal = tourneySlug;
        gf.logInfo(gf.LogsEnum.log, 'New Tourney Slug Global: ' + tourneySlugGlobal, msgChannel);
        gf.sendMessage("Tournament Slug '" + tourneySlug + "' Stored!", msgChannel);
        gf.logInfo(gf.LogsEnum.log, 'Status Code ' + response.statusCode + ", and error: " + error, msgChannel);
        gf.logInfo(gf.LogsEnum.log, "Tournament Slug '" + tourneySlug + "' Stored!", msgChannel);

        //        request({
        //            method: 'PATCH',
        //            uri: `https://api.heroku.com/apps/${appNameGlobal}/config-vars`,
        //            //                uri: `https://api.heroku.com/apps/${process.env.BOT_TOKEN}/config-vars`,
        //            headers: {
        //                Accept: 'application/vnd.heroku+json; version=3',
        //                Authorization: `Bearer ${herokuBearerGlobal}`,
        //                'Content-Type': 'application/json'
        //            },
        //            body: JSON.stringify({
        //                TOURNEY_SLUG: tourneySlug
        //            })
        //        }, function (error, response, body) {
        //            if (response.statusCode == 200) {
        //                tourneySlugGlobal = tourneySlug;
        //                gf.logInfo(gf.LogsEnum.log, 'New Tourney Slug Global: ' + tourneySlugGlobal, msgChannel);
        //                gf.sendMessage("Tournament Slug '" + tourneySlug + "' Stored!", msgChannel);
        //                gf.logInfo(gf.LogsEnum.log, 'Status Code ' + response.statusCode + ", and error: " + error, msgChannel);
        //                gf.logInfo(gf.LogsEnum.log, "Tournament Slug '" + tourneySlug + "' Stored!", msgChannel);
        //            } else {
        //                gf.sendMessage("Tournament Slug could not be stored! Try again.", msgChannel);
        //                gf.logInfo(gf.LogsEnum.warn, 'Status Code ' + response.statusCode + ", and body: " + body, msgChannel);
        //            }
        //        });
    });
}

// var playerId = resBody.data.tournament.participants.nodes[0].entrants[0].id;
function getSinglesPlayerId(entrantsArr) {
    for (var i = 0; i < entrantsArr.length; i = i + 1) {
        if (entrantsArr[i].event.name.includes("Ultimate") && entrantsArr[i].event.name.includes("Singles")) {
            return entrantsArr[i].id;
        }
    }
    return 0;
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
    var srtLosers = sortLosersMatches(losers);

    for (i = 0; i < srtLosers.length; i = i + 1) {
        winners.push(srtLosers[i]);
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

function sortLosersMatches(losers) {
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

    return losers.reverse();
}

function checkForAndReturnFinalPlacement(srtMatches, focusedPlayer, totalPlayers, msgChannel) {
    var lastMatchIndex = srtMatches.length - 1;
    if (!(!!srtMatches[lastMatchIndex].slots[0].entrant.standing)) {
        gf.logInfo(gf.LogsEnum.log, "Entrant standing not found.", msgChannel);
        return ""
    }

    if (srtMatches[lastMatchIndex].slots[0].entrant.name.includes(focusedPlayer) && srtMatches[lastMatchIndex].slots[0].entrant.standing.isFinal) {
        var placement = srtMatches[lastMatchIndex].slots[0].entrant.standing.placement;
        gf.logInfo(gf.LogsEnum.log, "First player found: " + focusedPlayer + ", placement found: " + placement, msgChannel);
        return "Final Placing: " + placement + "/" + totalPlayers;
    }

    //If second entrant is null (when first person is waiting for other players)
    if (!(!!srtMatches[lastMatchIndex].slots[1].entrant)) {
        return "";
    }


    if (srtMatches[lastMatchIndex].slots[1].entrant.name.includes(focusedPlayer) && srtMatches[lastMatchIndex].slots[1].entrant.standing.isFinal) {
        var placement = srtMatches[lastMatchIndex].slots[1].entrant.standing.placement;
        gf.logInfo(gf.LogsEnum.log, "Second player found: " + focusedPlayer + ", placement found: " + placement, msgChannel);
        return "Final Placing: " + placement + "/" + totalPlayers;
    }
    gf.logInfo(gf.LogsEnum.log, "Entrant standing is not finalized.", msgChannel);
    return "";
}

function getSetCountString(displayScoreStr) {
    if (!(!!displayScoreStr)) {
        return "";
    }

    if (displayScoreStr == "DQ") {
        return " -> DQ";
    }

    var leftNum = parseInt(displayScoreStr.charAt(0)),
        rightNum = parseInt(displayScoreStr.charAt(displayScoreStr.length - 1));

    if (leftNum > rightNum) {
        return " -> Won " + displayScoreStr;
    } else {
        return " -> Lost " + displayScoreStr;
    }
}

module.exports = {
    act: function (args, msgChannel) {
        if (!(!!args[0])) {
            if (!(!!tourneySlugGlobal)) {
                gf.sendMessage("Tourney Slug Not Active or Correct.", msgChannel);
                return;
            }

            gf.sendMessage("Current Tournament URL: https://start.gg/tournament/" + tourneySlugGlobal + "/details", msgChannel);
            gf.logInfo(gf.LogsEnum.log, "Tourney URL given in #" + msgChannel.name, msgChannel);
            return;
        }

        var subCmd = args[0].toLowerCase();

        args = args.splice(1);

        switch (subCmd) {
            case 'att':
                getTotalAttendees(args, msgChannel);
                gf.logInfo(gf.LogsEnum.log, "Start GG 'att' command called in #" + msgChannel.name, msgChannel);
                break;

            case 't8':
                if (args.length == 0) {
                    gf.logInfo(gf.LogsEnum.log, "Start GG 't8' command called with no args in #" + msgChannel.name, msgChannel);
                    getTop8(args, msgChannel);
                } else {
                    gf.logInfo(gf.LogsEnum.log, "Start GG 't8' command called with args in #" + msgChannel.name, msgChannel);
                    getTop8ByArgs(args, msgChannel);
                }
                break;

            case 'set':
                if (args.length == 0) {
                    gf.sendMessage("The current tournament slug saved is '" + tourneySlugGlobal + "'", msgChannel);
                    return;
                }

                setTournamentSlug(args, msgChannel);
                break;

            case 'url':
                gf.sendMessage("https://www.start.gg/tournament/" + tourneySlugGlobal + "/events", msgChannel);
                break;
            default:
                args.unshift(subCmd);
                if (args[0] == undefined) {
                    gf.sendMessage('No gamertags given.', msgChannel);
                    return;
                }
                gf.logInfo(gf.LogsEnum.log, "Start GG command to fetch pool info called in #" + msgChannel.name, msgChannel);
                getPoolAndMatches(args, msgChannel);

                break;
        }

    }
};
