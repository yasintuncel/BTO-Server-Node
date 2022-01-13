const home = require("os").homedir();
const identicon = require('identicon');
const fs = require('fs');

const identiconGenerator = function (uid) {
    identicon.generate({ id: uid, size: 200 }, (err, buffer) => {
        if (e) {
            return {
                isCreated: false,
                message: 'Error occured while creating identicon. Error: ' + e
            };
        }
        fs.createWriteStream(home + '/Documents' + '/images/identicons/' + uid + '.png').write(buffer);
        return {
            isCreated: true,
            message: 'Successfully created identicon.'
        };
    });
};
module.exports = identiconGenerator;