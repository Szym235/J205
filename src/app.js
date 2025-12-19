const express = require('express');
const path = require('path');
const pizzeriaRouter = require('./routes/pizzeriaRouter');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'tajny_sekret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}))

app.use(express.json());

app.use(express.static(path.join(__dirname,'..','public')));
app.use('/', pizzeriaRouter);

module.exports = app;
