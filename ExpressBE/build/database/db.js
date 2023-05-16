"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mydb = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool({
    host: "std-mysql",
    port: 3306,
    user: "std_2229_pd3",
    password: "28032001",
    database: "std_2229_pd3",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.mydb = {
    all: () => {
        return new Promise((res, rej) => {
            pool.query(`SELECT * FROM tb_companies`, (err, results) => {
                if (err) {
                    return rej(err);
                }
                //results[0].quotes
                return res(results);
            });
        });
    }
};
