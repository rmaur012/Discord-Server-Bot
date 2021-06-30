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


function loadAndRunRead(args, channel) {

    authorize(JSON.parse(process.env.CREDENTIALS_JSON), readMUNotes, args, channel);

    //Use the commented code below for local development
    // Load client secrets from a local file.
    //    fs.readFile('credentials.json', (err, content) => {
    //        if (err) return console.log('Error loading client secret file:', err);
    //        // Authorize a client with credentials, then call the Google Sheets API.
    //        authorize(JSON.parse(content), readMUNotes, args, channel);
    //    });
}

function loadAndRunWrite(args, channel) {
    authorize(JSON.parse(process.env.CREDENTIALS_JSON), writeMUNotes, args, channel);

    // Load client secrets from a local file.
    //    fs.readFile('credentials.json', (err, content) => {
    //        if (err) return console.log('Error loading client secret file:', err);
    //        // Authorize a client with credentials, then call the Google Sheets API.
    //        authorize(JSON.parse(content), writeMUNotes, args);
    //    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, args, channel) {
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    if (process.env.GOOGLE_SHEETS_TOKEN) {
        oAuth2Client.setCredentials(JSON.parse(process.env.GOOGLE_SHEETS_TOKEN));
        callback(oAuth2Client, args, channel);
    } else {
        getNewToken(oAuth2Client, callback, args, channel)
    }

    //Use this commented code only for local development
    // Check if we have previously stored a token.
    //    fs.readFile(TOKEN_PATH, (err, token) => {
    //        if (err) return getNewToken(oAuth2Client, callback, args, channel);
    //        if (token.length == 0) {
    //            getNewToken(oAuth2Client, callback, args, channel)
    //        } else {
    //            oAuth2Client.setCredentials(JSON.parse(token));
    //            callback(oAuth2Client, args, channel);
    //        }
    //    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback, args, channel) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    //    console.log('We must get a new token before accessing notes. After doing that, run your request again.', authUrl);
    //    console.log('Authorize this app by visiting this url, copy the code, and run the command *!notes sc (code)*:', authUrl);
    gf.sendMessage("We must get a new token before accessing notes. After doing that, run your request again.\nAuthorize this app by visiting this url, copy the code, and run the command *!notes sc (code)*: " + authUrl, channel);
}

function setNewToken(credentials, code, channel) {
    if (process.env.GOOGLE_SHEETS_TOKEN.length) {
        gf.sendMessage("A token is already stored!", channel);
        return;
    }

    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);


    //Use this commented section only locally when developing
    // Check if we have previously stored a token.
    //    fs.readFile(TOKEN_PATH, (err, token) => {
    //        if (err) return getNewToken(oAuth2Client, callback);
    //
    //        // If a token already exists, don't put new token.
    //        if (token.length) {
    //            gf.sendMessage("A token is already stored!", channel);
    //            return;
    //        }
    //    });
    try {
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);

            console.log("Token is: " + JSON.stringify(token));

            // HTTP request to set the token as a config variable on Heroku
            request({
                method: 'PATCH',
                uri: `https://api.heroku.com/apps/${process.env.APP_NAME}/config-vars`,
                //                uri: `https://api.heroku.com/apps/${process.env.BOT_TOKEN}/config-vars`,
                headers: {
                    Accept: 'application/vnd.heroku+json; version=3',
                    Authorization: `Bearer ${process.env.HEROKU_BEARER}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    GOOGLE_SHEETS_TOKEN: JSON.stringify(token)
                })
            }, function (error, response, body) {
                if (response.statusCode == 200) {
                    gf.sendMessage("Token Stored!", channel);
                } else {
                    gf.sendMessage("Token could not be stored! Try again.", msgChannel);
                    console.log('error: ' + response.statusCode)
                    console.log(body)
                }
            });

            //Use this part below locally when developing
            // Store the token to disk for later program executions
            //            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            //                if (err) return console.error(err);
            //                console.log('Token stored to', TOKEN_PATH);
            //                gf.sendMessage("Token Stored!", channel);
            //            });
        })
    } catch (err) {
        console.log('ERROR: ' + err);
        gf.sendMessage("Something went wrong entering a new token! Please do the process again.", channel);
    }
}

function readMUNotes(auth, args, channel) {
    var matchupRange = 'Matchup Notes!' + x_axis[args[1].toLowerCase()] + y_axis[args[0].toLowerCase()];
    console.log('Read Range is: ' + matchupRange);

    const sheets = google.sheets({
        version: 'v4',
        auth
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
    sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: matchupRange,
        valueInputOption: 'RAW',
        resource: body
    }).then((response) => {
        console.log("Response is: " + response);
        gf.sendMessage(`Cell Updated!`, channel);
    });
}

function writeMUNotes(auth, args, channel) {
    var matchupRange = 'Matchup Notes!' + x_axis[args[1].toLowerCase()] + y_axis[args[0].toLowerCase()];
    console.log('Write Range is: ' + matchupRange);

    const sheets = google.sheets({
        version: 'v4',
        auth
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
            loadAndRunRead(args, msgChannel);
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
            loadAndRunWrite(args, msgChannel);
        } else {
            gf.sendMessage("One or both characters submitted is invalid.", msgChannel);
        }
    },

    setCode: function (args, msgChannel) {
        if (args.length == 0) {
            gf.sendMessage("What is the code to authorize the bot?", msgChannel);
            return;
        }

        setNewToken(JSON.parse(process.env.CREDENTIALS_JSON), args[0], msgChannel);

        //Use this commented code for local development only
        //        fs.readFile('credentials.json', (err, content) => {
        //            if (err) return console.log('Error loading client secret file:', err);
        //            // Authorize a client with credentials, then call the Google Sheets API.
        //            setNewToken(JSON.parse(content), args[0], msgChannel);
        //        });

    }
};
