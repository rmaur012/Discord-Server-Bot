var gf = require('../generalFunc.js');

var maxLevers = ["blue", "green", "yellow", "red", "white", "pink", "purple", "orange", "black", "cyan", "silver"];

//DS: A Lever will be represented by a small array as [color of lever, boolean of if the lever has been pressed]
var activeLevers = [];
var unpressedLevers = 0;

var bomb = "";

function setActiveLevers(leversToActivate) {
    var finalLevers = [];
    for (var i = 0; i < leversToActivate.length; i = i + 1) {
        finalLevers.push([leversToActivate[i], false]);
    }
    return finalLevers;
}

function printLeversLeft(leversArray) {
    var leverString = "";
    for (var i = 0; i < leversArray.length; i++) {
        // If lever has not been pressed (meaning false).
        if (!activeLevers[i][1]) {
            leverString = leverString + activeLevers[i][0] + " ";
        }
    }

    return leverString;
}

function findIndexOfLever(leversArray, selectedLeverString) {
    for (var i = 0; i < leversArray.length; i = i + 1) {
        if (leversArray[i][0] == selectedLeverString) {
            return i;
        }
    }
    return -1;
}

function resetLevers(leverIndex, activeLeversArray) {
    var ala = activeLeversArray;
    ala.splice(leverIndex, 1);
    var newBomb = ala[Math.floor(Math.random() * ala.length)][0];

    //Revert each lever left over back to the `unpressed` status
    for (var i = 0; i < ala.length; i = i + 1) {
        ala[i][1] = false;
    }
    return [ala, newBomb];

}

function countdownPlusResult(result, msgChnl) {
    setTimeout(function () {
        gf.sendMessage("3...", msgChnl);
    }, 500);
    setTimeout(function () {
        gf.sendMessage("2...", msgChnl);
    }, 1000);
    setTimeout(function () {
        gf.sendMessage("1...", msgChnl);
    }, 1500);
    setTimeout(function () {
        gf.sendMessage(result, msgChnl);
    }, 2000);
}

module.exports = {
    act: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage("What do you want to do/ in the game?", msgChannel);
            return;
        }

        var command = args[0].toLowerCase();


        if (command == "start" && activeLevers.length == 0) {
            if (args.length == 1) {
                gf.sendMessage("How many players are playing? Enter *!lvr start #*. Max of 10, min of 2.", msgChannel);
                return;
            } else if (isNaN(args[1]) || parseInt(args[1]) < 2 || parseInt(args[1]) > 10) {
                gf.sendMessage("Please enter a valid number for the number of players! Max of 10, min of 2.", msgChannel);
                return;
            }

            activeLevers = setActiveLevers(maxLevers.slice(0, parseInt(args[1]) + 1));
            unpressedLevers = activeLevers.length;
            bomb = activeLevers[Math.floor(Math.random() * unpressedLevers)][0];


            var leverString = "";
            for (var i = 0; i < activeLevers.length; i++) {
                if (i == activeLevers.length - 1) {
                    leverString = leverString + " and " + activeLevers[i][0];
                } else {
                    leverString = leverString + activeLevers[i][0] + ", ";
                }
            }

            gf.sendMessage("The " + leverString + " levers have been set!", msgChannel);
            return;

        } else if (activeLevers.length == 0) {
            gf.sendMessage("No game is active. You can start one with *!lvr start (# of players)*!", msgChannel);
            return;

        } else if (command == "left" || command == "colors") {
            var leversString = printLeversLeft(activeLevers);
            gf.sendMessage("The remaining lever(s) are " + leversString, msgChannel);
            return;

        } else {
            var leverLocation = findIndexOfLever(activeLevers, command);
            if (leverLocation == -1) {
                gf.sendMessage("That lever is not an active lever!", msgChannel);
                return;
            } else {
                if (bomb == activeLevers[leverLocation][0]) {
                    countdownPlusResult("BOOM!", msgChannel);

                    if ((activeLevers.length - 1) == 2) {
                        setTimeout(function () {
                            gf.sendMessage("This game is over! You may start a new one!", msgChannel);
                        }, 2000);
                        activeLevers = [];
                    } else {
                        setTimeout(function () {
                            gf.sendMessage("Resetting Levers...", msgChannel);
                        }, 2000);

                        var nextPhase = resetLevers(leverLocation, activeLevers);
                        activeLevers = nextPhase[0];
                        unpressedLevers = activeLevers.length;
                        bomb = nextPhase[1];
                        var leversString = printLeversLeft(activeLevers);
                        setTimeout(function () {
                            gf.sendMessage("Remaining lever(s): " + leversString, msgChannel);
                        }, 2000);
                    }
                    return;
                } else {
                    countdownPlusResult("...OK!", msgChannel);

                    activeLevers[leverLocation][1] = true;
                    unpressedLevers = unpressedLevers - 1;

                    if (unpressedLevers == 1) {
                        setTimeout(function () {
                            gf.sendMessage("Bomb found! Resetting levers!", msgChannel);
                        }, 3000);
                        
                        bomb = activeLevers[Math.floor(Math.random() * activeLevers.length)][0];

                        //Revert each lever left over back to the `unpressed` status
                        for (var i = 0; i < activeLevers.length; i = i + 1) {
                            activeLevers[i][1] = false;
                        }
                        unpressedLevers = activeLevers.length;
                    }


                    var leversString = printLeversLeft(activeLevers);
                    setTimeout(function () {
                        gf.sendMessage("Remaining lever(s): " + leversString, msgChannel);
                    }, 3000);
                    return;
                }
            }
        }
    }
};
