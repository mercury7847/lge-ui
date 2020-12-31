const fs = require('fs');
var rp = require('sync-request');

var AKAMAI_API_HOST = process.env.AKAMAI_API_HOST;
var PURGE_ROOT_URL = process.env.PURGE_ROOT_URL;
var RSYNC_RESULT_FILE = process.env.RSYNC_RESULT_FILE;


var rsyncResult = fs.readFileSync(RSYNC_RESULT_FILE, 'UTF-8');
console.log('---------------------------------[ RSYNC RESULT ]----------------------------------');
console.log(rsyncResult);
console.log('');
console.log('');

var lines = rsyncResult.split('\n');
if (!lines[0].startsWith('building file list') && !lines[0].startsWith('sending incremental file list')) {
    throw new Error('Invalid rsync start string, expect "sending incremental file list"');
}

var list = [];
var avoidStrList = [
    'sending incremental file list',
    'building file list',
    'created directory',
    '/',
    'sent ',
    'total '
]
lines.forEach(function (line, index) {
    var avoid = false;
    avoidStrList.forEach(function (avoidStr, i) {
        if (line.startsWith(avoidStr) || line.endsWith(avoidStr)) {
            avoid = true;
        }
    });

    if (!avoid && line != '' && line != '\n') {
        list.push(PURGE_ROOT_URL + '/' + line);
    }
});

console.log('----------------------------------[ PURGE URLS ]-----------------------------------');
console.log(list);
console.log('');
console.log('');

if (list.length > 0) {
    var res = rp('POST', AKAMAI_API_HOST + '/akamai/api/purge/delete', {
        headers: {
            'Content-Type': 'application/json'
        },
        json: list,
        timeout: 600000,
        socketTimeout: 600000
    });

    var resBody = res.getBody('utf8');
    console.log('--------------------------------[ PURGE RESPONSE ]---------------------------------');
    console.log(JSON.stringify(JSON.parse(resBody), null, 4));
} else {
    console.log('===== NO PURGE URLS, SKIPP PURGING =====');
}
