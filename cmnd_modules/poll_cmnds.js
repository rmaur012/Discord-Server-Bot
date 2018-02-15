var gf = require('../generalFunc.js');

module.exports = {
    act: function (args, message) {
        
        if(args.length == 0){
            message.channel.send("What is the question to the poll?");
            return ;
        }
        
        var question = "";
        
        for(word in args){
            question += args[word] + " ";
        }

        message.channel.send(question)
            .then(function (message) {
                message.react("👍");
                message.react("👎");
            }).catch(function (error) {
                console.log(error);
            });

    }
};
