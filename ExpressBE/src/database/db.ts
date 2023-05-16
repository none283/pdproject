import mysql from "mysql2";

// const pool = mysql.createPool({
//   host: "std-mysql",
//   port: 3306,
//   user: "std_2229_pd3",
//   password: "28032001",
//   database: "std_2229_pd3",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const pool = mysql.createPool({
	host     : 'localhost',
  port: 3306,
	user     : 'root',
	password : 'password',
	database : 'pd_schema',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

interface Database {
  all: any  
}

interface DataKey {
  id: string;
  id_name: string | undefined;
  companylink: string | undefined;
  img_companylink: string | undefined;
  company_name: string | undefined;
  clutchlink: string | undefined;
  review_num: string | undefined;
  diemdanhgia: string | undefined;
  rating1: string | undefined;
  rating2: string | undefined;
  rating3: string | undefined;
  rating4: string | undefined;
  min_project_size: string | undefined;
  company_size: string | undefined;
  location: string | undefined;
  gioithieu: string | undefined;
  ds_clients: string | undefined;
  ds_industries: string | undefined;
  notable_project: string | undefined;
  quotes: string | undefined;
  ds_classindustries: string | undefined;
}

export const mydb: Database = {
  all: () => {
    return new Promise((res, rej) => {
      pool.query(`SELECT * FROM tb_companies`, (err: string, results: DataKey[]) => {
        if (err) {
          return rej(err);
        }

        //results[0].quotes
        return res(results);
      });
    });
  }
};
