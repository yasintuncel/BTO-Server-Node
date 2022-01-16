const home = require("os").homedir();
const identicon = require('identicon');
const fs = require('fs');

const identiconGenerator = function (fileName) {
    identicon.generate({ id: fileName, size: 200 }, (e, buffer) => {
        if (e) {
            return;
        }
        fs.createWriteStream(home + '/Documents' + '/images/identicons/' + fileName + '.png').write(buffer);
    });
};
module.exports = identiconGenerator;