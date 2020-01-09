var gf = require('../generalFunc.js');

var specialUrlEntries = {
    'banjo':'banjo_and_kazooie',
    'bayo':'bayonetta',
    'bowser':'bowser',
    'jr':'bowser_jr',
    'falcon':'captain_falcon',
    'chrom':'chrom',
    'cloud':'cloud',
    'corrin':'corrin',
    'daisy':'daisy',
    'dpit':'dark_pit',
    'pit2':'dark_pit',
    'dsamus':'dark_samus',
    'samus2':'dark_samus',
    'diddy':'diddy_kong',
    'dk':'donkey_kong',
    'doc':'dr_mario',
    'dhunt':'duck_hunt',
    'falco':'falco',
    'fox':'fox',
    'ganon':'ganondorf',
    'greninja':'greninja',
    'hero':'hero',
    'icis':'ice_climbers',
    'ike':'ike',
    'inci':'inceneroar',
    'incineroar':'incineroar',
    'inkling':'inkling',
    'ink':'inkling',
    'isabelle':'isabelle',
    'isa':'isabelle',
    'jiggs':'jigglypuff',
    'joker':'joker',
    'ken':'ken',
    'ddd':'king_dedede',
    'krool':'king_k_rool',
    'kirby':'kirby',
    'link':'link',
    'mac':'little_mac',
    'lucario':'lucario',
    'lucas':'lucas',
    'lucina':'lucina',
    'luigi':'luigi',
    'mario':'mario',
    'marth':'marth',
    'megaman':'mega_man',
    'mk':'meta_knight',
    'mewtwo':'mewtow',
    'mew2':'mewtwo',
    'brawler':'mii_brawler',
    'gunner':'mii_gunner',
    'swordfighter':'mii_swordfighter',
    'gnw':'mr_game_and_watch',
    'ness':'ness',
    'olimar':'olimar',
    'pac':'pac_man',
    'pacman':'pac_man',
    'palu':'palutena',
    'peach':'peach',
    'pichu':'pichu',
    'pika':'pikachu',
    'pikachu':'pikachu',
    'plant':'piranha_plant',
    'pit':'pit',
    'squirtle':'pt_squirtle',
    'ivysaur':'pt_ivysaur',
    'ivy':'pt_ivysaur',
    'charizard':'pt_charizard',
    'richter':'richter',
    'whip2':'richter',
    'ridley':'ridley',
    'rob':'rob',
    'robin':'robin',
    'rosa':'rosalina_and_lume',
    'roy':'roy',
    'ryu':'ryu',
    'samus':'samus',
    'sheik':'sheik',
    'shulk':'shulk',
    'simon':'simon',
    'whip':'simon',
    'snake':'snake',
    'sonic':'sonic',
    'terry':'terry',
    'tlink':'toon_link',
    'tink':'toon_link',
    'villager':'villager',
    'villy':'villager',
    'wario':'wario',
    'wft':'wii_fit_trainer',
    'wolf':'wolf',
    'yoshi':'yoshi',
    'ylink':'young_link',
    'yink':'young_link',
    'zelda':'zelda',
    'zss':'zero_suit_samus',
    'stats':'stats'
};

module.exports = {
    act: function(args, msgChannel) {
        if(args.length == 0){
            gf.sendMessage("What character do you want the frame data for?", msgChannel);
            return ;
        }
        
        var characterURLExtension = specialUrlEntries[args[0].toLowerCase];
        
        if(characterURLExtension == undefined) {
           gf.sendMessage("Who this? Couldn't find them.", msgChannel);
            return ;
        } else {
            gf.sendMessage("https://ultimateframedata.com/" + characterURLExtension + ".php", msgChannel);
            return ;
        }
    }
};