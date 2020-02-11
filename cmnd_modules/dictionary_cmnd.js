var gf = require('../generalFunc.js');

var dictionaryEntries = {
    '50/50':'_50/50_: Represents the chance you have of guessing what your opponent is going to do and you react to the guess in a scenario where guessing right will let you escape but guessing wrong will get you hit.',
    'advantage':'_Advantage_: A state in which a player has more options than their opponent in a given senario. Example: When your opponent is on ledge, you have more options like retreating, ledge trapping, or going for a ledge trump.',
    'bait':'_Baiting_: The act of trying to trick the opponent into doing an action that the player can then punish them for.',
    'baiting':'_Baiting_: The act of trying to trick the opponent into doing an action that the player can then punish them for.',
    'combo':'_Combo_: A series of attacks strung together in succession.',
    'confirm':'_Confirm_: This involves throwing out a fast and safe attack such that if it misses you should be fine but if it hits, you\'ll be able to react to this and string the hit into an attack that otherwise would have been unsafe to throw out just by itself due to the lag being easily punishable.',
    'disadvantage':'_Disadvantage_: A state in which a player has less options than their opponent in a given scenario. Example: When you are grabbing ledge, you do not have the option to retreat and must select a ledge option which the opponent can be ready for.',
    'dsr':'_Dave\'s Stupid Rule_: A tournament rule that prevents one from counterpicking to a stage he/she already won on/last won on depending on which version is used.',
    'edgeguarding':'_Edgeguarding_: The attempt to prevent an offstage recovering opponent from reaching the stage, thus causing them to be KO\'d.',
    'hitstun':'_Hitstun_: The time you cannot take any action after being hit.',
    'infinite':'_Infinite_: A combo that can continue indefinitely regardless of damage while keeping the opponent locked in with no chance to escape if performed correctly.',
    'jablock':'_Jab Lock_: A form of tech chasing where you punish the no tech by "locking" them is place with a jab. You can hit them up to three times in this position.',
    'juggling':'_Juggling_: A type of combo that involves repeatedly hitting someone into the air without letting them recover or hit the ground.',
    'ledge':'_Ledge Trap_: The process of keeping an opponent on the ledge of the stage by means of covering options and launching them back to the ledge as they try to return to stage.',
    'ledgetrap':'_Ledge Trap_: The process of keeping an opponent on the ledge of the stage by means of covering options and launching them back to the ledge as they try to return to stage.',
    'ledgetrapping':'_Ledge Trapping_: The process of keeping an opponent on the ledge of the stage by means of covering options and launching them back to the ledge as they try to return to stage.',
    'lock':'a form of tech chasing where you punish the no tech by "locking" them with low knockback attacks, often done with jab attack. You can hit them up to three times in this position.',
    'matchup':'_Matchup_: The measure of how a character is expected to perform versus another character, with both played at high, equal skill.',
    'mindgame':'_Mindgame_: Strategies or techniques employed for the purpose of outwitting the opponent psychologically. The primary component of cerebral skill, the counterpart to technical skill.',
    'mixup':'_Mixup_: When you change your pattern of play in a way that potentially traps your opponent based on them reacting to what they think you\'re going to do instead of what you\'ll actually do.',
    'neutral':'_Neutral_: The phase in a game in which no opponent has an advantage over the other.',
    'pressure':'_Pressure_: The act of limiting the opponent\'s options to force them to react in a detrimental manner.',
    'pressuring':'_Pressure_: The act of limiting the opponent\'s options to force them to react in a detrimental manner.',
    'punish':'_Punish_: Attacking the foe while they\'re vulnerable, usually after failing to execute an attack/strategy.',
    'read':'_Read_: A term used to refer to when a player successfully predicts the opponent\'s next action and is able to preemptively react to punish it effectively.',
    'risk':'_Risk/Reward_: The ratio of how risky a move or play is to execute for you and how high the payoff or benefit is to land the move or play on your opponent.',
    'risk/reward':'_Risk/Reward_: The ratio of how risky a move or play is to execute for you and how high the payoff or benefit is to land the move or play on your opponent.',
    'spacing':'_Spacing_: The act of manipulating an opponent\'s position by utilising the range of one\'s character\'s moves relative to the range of the opposing character\'s moves.',
    'stalling':'_Stalling_: The act of deliberately avoiding all conflict, often through the use of extreme exploits to leave oneself invulnerable or out of reach for an extended period of time, with the intent of letting a match\'s time run out or making the game unplayable.',
    'string':'_String_: A series of attacks strung together where the opponent was capable of reacting inbetween blows and could have thus escaped.',
    'techchase':'_Tech Chase_: The act of following or predicting an opponent\'s tech or floor recovery in order to attack them before they can respond.',
    'techchasing':'_Tech Chase_: The act of following or predicting an opponent\'s tech or floor recovery in order to attack them before they can respond.',
    'tech-chasing':'_Tech Chase_: The act of following or predicting an opponent\'s tech or floor recovery in order to attack them before they can respond.',
    'techskill':'_Tech Skill_: Refers to a player\'s ability to manipulate their controller to produce desired inputs',
    'truecombo':'_True Combo_: A series of attacks strung together where the opponent was truly incapable of escaping before the finish.',
    'zero':'_Zero to Death_: Refer to any general sequence of moves that started on the opponent at zero damage, and finished with them KO\'d, that weren\'t combo\'d together but the opponent was unable to successfully hit back or interrupt the sequence.',
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