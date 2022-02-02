const { Router } = require('express');

const loginRouter = Router();
let { isAuthorized } = require('../localUsers/loginedUser');

loginRouter.get('/', (req, res) => {
    if (!isAuthorized) {
        res.render('login');
    }
    if (isAuthorized) {
        isAuthorized = !isAuthorized;
        // res.render('main', {isAuthorized});
        // !problem with redirect??? need to fix
        res.redirect('/');
    }
});

module.exports = loginRouter