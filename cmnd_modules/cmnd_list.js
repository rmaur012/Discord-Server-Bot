const hi = require('./hi_cmnd.js');
const quote = require('./quote_cmnd.js');
const tourney = require('./tourney_cmnd.js');
const roll = require('./roll_cmnd.js');
const kh = require('./kh_cmnd.js');
const mv = require('./mv_cmnd.js');
const yt = require('./yt_cmnd.js');
const help = require('./help_cmnd.js');
const poll = require('./poll_cmnds.js');

const music = require('./music_cmnds.js');

var cmndMap = {
    'hi': hi,
    'quote': quote,
    'tourney': tourney,
    'roll': roll,
    'kh': kh,
    'mv': mv,
    'yt': yt,
    'help': help,
    'poll': poll,
    
    'music': music
};

module.exports = {
    getMap: function(){
        return cmndMap;
    }
};
