
//Any function that is used but not for a particular command goes here.
const LogsEnum = {"log":1, "info":2, "warn":3};

module.exports = {
    LogsEnum,
    getRNGInteger: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    sendMessage: function (reply, messageChannel) {
        messageChannel.send(reply);
    },
    checkIfProperChannel: function (allowedChannel, messageChannel, checkingEnabled) {
        if(!checkingEnabled){
           return true;
        }
        
        if(allowedChannel == messageChannel.name) {
            return true;
        }
        return false;
    },
    logInfo: function(type, message, messageChannel) {
        switch(type){
            case 1:
                console.log(message);
                break;
            case 2:
                console.info(message);
                break;
            case 3:
                console.warn(message);
                break;
            default:
                this.sendMessage("Invalid Log Type Found...", messageChannel);
        }
    }
};
