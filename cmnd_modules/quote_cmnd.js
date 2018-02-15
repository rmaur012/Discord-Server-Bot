var gf = require('../generalFunc.js');

var quotes = ["\"You need to stop.\" -Joe",
              "\"Eddy, you're a FUCKING WEEB!\" -Jojo",
              "\"This is why I went to the math department.\" -Pablo",
              "\"Am I right fellas?\" -Danny",
              "\"Joe I'll do a $100 money match once I go 4-2, I swear to god. Eskeetit\" -Yoshi Main",
              "\"Ha ha ha. I SD'ed.\" -Pablo",
              "\"You better not have sweaty hands or you're going to the bathroom and cleaning that shit.\" -Joe",
              "\"WOOOO, LOOK AT ME! I'M FOX McCLOUD BABY! HONEST!\" -Mida"];

var quoteIndex = 0;

module.exports = {
    act: function (msgChannel) {
        gf.sendMessage(quotes[quoteIndex], msgChannel);
        quoteIndex = quoteIndex + 1;
        if (quoteIndex == quotes.length) {
            quoteIndex = 0;
        }
    }
};
