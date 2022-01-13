const home = require("os").homedir();
const identicon = require('identicon');
const fs = require('fs');

const identiconGenerator = function (uid) {
    identicon.generate({ id: uid, size: 200 }, (e, buffer) => {
        if (e) {
            throw e;
        }
        fs.createWriteStream(home + '/Documents' + '/images/identicons/' + uid + '.png').write(buffer);
    });
};
module.exports = identiconGenerator;