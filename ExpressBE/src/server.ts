import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import path from "path";
const mysql = require('mysql');
const session = require('express-session');
declare module 'express-session' {
  export interface SessionData {
    loggedin: any;
    username: any;
  }
}

var app = express();
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
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use("/public", express.static(path.join(__dirname, '../../build/public')));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.redirect("/home");
});

app.get("/public/language/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../build/public/language'));
});

app.get("/home", (req: Request, res: Response, next: NextFunction) => {
	if (req.session.loggedin) {
		//res.send('Welcome back, ' + req.session.username + '!');
		user_name = req.session.username;
		res.sendFile(path.join(__dirname, '../../index.html'));
	} else {
		res.send('Please login to view this page!');
		res.end();
	}
});

app.get('/userdata', function (req, res) {
    connection.query("SELECT favourite_companies FROM accounts WHERE username=?;", [user_name], function (error: any, results: any, fields: any) {
        if (error) throw error;
        const companies = results[0].favourite_companies;
		const responseData = {
			username: user_name,
			companies: companies
		};
		res.send(responseData);
    });
})


app.get('/login', (req: Request, res: Response, next: NextFunction) => {
	res.sendFile(path.join(__dirname, '../public/login.html'))
});

app.use("/database/", router1);
app.use("/database-account/", router2);

//login
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'logindb'
});

app.post('/auth', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error: any, results: string | any[], fields: any) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
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
