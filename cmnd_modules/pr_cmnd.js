var gf = require('../generalFunc.js');

var prList = 
    "_Q4 2019 SFL PR_\n" +
    "1. MuteAce\n" +
    "2. 8BitMan\n" +
    "3. ZekeTRP\n" +
    "4. Morpheus\n" +
    "5. Anathema\n" +
    "6. Juanpi\n" +
    "7. Chocotaco\n" +
    "8. NickRiddle\n" +
    "9. Xavi\n" +
    "10. Diabeo";

module.exports = {
    act: function (msgChannel) {
        gf.sendMessage(prList, msgChannel);
    }
};
