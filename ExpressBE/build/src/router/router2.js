"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_account_1 = require("../database/db-account");
const mysql = require('mysql');
const router = express_1.default.Router();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'logindb'
});
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = yield db_account_1.mydbaccount.all();
        res.json(results);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json(error);
    }
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var company_id = req.body.company_id;
    var username = req.body.username;
    console.log(company_id);
    console.log(username);
    var sql1 = mysql.format("SELECT favourite_companies FROM accounts WHERE username=?;", [username]);
    connection.query(sql1, function (err, result, fields) {
        if (err)
            throw err;
        console.log(result);
        console.log(result[0].favourite_companies);
        try {
            const chars = result[0].favourite_companies.split(",");
            var had = false;
            var favourite_companies = "";
            for (let index = 0; index < chars.length; index++) {
                if (company_id == chars[index]) {
                    had = true;
                }
                if (index > 0 && index < chars.length - 1) {
                    favourite_companies += "," + chars[index];
                }
                else if (index == chars.length - 1 && index > 0) {
                    favourite_companies += "," + chars[index] + "," + company_id;
                }
                else if (index == chars.length - 1 && index == 0) {
                    favourite_companies += chars[index] + "," + company_id;
                }
                else {
                    favourite_companies = chars[index];
                }
            }
            if (had == false) {
                var sql = mysql.format("UPDATE accounts SET favourite_companies=? WHERE username=?;", [favourite_companies, username]);
                console.log(sql);
                connection.query(sql);
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500).json(error);
        }
    });
}));
module.exports = router;
