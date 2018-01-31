function sendMessage(bot, reply, channelID) {
        bot.sendMessage({
            to: channelID,
            message: reply
        });
    }

module.exports = {

    getRNGInteger: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    sendMessage: function(bot, reply, channelID) {
        bot.sendMessage({
            to: channelID,
            message: reply
        });
    },

    displayTourneyInfo: function(bot, place, channelID) {
        sendMessage(bot, 'Challonge: ' + place.challonge + '\nStream: ' + place.stream, channelID);
    }
};
