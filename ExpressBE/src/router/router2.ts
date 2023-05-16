import expressRouter, { NextFunction } from "express";
import { Router, Request, Response } from "express";
import { mydbaccount } from "../database/db-account";
const mysql = require('mysql');

const router = expressRouter.Router();

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'logindb'
});

router.get("/", async (req: Request, res: Response) => {
  try {
    let results = await mydbaccount.all();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) =>{
    var company_id = req.body.company_id;
    var username = req.body.username;
    console.log(company_id);
    console.log(username);

    var sql1 = mysql.format("SELECT favourite_companies FROM accounts WHERE username=?;", [username]);
    connection.query(sql1, function (err: any, result: any, fields: any) {
      if (err) throw err;
      console.log(result);
      console.log(result[0].favourite_companies);
      try{
        const chars = result[0].favourite_companies.split(",");
        var had = false;
        var favourite_companies = "";
        for (let index = 0; index < chars.length; index++) {
          if(company_id == chars[index])
          {
            had = true;
          }

          if(index > 0 && index < chars.length - 1)
          {
            favourite_companies += "," + chars[index];
          }
          else if(index == chars.length - 1 && index > 0)
          {
            favourite_companies += "," + chars[index] + "," + company_id;
          }
          else if(index == chars.length - 1 && index == 0)
          {
            favourite_companies += chars[index] + "," + company_id;
          }
          else
          {
            favourite_companies = chars[index];
          } 
        }

        if (had == false)
        {
          var sql = mysql.format("UPDATE accounts SET favourite_companies=? WHERE username=?;", [favourite_companies,username]);
          console.log(sql);
          connection.query(sql);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500).json(error);
      }
    });
});

module.exports = router;
