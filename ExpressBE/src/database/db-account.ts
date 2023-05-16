import mysql from "mysql2";

const pool = mysql.createPool({
  host     : 'localhost',
  port: 3306,
	user     : 'root',
	password : 'password',
	database : 'logindb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

interface Database {
  all: any  
}

interface DataKey {
  id: string;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  favourite_companies: string | undefined;
}

export const mydbaccount: Database = {
  all: () => {
    return new Promise((res, rej) => {
      pool.query(`SELECT * FROM accounts`, (err: string, results: DataKey[]) => {
        if (err) {
          return rej(err);
        }

        //results[0].quotes
        return res(results);
      });
    });
  }
};
