var gf = require('../generalFunc.js');

var maxLevers = ["blue", "green", "yellow", "red", "white", "pink", "purple", "orange", "black", "cyan", "silver"];

var activeLevers = [];
var totalLevers = 0;

var bomb = "";

function printLeversLeft(leversArray) {
    if (leversArray.length == 1) {
        return activeLevers[0];
    } else if (leversArray.length == 2) {
        return activeLevers[0] + " and " + activeLevers[1];
    }

    var leverString = "";
    for (var i = 0; i < leversArray.length; i++) {
        if (i == activeLevers.length - 1) {
            leverString = leverString + " and " + activeLevers[i];
        } else {
            leverString = leverString + activeLevers[i] + ", ";
        }
    }

    return leverString;
}

function resetLevers(leverIndex, activeLeversArray) {
    var ala = activeLeversArray;
    ala.splice(leverIndex, 1);
    var newBomb = activeLevers[Math.floor(Math.random() * activeLeversArray.length)];
    return [ala, newBomb];

}

module.exports = {
    act: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage("What do you want to do in the game?", msgChannel);
            return;
        }


        if (args[0] == "start" && activeLevers.length == 0) {
            if (args.length == 1) {
                gf.sendMessage("How many players are playing? Enter *!lvr start #*. Max 10 players.", msgChannel);
                return;
            } else if (isNaN(args[1]) || parseInt(args[1]) < 2 || parseInt(args[1]) > 10) {
                gf.sendMessage("Please enter a valid number for the number of players! Max of 10, min of 2.", msgChannel);
                return;
            }
            totalLevers = parseInt(args[1]) + 1;
            activeLevers = maxLevers.slice(0, totalLevers);
            bomb = activeLevers[Math.floor(Math.random() * totalLevers)];

            var leverString = "";
            for (var i = 0; i < activeLevers.length; i++) {
                if (i == activeLevers.length - 1) {
                    leverString = leverString + " and " + activeLevers[i];
                } else {
                    leverString = leverString + activeLevers[i] + ", ";
                }
            }

            gf.sendMessage("The " + leverString + " levers have been set!", msgChannel);
            return;
        } else if (args[0] == "left" || args[0] == "colors") {
            if (activeLevers.length == 0) {
                gf.sendMessage("No game is active. You can start one with *!lvr start (number)*!", msgChannel);
                return;
            }
            
            var leversString = printLeversLeft(activeLevers);
            gf.sendMessage("The remaining lever(s) are " + leversString, msgChannel);
            return;
        } else {
            if (activeLevers.length == 0) {
                gf.sendMessage("No game is active. You can start one with *!lvr start (number)*!", msgChannel);
                return;
            }

            var leverLocation = activeLevers.indexOf(args[0]);
            if (leverLocation == -1) {
                gf.sendMessage("That lever is not an active lever!", msgChannel);
                return;
            } else {
                if (bomb == activeLevers[leverLocation]) {
                    setTimeout(function () {
                        gf.sendMessage("3...", msgChannel);
                    }, 500);
                    setTimeout(function () {
                        gf.sendMessage("2...", msgChannel);
                    }, 1000);
                    setTimeout(function () {
                        gf.sendMessage("1...", msgChannel);
                    }, 1500);
                    setTimeout(function () {
                        gf.sendMessage("BOOM!", msgChannel);
                    }, 2000);

                    activeLevers = maxLevers.slice(0, totalLevers);
                    totalLevers = totalLevers - 1;

                    if (totalLevers == 2) {
                        setTimeout(function () {
                            gf.sendMessage("This game is over! You may start a new one!", msgChannel);
                        }, 2000);
                        activeLevers = [];
                    } else {
                        setTimeout(function () {
                            gf.sendMessage("Resetting Levers...", msgChannel);
                        }, 1000);


                        var nextPhase = resetLevers(leverLocation, activeLevers);
                        activeLevers = nextPhase[0];
                        bomb = nextPhase[1];
                        return;
                    }
                } else {
                    setTimeout(function () {
                        gf.sendMessage("...OK!", msgChannel);
                    }, 1000);
                    activeLevers.splice(leverLocation, 1);
                    var leversString = printLeversLeft(activeLevers);
                    setTimeout(function () {
                        gf.sendMessage("The remaining lever(s) are " + leversString, msgChannel);
                    }, 1000);
                    return;
                }
            }
        }
    }
};
