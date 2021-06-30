var gf = require('../generalFunc.js');

var specialUrlEntries = {
    'banjo': 'banjo_and_kazooie',
    'bayo': 'bayonetta',
    'bayonetta': 'bayonetta',
    'bowser': 'bowser',
    'byleth': 'byleth',
    'jr': 'bowser_jr',
    'falcon': 'captain_falcon',
    'chrom': 'chrom',
    'cloud': 'cloud',
    'corrin': 'corrin',
    'daisy': 'daisy',
    'dpit': 'dark_pit',
    'pit2': 'dark_pit',
    'dsamus': 'dark_samus',
    'samus2': 'dark_samus',
    'diddy': 'diddy_kong',
    'dk': 'donkey_kong',
    'donkey': 'donkey_kong',
    'doc': 'dr_mario',
    'duck': 'duck_hunt',
    'dhunt': 'duck_hunt',
    'falco': 'falco',
    'fox': 'fox',
    'ganon': 'ganondorf',
    'greninja': 'greninja',
    'hero': 'hero',
    'ices': 'ice_climbers',
    'ike': 'ike',
    'inci': 'inceneroar',
    'incineroar': 'incineroar',
    'inkling': 'inkling',
    'ink': 'inkling',
    'isabelle': 'isabelle',
    'isa': 'isabelle',
    'jigglypuff': 'jigglypuff',
    'jiggs': 'jigglypuff',
    'puff': 'jigglypuff',
    'joker': 'joker',
    'kazuya': 'kazuya',
    'ken': 'ken',
    'ddd': 'king_dedede',
    'dedede': 'king_dedede',
    'krool': 'king_k_rool',
    'kirby': 'kirby',
    'link': 'link',
    'mac': 'little_mac',
    'lucario': 'lucario',
    'lucas': 'lucas',
    'lucina': 'lucina',
    'luigi': 'luigi',
    'mario': 'mario',
    'marth': 'marth',
    'megaman': 'mega_man',
    'mega': 'mega_man',
    'mk': 'meta_knight',
    'meta': 'meta_knight',
    'mewtwo': 'mewtwo',
    'mew2': 'mewtwo',
    'brawler': 'mii_brawler',
    'gunner': 'mii_gunner',
    'swordfighter': 'mii_swordfighter',
    'minmin': 'minmin',
    'min': 'minmin',
    'gnw': 'mr_game_and_watch',
    'game': 'mr_game_and_watch',
    'mythra': 'mythra',
    'ness': 'ness',
    'olimar': 'olimar',
    'pac': 'pac_man',
    'pacman': 'pac_man',
    'palu': 'palutena',
    'palutena': 'palutena',
    'peach': 'peach',
    'pichu': 'pichu',
    'pika': 'pikachu',
    'pikachu': 'pikachu',
    'plant': 'piranha_plant',
    'pit': 'pit',
    'pyra': 'pyra',
    'squirtle': 'pt_squirtle',
    'ivysaur': 'pt_ivysaur',
    'ivy': 'pt_ivysaur',
    'charizard': 'pt_charizard',
    'richter': 'richter',
    'whip2': 'richter',
    'ridley': 'ridley',
    'rob': 'rob',
    'robin': 'robin',
    'rosa': 'rosalina_and_luma',
    'rosalina': 'rosalina_and_luma',
    'roy': 'roy',
    'ryu': 'ryu',
    'samus': 'samus',
    'sephiroth': 'sephiroth',
    'seph': 'sephiroth',
    'sheik': 'sheik',
    'shulk': 'shulk',
    'simon': 'simon',
    'whip': 'simon',
    'snake': 'snake',
    'sonic': 'sonic',
    'steve': 'steve',
    'terry': 'terry',
    'tlink': 'toon_link',
    'tink': 'toon_link',
    'toon': 'toon_link',
    'villager': 'villager',
    'villy': 'villager',
    'wario': 'wario',
    'wft': 'wii_fit_trainer',
    'wolf': 'wolf',
    'yoshi': 'yoshi',
    'ylink': 'young_link',
    'yink': 'young_link',
    'young': 'young_link',
    'zelda': 'zelda',
    'zss': 'zero_suit_samus',
    'zero': 'zero_suit_samus',
    'stats': 'stats'
};

module.exports = {
    act: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage("What character do you want the frame data for?", msgChannel);
            return;
        }

        var characterURLExtension = specialUrlEntries[args[0].toLowerCase()];

        if (characterURLExtension == undefined) {
            gf.sendMessage("Who this? Couldn't find them.", msgChannel);
            return;
        } else {
            gf.sendMessage("https://ultimateframedata.com/" + characterURLExtension + ".php", msgChannel);
            return;
        }
    }
};
