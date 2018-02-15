var gf = require('../generalFunc.js');

function makeFunnyComment(totalNum, maxNum, modString){
    
    //These are for the funny comments that are said once a player rolls
    var quarter = maxNum / 4;
    var half = maxNum / 2;
    var threeFour = ((maxNum / 4) + (maxNum / 2));

    //This is for funny comment on roll
    var rollStr = "You rolled a **" + totalNum.toString() + "**! " + modString + "\n";
    if (totalNum == 1) {
        rollStr = rollStr + "...Oh boy.";
    } else if(totalNum > 1 && totalNum <= quarter){
        rollStr = rollStr + "You got bodied!";
    } else if (totalNum > quarter && totalNum <= half) {
        rollStr = rollStr + "Ouch!";
    } else if (totalNum > half && totalNum <= threeFour) {
        rollStr = rollStr + "Not bad!";
    } else if (totalNum > threeFour && totalNum <= maxNum) {
        rollStr = rollStr + "DESTRUCTION!";
    }
    
    return rollStr;
}

function rollD(numOfRolls, highRoll, modNum, modStr, msgChannel) {

    //This keeps track of whether it is only 1 roll or more. 
    //Used for determining if to show the number rolled only if there are more than 1 roll and no modifiers.
    var theRolls = numOfRolls;
    
    var num = gf.getRNGInteger(1, highRoll);;
    var totalNum = num;
    var modString = "**(" + parseInt(num);
    //console.log("Num of rolls: " + parseInt(numOfRolls));
    numOfRolls--;
    //console.log("Num of rolls: " + parseInt(numOfRolls));
    
    while (numOfRolls > 0) {
        num = gf.getRNGInteger(1, highRoll);
        totalNum += num;
        modString += ", " + parseInt(num);
        numOfRolls--;
    }

    if (modNum != 0) {
        modString += modStr;
    } else {
        modString += ")**";
        if(theRolls == 1){
            modString = "";
        }
    }
    
    //Add modifiers after making the string
    totalNum = totalNum + modNum;

    var maxNum = highRoll + modNum;
    
    
    var rollStr = makeFunnyComment(totalNum, maxNum, modString);

    //Tell player about their roll
    gf.sendMessage(rollStr, msgChannel);
}

module.exports = {
    act: function (args, msgChannel) {
        var rollType, findD;
        if (args.length == 0) {
            rollType = '20';
        } else {
            rollType = args[0];
            if (parseInt(rollType) < 2 && rollType.indexOf("d") == -1) {
                gf.sendMessage("Dice roll number is too low. Let's just say you got a 1.", msgChannel);
                return;
            }
        }

        findD = rollType.indexOf("d");


        //If the "d" is the first character or the last, its a wrong command
        if (findD == 0 || findD == rollType.length - 1) {
            gf.sendMessage("Dice roll is invalid. Let's just say you got a 1.", msgChannel);
            return;
        } else {

            var numOfRolls, num, highRoll;
            if (findD > -1) {
                numOfRolls = parseInt(rollType.slice(0, findD));
                highRoll = parseInt(rollType.slice(findD + 1));
            } else {
                numOfRolls = 1;
                highRoll = parseInt(rollType);
            }
            var maxNum;
            var possibleModifier = "";
            var modNum = 0;

            //This part adds any modifiers that was added
            var addedNums = "";
            if (args.length > 1) {
                var index = 1;
                var toAdd;
                while (index != args.length) {
                    toAdd = parseInt(args[index]);
                    modNum += toAdd;
                    addedNums += ", " + args[index];
                    index++;
                }
                addedNums += ")**";
            }

            rollD(numOfRolls, highRoll, modNum, addedNums, msgChannel);
            return;

            /*Start rolling here and sending results in a string.
            var modString = "";
            while (numOfRolls != 0) {
                num = gf.getRNGInteger(1, highRoll);

                //These are for the funny comments that are said once a player rolls
                maxNum = highRoll + modNum;
                var quarter = maxNum / 4;
                var half = maxNum / 2;
                var threeFour = ((maxNum / 4) + (maxNum / 2));

                //This sets up the string that will display the roll and modifiers
                if (args.length > 1) {
                    modString = "**(" + num.toString() + addedNums;
                } else {
                    modString = "";
                }

                ////Add modifiers after making the string
                num = num + modNum;

                //This is for funny comment on roll
                var rollStr = "You rolled a **" + num.toString() + "**! " + modString + "\n";
                if (num <= quarter) {
                    rollStr = rollStr + "You got bodied!";
                } else if (num > quarter && num <= half) {
                    rollStr = rollStr + "Ouch!";
                } else if (num > half && num <= threeFour) {
                    rollStr = rollStr + "Not bad!";
                } else if (num > threeFour && num <= maxNum) {
                    rollStr = rollStr + "DESTRUCTION!";
                }

                //Tell player about their roll
                gf.sendMessage(rollStr, msgChannel);

                numOfRolls--;
            }*/

        }
    }
};
