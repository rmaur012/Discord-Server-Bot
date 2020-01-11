
//Any function that is used but not for a particular command goes here.

module.exports = {

    getRNGInteger: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    sendMessage: function (reply, messageChannel) {
        messageChannel.send(reply);
    },
    checkIfProperChannel: function (allowedChannel, messageChannel) {
        if(allowedChannel == messageChannel.name) {
            return true;
        }
        return false;
    }
};
