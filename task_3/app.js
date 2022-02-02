const {userRouter, loginRouter, registerRouter} = require('./routes/')
const jsonReaderService  = require('./services');

let errorType = '';
const FILEPATH = './users.json';

const express = require('express');
const app = express();
const {engine : hbsEngine} = require('express-handlebars');
const path = require('path');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'views')));
app.engine('.hbs', hbsEngine({defaultLayout : false, layoutsDir : process.cwd() + 'views/css'}));
app.set('view engine', '.hbs');
app.set('views', path.join(process.cwd(), 'views', 'tempaltes'));

app.listen(5000, () => {
    console.log('App listen 5000');
});

app.use('/', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter)


app.get('/error', (req, res) => {
    res.render('error', {isAuthorized, errorType})
});


app.post('/login', (req, res) => {
    const {login, password} = req.body;
    if (loginValidator(login, password, usersArr)) {
        errorType = 'You enter not valid data';
        res.redirect('/error');
    }
    if (!loginValidator(login, password, usersArr)) {
        isAuthorized = true;
        currentUser = login;
        res.redirect('/');
    }
})
app.post('/register', (req, res) => {
    const {login, email, password} = req.body;
    if (!regitrationValidator(login, email, usersArr)) {
        res.redirect('/error');
        errorType = 'User with this login or email already exist';
    } 
    if (regitrationValidator(login, email, usersArr)) {
        jsonReaderService(FILEPATH, {login, email, password})
        isAuthorized = true;
        currentUser = login;
        res.redirect('/');
    }

});


function regitrationValidator(login, email, arr) {
    return isDataValid(login, 'login', arr) || isDataValid(email, 'email', arr) ? false : true;
}
function loginValidator(login, password, arr) {
    return isDataValid(login, 'login', arr) && isDataValid(password, 'pass', arr) ? false : true;
}


// Additional functions
const isDataValid = (searchingValue, valueType, arr) => {
    if (valueType === 'login') {
        return !!arr.find(item => {
            return item.login.toLowerCase() === searchingValue.toLowerCase()
        })
    }
    if (valueType === 'email') {
        return !!arr.find(item => {
            return item.email.toLowerCase() === searchingValue.toLowerCase()
        })
    }
    if (valueType === 'pass') {
        return !!arr.find(item => {
            return item.password.toLowerCase() === searchingValue.toLowerCase()
        })
    }
}

// 
