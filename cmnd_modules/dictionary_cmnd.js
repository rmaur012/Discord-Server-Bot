var gf = require('../generalFunc.js');

var dictionaryEntries = {
    'bait':'_Baiting_: The act of trying to trick the opponent into doing an action that the player can then punish them for.',
    'baiting':'_Baiting_: The act of trying to trick the opponent into doing an action that the player can then punish them for.',
    'dsr':'_Dave\'s Stupid Rule_: A tournament rule that prevents one from counterpicking to a stage he/she already won on/last won on depending on which version is used.',
    'hitstun':'_Hitstun_: The time you cannot take any action after being hit.',
    'infinite':'_Infinite_: A combo that can continue indefinitely regardless of damage while keeping the opponent locked in with no chance to escape if performed correctly.',
    'matchup':'_Matchup_: The measure of how a character is expected to perform versus another character, with both played at high, equal skill.',
    'mindgame':'_Mindgame_: Strategies or techniques employed for the purpose of outwitting the opponent psychologically. The primary component of cerebral skill, the counterpart to technical skill.',
    'neutral':'_Neutral_: The phase in a game in which no opponent has an advantage over the other.',
    'pressure':'_Pressure_: The act of limiting the opponent\'s options to force them to react in a detrimental manner.',
    'pressuring':'_Pressure_: The act of limiting the opponent\'s options to force them to react in a detrimental manner.',
    'punish':'_Punish_: Attacking the foe while they\'re vulnerable, usually after failing to execute an attack/strategy.',
    'read':'_Read_: A term used to refer to when a player successfully predicts the opponent\'s next action and is able to preemptively react to punish it effectively.',
    'spacing':'_Spacing_: The act of manipulating an opponent\'s position by utilising the range of one\'s character\'s moves relative to the range of the opposing character\'s moves.',
    'stalling':'_Stalling_: The act of deliberately avoiding all conflict, often through the use of extreme exploits to leave oneself invulnerable or out of reach for an extended period of time, with the intent of letting a match\'s time run out or making the game unplayable.',
    'techskill':'_Tech Skill_: Refers to a player\'s ability to manipulate their controller to produce desired inputs',
    'zerotodeath':'_Zero to Death_: Refer to any general sequence of moves that started on the opponent at zero damage, and finished with them KO\'d, that weren\'t combo\'d together but the opponent was unable to successfully hit back or interrupt the sequence.'
    
};

module.exports = {
    act: function(args, msgChannel) {
        if(args.length == 0){
            gf.sendMessage("What word are you searching for?", msgChannel);
            return ;
        }
        
        var dictEntry = dictionaryEntries[args[0].toLowerCase()];
        
        if(dictEntry == undefined) {
           gf.sendMessage("Couldn't find the term.", msgChannel);
            return ;
        } else {
            gf.sendMessage(dictEntry, msgChannel);
            return ;
        }
    }
};