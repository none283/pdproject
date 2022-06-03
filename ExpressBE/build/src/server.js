"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var router1 = require("./router/router1test");
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use("/public", express_1.default.static(path_1.default.join(__dirname, '../../build/public')));
app.get("/", (req, res, next) => {
    res.redirect("/home");
});
app.get("/home", (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../../index.html'));
});
app.use("/database/", router1);
app.listen(3000, () => {
    console.log("server started");
});
