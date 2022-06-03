import expressRouter, { NextFunction } from "express";
import { Router, Request, Response } from "express";
import { mydb } from "../database/db";

const router = expressRouter.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    let results = await mydb.all();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json(error);
  }
});

async function getData(whatdata: number, data: string){
  try {
    let results = await mydb.all();
    
    var data_string = "";
    if(whatdata == 1)
    {
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        
        if(results[i].company_name.toLowerCase().includes(data.toLowerCase()))
        {
          data_string += results[i].id_name + ",";
        }
      }

      return data_string;
    }
    else if(whatdata == 2)
    {
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        
        if(results[i].ds_industries.toLowerCase().includes(data.toLowerCase()))
        {
          data_string += results[i].id_name + ",";
        }
      }

      return data_string;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
}

router.post("/", async (req: Request, res: Response, next: NextFunction) =>{
    var company_name = req.body.company;
    var indus_name = req.body.indus;
    
    try{
      if(company_name != null && company_name != undefined && company_name != '')
      {
        var result = await getData(1, company_name);
        if(result == false)
        {
          res.end('false');
        }

        res.end(result);
      }
      else if(indus_name != null && indus_name != undefined && indus_name != '')
      {
        var result = await getData(2, indus_name);
        if(result == false)
        {
          res.end('false');
        }

        res.end(result);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500).json(error);
    }
});

module.exports = router;
