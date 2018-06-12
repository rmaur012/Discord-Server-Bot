var gf = require('../generalFunc.js');

var gunLoaded = false;

var bulletChamber = 0;

module.exports = {
    act: function(msgChannel) {
        if(gunLoaded) {
           gf.sendMessage("Gun already loaded!", msgChannel);
            return;
        }
        
        gunLoaded = true;
        
        bulletChamber = Math.floor(Math.random() * 6);
        
        gf.sendMessage("Gun has been loaded! Shoot your shot...", msgChannel);
        
    },
    shoot: function(msgChannel) {
        if(!gunLoaded) {
           gf.sendMessage("Gun hasn't been loaded!", msgChannel);
            return;
        }
        
        if(bulletChamber == 0) {
            gf.sendMessage("**Bang!**", msgChannel);
            gunLoaded = false;
        } else {
            bulletChamber = bulletChamber - 1;
            gf.sendMessage("*Blank*", msgChannel);
        }
    }
};