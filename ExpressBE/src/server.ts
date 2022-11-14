import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import path from "path";
var app = express();
var router1 = require("./router/router1test");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/public", express.static(path.join(__dirname, '../../build/public')));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.redirect("/home");
});

app.get("/home", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../../index.html'))
});

app.use("/database/", router1);

app.listen(8123, () => {
  console.log("server started");
});
