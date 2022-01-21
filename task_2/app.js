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

app.get('/', (req, res) => {
    res.render('main')
})
app.get('/login', (req, res) => {
    res.render('login')
});
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/login', (req, res) => {
    console.log(req.body);
})
