"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mysql = require('mysql');
const session = require('express-session');
var app = (0, express_1.default)();
var router1 = require("./router/router1test");
var router2 = require("./router/router2");
var bodyParser = require('body-parser');
var user_name = "";
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use("/public", express_1.default.static(path_1.default.join(__dirname, '../../build/public')));
app.get("/", (req, res, next) => {
    res.redirect("/home");
});
app.get("/public/language/", (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../build/public/language'));
});
app.get("/home", (req, res, next) => {
    if (req.session.loggedin) {
        //res.send('Welcome back, ' + req.session.username + '!');
        user_name = req.session.username;
        res.sendFile(path_1.default.join(__dirname, '../../index.html'));
    }
    else {
        res.send('Please login to view this page!');
        res.end();
    }
});
app.get('/userdata', function (req, res) {
    connection.query("SELECT favourite_companies FROM accounts WHERE username=?;", [user_name], function (error, results, fields) {
        if (error)
            throw error;
        const companies = results[0].favourite_companies;
        const responseData = {
            username: user_name,
            companies: companies
        };
        res.send(responseData);
    });
});
app.get('/login', (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../public/login.html'));
});
app.use("/database/", router1);
app.use("/database-account/", router2);
//login
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'logindb'
});
app.post('/auth', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error)
                throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            }
            else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    }
    else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
// app.get('/hometest', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });
///////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, () => {
    console.log("server started");
});
