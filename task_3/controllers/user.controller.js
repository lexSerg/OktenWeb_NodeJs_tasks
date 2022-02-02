const userService = require('../services/user.service')
const getUsers = ( req, res ) => {
    try {
        res.render('main', { 
            users : userService.getUsers, 
            isAuthorized : userService.isAuthorizedUser, 
            currentUser : userService.getCurrentUser
        })
    } catch (e) {
        res.status(400).json(e.message);
    }
};

module.exports = {
    getUsers
}