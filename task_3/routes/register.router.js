const { Router } = require('express');

const registerRouter = Router();

registerRouter.get('/', (req, res) => {
    res.render('register')
});

module.exports = registerRouter