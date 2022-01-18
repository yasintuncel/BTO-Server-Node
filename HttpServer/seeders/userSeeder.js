const config = require('../config');
const { User } = require('common/database/models/user');
const createNewGuestUser = require('common/database/functions/createNewGuestUser');
const { Activity } = require('common/database/models/user/activity');

const seedUsersInformation = [
    {
        nickName: "Yasin",
    },
    {
        nickName: "Akdeniz",
    },
    {
        nickName: "Electronic",
    },
    {
        nickName: "Engineer",
    },
    {
        nickName: "Coder",
    }
];

const userSeeder = async function () {
    for (let i = 0; i < seedUsersInformation.length; i++) {
        let userInfo = seedUsersInformation[i];
        let user = await User.findOne({ 'nickName': userInfo.nickName }).exec();
        if (user) {
            console.log('Seeder - Read - User');
        }
        else {
            const userStatus = await createNewGuestUser(userInfo.nickName, config.tokenScreetKey, config.tokenDuration);

            console.log(userStatus.message);

            if (userStatus.isCreated) {
                console.log('Seeder - New User - Success');
            }
            else {
                console.log('Seeder - New User - Fail');
            }
        }
    };

    let allUsers = await User.find({});
    allUsers.forEach(user => {
        user.activity = Activity();
        user.save();
    });
}

module.exports = userSeeder;