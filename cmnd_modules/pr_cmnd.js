var gf = require('../generalFunc.js');

var prList = 
    "_Q3 2021 SFL PR_\n" +
    "1. Anathema\n" +
    "2. Chunkykong\n" +
    "3. MuteAce\n" +
    "4. Chocotaco\n" +
    "5. Riku\n" +
    "6. FlashBlaziken\n" +
    "7. Juanpi\n" +
    "8. Grimm\n" +
    "9. Dominator\n" +
    "10. Flip";

module.exports = {
    act: function (msgChannel) {
        gf.sendMessage(prList, msgChannel);
    }
};
