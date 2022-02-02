let usersArr = JSON.parse(JSON.stringify('./users.json'));
let { loginedUser : currentUser, isAuthorized } = require('../localUsers/loginedUser');

const getUsers = () => usersArr;
const getCurrentUser = () => currentUser;
const isAuthorizedUser = () => isAuthorized;

module.exports = {
    getUsers,
    getCurrentUser,
    isAuthorizedUser
}