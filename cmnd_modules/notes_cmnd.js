var gf = require('../generalFunc.js');
const fs = require('fs');
const readline = require('readline');
const request = require('request');
const {
    google
} = require('googleapis');
var x_axis = {
    'aegis': 'CB',
    'banjo': 'BV',
    'bayo': 'BL',
    'bayonetta': 'BL',
    'belmont': 'BO',
    'belmonts': 'BO',
    'bowser': 'N',
    'byleth': 'BX',
    'jr': 'BF',
    'falcon': 'K',
    'chrom': 'AA',
    'cloud': 'BJ',
    'corrin': 'BK',
    'daisy': 'M',
    'dpit': 'AD',
    'pit2': 'AD',
    'dsamus': 'D',
    'samus2': 'D',
    'diddy': 'AJ',
    'dk': 'B',
    'donkey': 'B',
    'doc': 'R',
    'duck': 'BG',
    'dhunt': 'BG',
    'falco': 'T',
    'fox': 'G',
    'ganon': 'X',
    'ganondorf': 'X',
    'greninja': 'AX',
    'hero': 'BU',
    'ices': 'O',
    'ike': 'AH',
    'inci': 'BR',
    'incineroar': 'BR',
    'inkling': 'BM',
    'ink': 'BM',
    'isabelle': 'BQ',
    'isa': 'BQ',
    'jigglypuff': 'L',
    'jiggs': 'L',
    'puff': 'L',
    'joker': 'BT',
    'kazuya': 'CC',
    'ken': 'BI',
    'ddd': 'AM',
    'dedede': 'AM',
    'krool': 'BP',
    'kirby': 'F',
    'link': 'C',
    'mac': 'AW',
    'lucario': 'AO',
    'lucas': 'AK',
    'lucina': 'V',
    'luigi': 'I',
    'mario': 'A',
    'marth': 'U',
    'megaman': 'AT',
    'mega': 'AT',
    'mk': 'AC',
    'meta': 'AC',
    'mewtwo': 'Y',
    'mew2': 'Y',
    'brawler': 'AY',
    'gunner': 'BA',
    'swordfighter': 'AZ',
    'minmin': 'BY',
    'mm': 'BY',
    'gnw': 'AB',
    'game': 'AB',
    'mythra': 'CB',
    'ness': 'J',
    'olimar': 'AN',
    'pac': 'BC',
    'pacman': 'BC',
    'palu': 'BB',
    'palutena': 'BB',
    'peach': 'M',
    'pichu': 'S',
    'pika': 'H',
    'pikachu': 'H',
    'plant': 'BS',
    'pit': 'AD',
    'squirtle': 'AI',
    'ivysaur': 'AI',
    'ivy': 'AI',
    'charizard': 'AI',
    'pt': 'AI',
    'pyra': 'CB',
    'richter': 'BO',
    'whip2': 'BO',
    'ridley': 'BN',
    'rob': 'AP',
    'robin': 'BD',
    'rosa': 'AV',
    'rosalina': 'AV',
    'roy': 'Z',
    'ryu': 'BH',
    'samus': 'D',
    'sephiroth': 'CA',
    'seph': 'CA',
    'sheik': 'P',
    'shulk': 'BE',
    'simon': 'BO',
    'whip': 'BO',
    'snake': 'AG',
    'sonic': 'AL',
    
    'steve': 'BZ',
    'terry': 'BW',
    'tlink': 'AQ',
    'tink': 'AQ',
    'toon': 'AQ',
    'villager': 'AS',
    'villy': 'AS',
    'wario': 'AF',
    'wft': 'AU',
    'wolf': 'AR',
    'yoshi': 'E',
    'ylink': 'W',
    'yink': 'W',
    'young': 'W',
    'zelda': 'Q',
    'zss': 'AE',
    'zero': 'AE'
};
var y_axis = {
    'aegis': '80',
    'banjo': '74',
    'bayo': '64',
    'bayonetta': '64',
    'belmont': '67',
    'belmonts': '67',
    'bowser': '14',
    'byleth': '76',
    'jr': '58',
    'falcon': '11',
    'chrom': '27',
    'cloud': '62',
    'corrin': '63',
    'daisy': '13',
    'dpit': '30',
    'pit2': '30',
    'dsamus': '4',
    'samus2': '4',
    'diddy': '36',
    'dk': '2',
    'donkey': '2',
    'doc': '18',
    'duck': '59',
    'dhunt': '59',
    'falco': '20',
    'fox': '7',
    'ganon': '24',
    'ganondorf': '24',
    'greninja': '50',
    'hero': '73',
    'ices': '15',
    'ike': '34',
    'inci': '70',
    'incineroar': '70',
    'inkling': '65',
    'ink': '65',
    'isabelle': '69',
    'isa': '69',
    'jigglypuff': '12',
    'jiggs': '12',
    'puff': '12',
    'joker': '72',
    'kazuya': '81',
    'ken': '61',
    'ddd': '39',
    'dedede': '39',
    'krool': '68',
    'kirby': '6',
    'link': '3',
    'mac': '49',
    'lucario': '41',
    'lucas': '37',
    'lucina': '22',
    'luigi': '9',
    'mario': '1',
    'marth': '21',
    'megaman': '46',
    'mk': '29',
    'meta': '29',
    'mewtwo': '25',
    'mew2': '25',
    'brawler': '51',
    'gunner': '53',
    'swordfighter': '52',
    'minmin': '77',
    'mm': '77',
    'gnw': '28',
    'game': '28',
    'mythra': '80',
    'ness': '10',
    'olimar': '40',
    'pac': '55',
    'pacman': '55',
    'palu': '54',
    'palutena': '54',
    'peach': '13',
    'pichu': '19',
    'pika': '8',
    'pikachu': '8',
    'plant': '71',
    'pit': '30',
    'squirtle': '35',
    'ivysaur': '35',
    'ivy': '35',
    'charizard': '35',
    'pt': '35',
    'pyra': '80',
    'richter': '67',
    'whip2': '67',
    'ridley': '66',
    'rob': '42',
    'robin': '56',
    'rosa': '48',
    'rosalina': '48',
    'roy': '26',
    'ryu': '60',
    'samus': '4',
    'sephiroth': '79',
    'seph': '79',
    'sheik': '16',
    'shulk': '57',
    'simon': '67',
    'whip': '67',
    'snake': '33',
    'sonic': '38',
    'sora': '82',
    'steve': '78',
    'terry': '75',
    'tlink': '43',
    'tink': '43',
    'toon': '43',
    'villager': '45',
    'villy': '45',
    'wario': '32',
    'wft': '47',
    'wolf': '44',
    'yoshi': '5',
    'ylink': '23',
    'yink': '23',
    'young': '23',
    'zelda': '17',
    'zss': '31',
    'zero': '31'
};


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
//const TOKEN_PATH = 'token.json';

function readMUNotes(args, channel) {
    var matchupRange = 'Matchup Notes!' + x_axis[args[1].toLowerCase()] + y_axis[args[0].toLowerCase()];
    console.log('Read Range is: ' + matchupRange);

    const sheets = google.sheets({
        version: 'v4',
        auth: process.env.API_KEY
    });
    sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: matchupRange,
    }, (err, res) => {
        if (err)
            //gf.sendMessage(`Something went wrong: ${err}`, msgChannel);
            return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows != undefined && rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                //                console.log(`Found Notes: ${row[0]}`);
                gf.sendMessage(`${args[0].toUpperCase()} ${args[1].toUpperCase()} Matchup Notes: \n${row[0]}`, channel);
            });
        } else {
            gf.sendMessage("No notes found.", channel);
        }
    });
}

function generateWriteString(args) {
    var theStr = "";

    for (var i = 2; i < args.length; i = i + 1) {
        theStr = theStr + args[i] + " ";
    }
    return theStr;

}

function writeToCell(sheets, body, matchupRange, channel) {
    const key = process.env.JWT_SERVICE_KEY

    const jwt = new google.auth.JWT(key.client_email, null, key.private_key, SCOPES)
    
    sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SPREADSHEET_ID,
        auth: jwt,
        range: matchupRange,
        valueInputOption: 'RAW',
        resource: body
    }).then((response) => {
        console.log("Response is: " + response);
        gf.sendMessage(`Cell Updated!`, channel);
    });
}

function writeMUNotes(args, channel) {
    var matchupRange = 'Matchup Notes!' + x_axis[args[1].toLowerCase()] + y_axis[args[0].toLowerCase()];
    console.log('Write Range is: ' + matchupRange);

    const sheets = google.sheets({
        version: 'v4',
        auth: process.env.API_KEY
    });

    sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: matchupRange,
    }, (err, res) => {
        if (err)
            //gf.sendMessage(`Something went wrong: ${err}`, msgChannel);
            return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows != undefined && rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                var body = {
                    values: [[row[0] + "\n\n" + generateWriteString(args)]]
                };
                writeToCell(sheets, body, matchupRange, channel);
            });
        } else {
            var body = {
                values: [[generateWriteString(args)]]
            };
            writeToCell(sheets, body, matchupRange, channel);
        }
    });
}


// Command: !notes (w) char1 char2 (author; read optional, write required) (notes to write if put `w`)
// Having the `w` means we want to write, if it's not there, then we want to read
// Expansion: rw = clear what is there and rewrite notes for author

module.exports = {
    read: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage("What character matchup notes do you want to read?", msgChannel);
            return;
        } else if (args.length == 1) {
            args.push(args[0]);
            console.log(args);
        }
        if (x_axis[args[1].toLowerCase()] != undefined && y_axis[args[0].toLowerCase()] != undefined) {
            readMUNotes(args, msgChannel);
        } else {
            gf.sendMessage("One or both characters submitted is invalid.", msgChannel);
        }

    },

    write: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage("What character matchup notes do you want to write on?", msgChannel);
            return;
        } else if (args.length == 1) {
            gf.sendMessage("I need the 2 characters in order to write to the matchup notes.", msgChannel);
            return;
        } else if (args.length == 2) {
            gf.sendMessage("What are your notes that you want to write for this matchup?", msgChannel);
            return;
        }
        console.log("Found args: " + args);
        if (x_axis[args[1].toLowerCase()] != undefined && y_axis[args[0].toLowerCase()] != undefined) {
            writeMUNotes(args, msgChannel);
        } else {
            gf.sendMessage("One or both characters submitted is invalid.", msgChannel);
        }
    }
};