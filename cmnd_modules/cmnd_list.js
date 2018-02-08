var hi = require('./hi_cmnd.js');
var quote = require('./quote_cmnd.js');

var map = {
    'hi': hi,
    'quote': quote
};

module.exports = {
    getMap: function(){
        return map;
    }
};
