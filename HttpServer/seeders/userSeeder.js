const config = require('../config');
const { User } = require('common/database/models/user');
const createNewGuestUser = require('common/database/functions/createNewGuestUser');
const { Activity } = require('common/database/models/user/activity');
const makeFriend = require('common/database/functions/makeFriend');

const seedUsersInformation = [
    {
        nickName: "Yasin",
        friends: ['Akdeniz', 'Electronic', 'Coder']
    },
    {
        nickName: "Akdeniz",
        friends: ['Yasin', 'Electronic']
    },
    {
        nickName: "Electronic",
        friends: ['Yasin', 'Engineer', 'Akdeniz']
    },
    {
        nickName: "Engineer",
        friends: ['Electronic', 'Coder']
    },
    {
        nickName: "Coder",
        friends: ['Yasin', 'Engineer']
    }
];

const addFriends = async function () {
    for (const userInfo of seedUsersInformation) {
        for (const friendName of userInfo.friends) {
            let user = await User.findOne({ 'nickName': userInfo.nickName });
            let friend = await User.findOne({ 'nickName': friendName });

            let isExist = false;
            for (let i = 0; i < user.friends.length; i++) {
                const f = user.friends[i];
                if (f.user.toString() === friend._id.toString()) {
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                await makeFriend(user._id, friend._id);
                console.log('friend added.');
            }
        }
    }
}

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
    await addFriends();
    let allUsers = await User.find({});
    allUsers.forEach(user => {
        user.activity = Activity();
        user.save();
    });
}

module.exports = userSeeder;