const config = require('../config');
const { User } = require('common/database/models/user');
const createNewGuestUser = require('common/database/functions/createNewGuestUser');
const { Activity } = require('common/database/models/user/activity');
const { Friend } = require('common/database/models/user/friend');

const seedUsersInformation = [
    {
        nickName: "Yasin",
        friends: ['Akdeniz', 'Electronic', 'Coder']
    },
    {
        nickName: "Akdeniz",
        friends: ['Yasin']
    },
    {
        nickName: "Electronic",
        friends: ['Yasin', 'Engineer']
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
            if (user.friends.length !== userInfo.friends.length) {
                let friend = await User.findOne({ 'nickName': friendName });
                let fSchema = Friend();
                fSchema.user = friend;
                user.friends.push(fSchema);
                await user.save();
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