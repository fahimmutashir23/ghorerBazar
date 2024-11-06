const User = require('../Schemas/User/userSchema');

const getUserInfo = async (id) => {
    const user = await User.findOne({_id: id}, '-password');
    return user;
}

module.exports = getUserInfo