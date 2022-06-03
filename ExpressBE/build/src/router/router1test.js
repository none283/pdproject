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
const db_1 = require("../database/db");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = yield db_1.mydb.all();
        res.json(results);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json(error);
    }
}));
function getData(whatdata, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let results = yield db_1.mydb.all();
            var data_string = "";
            if (whatdata == 1) {
                for (let i = 0; i < results.length; i++) {
                    const element = results[i];
                    if (results[i].company_name.toLowerCase().includes(data.toLowerCase())) {
                        data_string += results[i].id_name + ",";
                    }
                }
                return data_string;
            }
            else if (whatdata == 2) {
                for (let i = 0; i < results.length; i++) {
                    const element = results[i];
                    if (results[i].ds_industries.toLowerCase().includes(data.toLowerCase())) {
                        data_string += results[i].id_name + ",";
                    }
                }
                return data_string;
            }
            return false;
        }
        catch (error) {
            console.log(error);
        }
    });
}
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var company_name = req.body.company;
    var indus_name = req.body.indus;
    try {
        if (company_name != null && company_name != undefined && company_name != '') {
            var result = yield getData(1, company_name);
            if (result == false) {
                res.end('false');
            }
            res.end(result);
        }
        else if (indus_name != null && indus_name != undefined && indus_name != '') {
            var result = yield getData(2, indus_name);
            if (result == false) {
                res.end('false');
            }
            res.end(result);
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json(error);
    }
}));
module.exports = router;
